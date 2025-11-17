import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Contract, JsonRpcProvider, Wallet, formatEther, parseEther } from 'ethers';
import * as BackPayABI from './abi/BackPay.json';

@Injectable()
export class Web3Service {
  private readonly logger = new Logger(Web3Service.name);
  private provider: JsonRpcProvider;
  private wallet: Wallet;
  private contract: Contract;

  constructor(private configService: ConfigService) {
    this.initializeWeb3();
  }

  private initializeWeb3() {
    try {
      const providerUrl =
        this.configService.get<string>('web3.providerUrl') ||
        this.configService.get<string>('WEB3_PROVIDER_URL');
      const privateKey =
        this.configService.get<string>('web3.privateKey') ||
        this.configService.get<string>('PRIVATE_KEY');
      const contractAddress =
        this.configService.get<string>('web3.contractAddress') ||
        this.configService.get<string>('CONTRACT_ADDRESS');

      if (!providerUrl || !privateKey || !contractAddress) {
        this.logger.warn(
          'Web3 configuration missing (provider/private key/contract). Blockchain features disabled until env vars are set.',
        );
        return;
      }

      this.provider = new JsonRpcProvider(providerUrl);
      this.wallet = new Wallet(privateKey, this.provider);
      this.contract = new Contract(
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
      if (!this.contract) {
        throw new Error('Web3 contract not initialized');
      }

      const tx = await this.contract.sendPayment(
        to,
        parseEther(amount),
        fromPhone,
        {
          gasLimit: 100000n,
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
      return formatEther(balance);
    } catch (error) {
      this.logger.error('Failed to get balance', error);
      throw error;
    }
  }

  async createWallet(): Promise<{ address: string; privateKey: string }> {
    try {
      const wallet = Wallet.createRandom();
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