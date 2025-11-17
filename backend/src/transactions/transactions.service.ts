import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument, TransactionStatus, TransactionType } from './schemas/transaction.schema';
import { Web3Service } from '../web3/web3.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class TransactionsService {
  private readonly logger = new Logger(TransactionsService.name);

  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    private web3Service: Web3Service,
    private usersService: UsersService,
  ) {}

  async create(transactionData: Partial<Transaction>): Promise<TransactionDocument> {
    const transaction = new this.transactionModel(transactionData);
    return transaction.save();
  }

  async findById(id: string): Promise<TransactionDocument | null> {
    return this.transactionModel.findById(id).exec();
  }

  async findByPhone(phoneNumber: string, page = 1, limit = 10): Promise<{ transactions: TransactionDocument[]; total: number }> {
    const skip = (page - 1) * limit;
    
    const [transactions, total] = await Promise.all([
      this.transactionModel.find({
        $or: [{ fromPhone: phoneNumber }, { toPhone: phoneNumber }]
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec(),
      this.transactionModel.countDocuments({
        $or: [{ fromPhone: phoneNumber }, { toPhone: phoneNumber }]
      }).exec()
    ]);

    return { transactions, total };
  }

  async findByTransactionHash(transactionHash: string): Promise<TransactionDocument | null> {
    return this.transactionModel.findOne({ transactionHash }).exec();
  }

  async updateStatus(
    identifier: string,
    status: TransactionStatus,
    additionalData?: Record<string, any>,
  ): Promise<TransactionDocument | null> {
    const updateData: any = { status };
    
    if (status === TransactionStatus.COMPLETED) {
      updateData.completedAt = new Date();
    }

    if (additionalData) {
      Object.assign(updateData, additionalData);
    }

    if (!identifier) {
      throw new Error('Transaction identifier is required to update status');
    }

    const filter = {
      $or: [
        { transactionHash: identifier },
        { _id: identifier },
      ],
    };

    return this.transactionModel.findOneAndUpdate(
      filter,
      updateData,
      { new: true }
    ).exec();
  }

  async executeTransaction(
    fromPhone: string,
    toPhone: string,
    amount: string,
    description?: string
  ): Promise<{ success: boolean; transaction?: TransactionDocument; error?: string }> {
    try {
      // Get sender and recipient details
      const sender = await this.usersService.findByPhone(fromPhone);
      const recipient = await this.usersService.findByPhone(toPhone);

      if (!sender || !sender.walletAddress) {
        throw new Error('Sender not found or no wallet address');
      }

      if (!recipient || !recipient.walletAddress) {
        throw new Error('Recipient not found or no wallet address');
      }

      // Create transaction record
      const transaction = await this.create({
        fromPhone,
        toPhone,
        fromWallet: sender.walletAddress,
        toWallet: recipient.walletAddress,
        amount,
        currency: 'ETH',
        type: TransactionType.SEND,
        status: TransactionStatus.PENDING,
        description,
      });

      // Execute blockchain transaction
      const result = await this.web3Service.sendTransaction(
        recipient.walletAddress,
        amount,
        fromPhone
      );

      if (result.success) {
        // Update transaction with blockchain details
        await this.updateStatus(transaction.id, TransactionStatus.COMPLETED, {
          transactionHash: result.transactionHash,
          blockNumber: result.blockNumber,
          notified: true,
        });

        // Update user transaction counts
        await this.usersService.incrementTransactionCount(fromPhone, parseFloat(amount));
        await this.usersService.incrementTransactionCount(toPhone, parseFloat(amount));

        const completedTransaction = await this.findByTransactionHash(result.transactionHash);
        
        this.logger.log(`Transaction completed: ${result.transactionHash}`);
        
        return {
          success: true,
          transaction: completedTransaction || undefined,
        };
      } else {
        // Update transaction as failed
        await this.updateStatus(
          transaction.transactionHash || transaction.id,
          TransactionStatus.FAILED,
          {
          notified: true,
        });

        this.logger.error(`Transaction failed: ${result.error}`);
        
        return {
          success: false,
          error: result.error,
        };
      }
    } catch (error) {
      this.logger.error('Transaction execution failed', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getTransactionStats(phoneNumber?: string): Promise<{
    totalTransactions: number;
    totalSent: number;
    totalReceived: number;
    totalVolume: number;
  }> {
    const matchStage: any = {};
    
    if (phoneNumber) {
      matchStage.$or = [
        { fromPhone: phoneNumber },
        { toPhone: phoneNumber }
      ];
    }

    const stats = await this.transactionModel.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalTransactions: { $sum: 1 },
          totalSent: {
            $sum: {
              $cond: [{ $eq: ['$type', TransactionType.SEND] }, 1, 0]
            }
          },
          totalReceived: {
            $sum: {
              $cond: [{ $eq: ['$type', TransactionType.RECEIVE] }, 1, 0]
            }
          },
          totalVolume: {
            $sum: { $toDouble: '$amount' }
          }
        }
      }
    ]);

    return stats[0] || {
      totalTransactions: 0,
      totalSent: 0,
      totalReceived: 0,
      totalVolume: 0
    };
  }

  async getRecentTransactions(limit = 10): Promise<TransactionDocument[]> {
    return this.transactionModel.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  async getPendingTransactions(): Promise<TransactionDocument[]> {
    return this.transactionModel.find({ status: TransactionStatus.PENDING }).exec();
  }
}