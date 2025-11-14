import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import * as BackPayABI from './abi/BackPay.json';

@Injectable()
export class Web3Service {
  private readonly logger = new Logger(Web3Service.name);
  private provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private contract: ethers.Contract;

  constructor(private configService: ConfigService) {
    this.initializeWeb3();
  }

  private initializeWeb3() {
    try {
      const providerUrl = this.configService.get('WEB3_PROVIDER_URL');
      const privateKey = this.configService.get('PRIVATE_KEY');
      const contractAddress = this.configService.get('CONTRACT_ADDRESS');

      this.provider = new ethers.providers.JsonRpcProvider(providerUrl);
      this.wallet = new ethers.Wallet(privateKey, this.provider);
      this.contract = new ethers.Contract(
        contractAddress,
        BackPayABI.abi,
        this.wallet,
      );

      this.logger.log('Web3 service initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize Web3 service', error);
    }
  }

  async sendTransaction(to: string, amount: string, fromPhone: string) {
    try {
      const tx = await this.contract.sendPayment(
        to,
        ethers.utils.parseEther(amount),
        fromPhone,
        {
          gasLimit: 100000,
        }
      );

      const receipt = await tx.wait();
      return {
        success: true,
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
      };
    } catch (error) {
      this.logger.error('Transaction failed', error);
      return { success: false, error: error.message };
    }
  }

  async getBalance(address: string): Promise<string> {
    try {
      const balance = await this.provider.getBalance(address);
      return ethers.utils.formatEther(balance);
    } catch (error) {
      this.logger.error('Failed to get balance', error);
      throw error;
    }
  }

  async createWallet(): Promise<{ address: string; privateKey: string }> {
    try {
      const wallet = ethers.Wallet.createRandom();
      return {
        address: wallet.address,
        privateKey: wallet.privateKey,
      };
    } catch (error) {
      this.logger.error('Failed to create wallet', error);
      throw error;
    }
  }
}