import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { Message } from 'whatsapp-web.js';
import { Web3Service } from '../web3/web3.service';
import { UsersService } from '../users/users.service';
import { WhatsappService } from '../whatsapp/whatsapp.service';

interface OnboardingState {
  step: string;
  data: any;
  createdAt: Date;
}

@Injectable()
export class OnboardingService {
  private readonly logger = new Logger(OnboardingService.name);
  private onboardingStates: Map<string, OnboardingState> = new Map();
  private temporaryStates: Map<string, any> = new Map();

  constructor(
    private web3Service: Web3Service,
    private usersService: UsersService,
    @Inject(forwardRef(() => WhatsappService))
    private whatsappService: WhatsappService,
  ) {}

  async startOnboarding(phoneNumber: string) {
    this.onboardingStates.set(phoneNumber, {
      step: 'awaiting_name',
      data: {},
      createdAt: new Date(),
    });
  }

  async getOnboardingState(phoneNumber: string): Promise<OnboardingState | null> {
    return this.onboardingStates.get(phoneNumber) || null;
  }

  async setTemporaryState(phoneNumber: string, state: any) {
    this.temporaryStates.set(phoneNumber, state);
  }

  async getTemporaryState(phoneNumber: string): Promise<any> {
    return this.temporaryStates.get(phoneNumber);
  }

  async handleOnboardingStep(phoneNumber: string, message: string, originalMessage: Message) {
    const state = this.onboardingStates.get(phoneNumber);
    if (!state) return;

    try {
      switch (state.step) {
        case 'awaiting_name':
          await this.handleNameStep(phoneNumber, message, state);
          break;
        
        case 'awaiting_email':
          await this.handleEmailStep(phoneNumber, message, state);
          break;
        
        case 'awaiting_wallet_creation':
          await this.handleWalletCreation(phoneNumber, message, state);
          break;
        
        case 'awaiting_pin':
          await this.handlePinSetup(phoneNumber, message, state);
          break;
        
        default:
          await this.whatsappService.sendMessage(
            originalMessage.from,
            '❌ Invalid onboarding state. Please type "CREATE" to start over.'
          );
          this.onboardingStates.delete(phoneNumber);
      }
    } catch (error) {
      this.logger.error('Onboarding error', error);
      await this.whatsappService.sendMessage(
        originalMessage.from,
        '❌ An error occurred. Please type "CREATE" to start over.'
      );
      this.onboardingStates.delete(phoneNumber);
    }
  }

  private async handleNameStep(phoneNumber: string, message: string, state: OnboardingState) {
    if (message.length < 2) {
      await this.whatsappService.sendMessage(
        `${phoneNumber}@c.us`,
        '❌ Please enter a valid name (minimum 2 characters):'
      );
      return;
    }

    state.data.fullName = message;
    state.step = 'awaiting_email';
    
    await this.whatsappService.sendMessage(
      `${phoneNumber}@c.us`,
      `👋 Nice to meet you, ${message}!\n\n📧 Please enter your email address (optional):\n\nOr type "SKIP" to continue without email.`
    );
  }

  private async handleEmailStep(phoneNumber: string, message: string, state: OnboardingState) {
    if (message !== 'skip') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(message)) {
        await this.whatsappService.sendMessage(
          `${phoneNumber}@c.us`,
          '❌ Please enter a valid email address or type "SKIP":'
        );
        return;
      }
      state.data.email = message;
    }

    state.step = 'awaiting_wallet_creation';
    
    await this.whatsappService.sendMessage(
      `${phoneNumber}@c.us`,
      `🎉 Great! Now let's create your crypto wallet.\n\nThis will allow you to send and receive cryptocurrencies directly through WhatsApp!\n\nType "CREATE WALLET" to continue:`
    );
  }

  private async handleWalletCreation(phoneNumber: string, message: string, state: OnboardingState) {
    if (message !== 'create wallet') {
      await this.whatsappService.sendMessage(
        `${phoneNumber}@c.us`,
        '❌ Please type "CREATE WALLET" exactly to create your wallet:'
      );
      return;
    }

    try {
      // Create wallet for user
      const wallet = await this.web3Service.createWallet();
      
      // Create user in database
      const user = await this.usersService.create({
        phoneNumber,
        fullName: state.data.fullName,
        email: state.data.email,
        walletAddress: wallet.address,
        encryptedPrivateKey: await this.usersService.encryptPrivateKey(wallet.privateKey),
        isVerified: true,
      });

      state.step = 'awaiting_pin';
      state.data.walletAddress = wallet.address;

      await this.whatsappService.sendMessage(
        `${phoneNumber}@c.us`,
        `✅ Wallet Created Successfully!\n\n📬 Your Wallet Address:\n\`${wallet.address}\`\n\n💰 You can now receive cryptocurrencies!\n\n🔒 For security, please set a 6-digit PIN:`
      );

    } catch (error) {
      this.logger.error('Wallet creation failed', error);
      await this.whatsappService.sendMessage(
        `${phoneNumber}@c.us`,
        '❌ Failed to create wallet. Please try again later.'
      );
      this.onboardingStates.delete(phoneNumber);
    }
  }

  private async handlePinSetup(phoneNumber: string, message: string, state: OnboardingState) {
    const pinRegex = /^\d{6}$/;
    if (!pinRegex.test(message)) {
      await this.whatsappService.sendMessage(
        `${phoneNumber}@c.us`,
        '❌ Please enter a valid 6-digit PIN:'
      );
      return;
    }

    state.data.pin = message;
    
    // Complete onboarding
    this.onboardingStates.delete(phoneNumber);

    await this.whatsappService.sendMessage(
      `${phoneNumber}@c.us`,
      `🎊 *Onboarding Complete!*\n\nWelcome to BackPay, ${state.data.fullName}! 🚀\n\n✅ *Your Wallet:* ${state.data.walletAddress}\n✅ *PIN Set:* 🔒\n\n💫 *You can now:*\n• Send crypto to any phone number\n• Check your balance\n• Receive payments\n\nType "HELP" to see all commands!`
    );
  }

  cleanupExpiredStates() {
    const now = new Date();
    const expirationTime = 30 * 60 * 1000; // 30 minutes
    
    for (const [phoneNumber, state] of this.onboardingStates.entries()) {
      if (now.getTime() - state.createdAt.getTime() > expirationTime) {
        this.onboardingStates.delete(phoneNumber);
        this.logger.log(`Cleaned up expired onboarding state for ${phoneNumber}`);
      }
    }
  }
}