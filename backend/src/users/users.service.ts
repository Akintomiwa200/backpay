import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByPhone(
    phoneNumber: string,
    options?: { includeSensitive?: boolean },
  ): Promise<UserDocument | null> {
    const query = this.userModel.findOne({ phoneNumber });

    if (options?.includeSensitive) {
      query.select('+encryptedPrivateKey +encryptedPin');
    }

    return query.exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async findByWalletAddress(walletAddress: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ walletAddress }).exec();
  }

  async create(userData: Partial<User>): Promise<UserDocument> {
    const user = new this.userModel(userData);
    return user.save();
  }

  async update(phoneNumber: string, updateData: Partial<User>): Promise<UserDocument | null> {
    return this.userModel.findOneAndUpdate(
      { phoneNumber },
      updateData,
      { new: true }
    ).exec();
  }

  async setWallet(phoneNumber: string, walletAddress: string, encryptedPrivateKey: string): Promise<UserDocument | null> {
    return this.userModel.findOneAndUpdate(
      { phoneNumber },
      { 
        walletAddress, 
        encryptedPrivateKey,
        isVerified: true 
      },
      { new: true }
    ).exec();
  }

  async setPin(phoneNumber: string, encryptedPin: string): Promise<UserDocument | null> {
    return this.userModel.findOneAndUpdate(
      { phoneNumber },
      { encryptedPin },
      { new: true }
    ).exec();
  }

  async encryptPrivateKey(privateKey: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(privateKey, salt);
  }

  async verifyPrivateKey(encryptedKey: string, privateKey: string): Promise<boolean> {
    return bcrypt.compare(privateKey, encryptedKey);
  }

  async incrementTransactionCount(phoneNumber: string, amount: number): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { phoneNumber },
      { 
        $inc: { 
          transactionCount: 1,
          totalTransacted: amount
        },
        lastLogin: new Date()
      }
    ).exec();
  }

  async getAllUsers(skip = 0, limit = 10): Promise<{ users: UserDocument[]; total: number }> {
    const [users, total] = await Promise.all([
      this.userModel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.userModel.countDocuments().exec()
    ]);

    return { users, total };
  }

  async deleteUser(phoneNumber: string): Promise<boolean> {
    const result = await this.userModel.deleteOne({ phoneNumber }).exec();
    return result.deletedCount > 0;
  }

  async getUserStats(): Promise<{
    totalUsers: number;
    verifiedUsers: number;
    totalTransactions: number;
    totalVolume: number;
  }> {
    const stats = await this.userModel.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          verifiedUsers: { $sum: { $cond: ['$isVerified', 1, 0] } },
          totalTransactions: { $sum: '$transactionCount' },
          totalVolume: { $sum: '$totalTransacted' }
        }
      }
    ]);

    return stats[0] || {
      totalUsers: 0,
      verifiedUsers: 0,
      totalTransactions: 0,
      totalVolume: 0
    };
  }
}