import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByPhone(phoneNumber: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ phoneNumber }).exec();
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

  async encryptPrivateKey(privateKey: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(privateKey, salt);
  }

  async verifyPrivateKey(encryptedKey: string, privateKey: string): Promise<boolean> {
    return bcrypt.compare(privateKey, encryptedKey);
  }
}