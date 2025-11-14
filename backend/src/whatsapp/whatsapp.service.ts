import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, LocalAuth, Message } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';
import { Web3Service } from '../web3/web3.service';
import { UsersService } from '../users/users.service';
import { OnboardingService } from '../onboarding/onboarding.service';

@Injectable()
export class WhatsappService implements OnModuleInit {
  private readonly logger = new Logger(WhatsappService.name);
  private client: Client;
  private isReady = false;

  constructor(
    private configService: ConfigService,
    private web3Service: Web3Service,
    private usersService: UsersService,
    private onboardingService: OnboardingService,
  ) {}

  async onModuleInit() {
    await this.initializeWhatsApp();
  }

  private async initializeWhatsApp() {
    this.client = new Client({
      authStrategy: new LocalAuth({
        clientId: 'backpay-client',
      }),
      puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    });

    this.client.on('qr', (qr) => {
      this.logger.log('QR Code received, scan with your WhatsApp');
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
      this.isReady = true;
      this.logger.log('WhatsApp client is ready!');
    });

    this.client.on('message', async (message: Message) => {
      await this.handleIncomingMessage(message);
    });

    this.client.on('auth_failure', (error) => {
      this.logger.error('WhatsApp authentication failed', error);
      this.isReady = false;
    });

    this.client.on('disconnected', (reason) => {
      this.logger.warn(`WhatsApp client disconnected: ${reason}`);
      this.isReady = false;
      // Attempt to reconnect
      setTimeout(() => this.initializeWhatsApp(), 5000);
    });

    await this.client.initialize();
  }

  private async handleIncomingMessage(message: Message) {
    try {
      const phoneNumber = message.from.replace('@c.us', '');
      const userMessage = message.body.toLowerCase().trim();

      this.logger.log(`Message from ${phoneNumber}: ${userMessage}`);

      // Check if user exists
      const user = await this.usersService.findByPhone(phoneNumber);

      if (!user) {
        // Start onboarding process
        await this.handleNewUser(phoneNumber, message);
        return;
      }

      // Handle existing user commands
      await this.handleUserCommands(phoneNumber, userMessage, message);
    } catch (error) {
      this.logger.error('Error handling message', error);
      await this.sendMessage(message.from, '❌ An error occurred. Please try again.');
    }
  }

  private async handleNewUser(phoneNumber: string, message: Message) {
    const welcomeMessage = `👋 Welcome to BackPay! 🚀

I see you're new here! Let's get you set up:

📱 *Create Account* - Type "CREATE" to start
💡 *Learn More* - Type "INFO" to see what BackPay can do
🔒 *Security* - Your funds are safe with blockchain technology

What would you like to do?`;

    await this.sendMessage(message.from, welcomeMessage);
    
    // Store onboarding state
    await this.onboardingService.startOnboarding(phoneNumber);
  }

  private async handleUserCommands(phoneNumber: string, message: string, originalMessage: Message) {
    const user = await this.usersService.findByPhone(phoneNumber);

    // Check if user is in onboarding process
    const onboardingState = await this.onboardingService.getOnboardingState(phoneNumber);
    
    if (onboardingState && onboardingState.step) {
      await this.onboardingService.handleOnboardingStep(phoneNumber, message, originalMessage);
      return;
    }

    // Main command handler
    switch (true) {
      case message.includes('send') || message.includes('pay'):
        await this.handleSendPayment(phoneNumber, message, originalMessage);
        break;
      
      case message.includes('balance'):
        await this.handleCheckBalance(phoneNumber);
        break;
      
      case message.includes('help'):
        await this.showHelpMenu(phoneNumber);
        break;
      
      case message.includes('create'):
        await this.startAccountCreation(phoneNumber);
        break;
      
      default:
        await this.sendMessage(
          originalMessage.from,
          `🤔 I didn't understand that. Type "HELP" to see available commands.`
        );
    }
  }

  private async handleSendPayment(phoneNumber: string, message: string, originalMessage: Message) {
    const user = await this.usersService.findByPhone(phoneNumber);
    
    if (!user.walletAddress) {
      await this.sendMessage(
        originalMessage.from,
        `❌ You need to set up your wallet first. Type "CREATE" to get started.`
      );
      return;
    }

    // Extract amount and recipient from message
    const amountMatch = message.match(/(\d+(\.\d+)?)/);
    const amount = amountMatch ? amountMatch[1] : null;

    if (!amount) {
      await this.sendMessage(
        originalMessage.from,
        `💸 To send payment, use format: "SEND 0.1 ETH to @username" or "PAY 50 USD to phone"`
      );
      return;
    }

    await this.sendMessage(
      originalMessage.from,
      `🔍 Please provide the recipient's phone number or @username:`
    );

    // Store temporary state for payment flow
    await this.onboardingService.setTemporaryState(phoneNumber, {
      action: 'send_payment',
      amount: amount,
      step: 'awaiting_recipient'
    });
  }

  private async handleCheckBalance(phoneNumber: string) {
    const user = await this.usersService.findByPhone(phoneNumber);
    
    if (!user.walletAddress) {
      await this.sendMessage(
        `${phoneNumber}@c.us`,
        `❌ No wallet found. Type "CREATE" to set up your account.`
      );
      return;
    }

    try {
      const balance = await this.web3Service.getBalance(user.walletAddress);
      await this.sendMessage(
        `${phoneNumber}@c.us`,
        `💰 Your Balance: ${balance} ETH\n\n💫 Ready to make transactions!`
      );
    } catch (error) {
      await this.sendMessage(
        `${phoneNumber}@c.us`,
        `❌ Failed to fetch balance. Please try again later.`
      );
    }
  }

  private async showHelpMenu(phoneNumber: string) {
    const helpMessage = `🛠 *BackPay Commands:*

💸 *Send Money* 
   "SEND 0.1 ETH to @user"
   "PAY 50 USD to +123456789"

💰 *Check Balance*
   "BALANCE"

👤 *Account*
   "CREATE" - Setup account
   "PROFILE" - View profile

🔧 *Support*
   "HELP" - This menu
   "SUPPORT" - Contact support

💡 *Pro Tip:* You can send crypto to any phone number!`;

    await this.sendMessage(`${phoneNumber}@c.us`, helpMessage);
  }

  private async startAccountCreation(phoneNumber: string) {
    await this.onboardingService.startOnboarding(phoneNumber);
    await this.sendMessage(
      `${phoneNumber}@c.us`,
      `🎉 Let's create your BackPay account!\n\n📛 Please enter your full name:`
    );
  }

  async sendMessage(to: string, message: string) {
    try {
      if (!this.isReady) {
        this.logger.warn('WhatsApp client not ready');
        return false;
      }
      await this.client.sendMessage(to, message);
      return true;
    } catch (error) {
      this.logger.error('Failed to send message', error);
      return false;
    }
  }

  async isClientReady(): Promise<boolean> {
    return this.isReady;
  }
}