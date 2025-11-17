import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  phoneNumber: string;

  @Prop({ required: true })
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  walletAddress: string;

  @Prop({ select: false })
  encryptedPrivateKey: string;

  @Prop({ select: false })
  encryptedPin: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: 0 })
  transactionCount: number;

  @Prop({ default: 0 })
  totalTransacted: number;

  @Prop()
  lastLogin: Date;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Index for better query performance
UserSchema.index({ phoneNumber: 1 });
UserSchema.index({ walletAddress: 1 });
UserSchema.index({ createdAt: -1 });