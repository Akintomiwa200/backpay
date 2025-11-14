import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  walletAddress: string;

  @Prop({ select: false })
  encryptedPrivateKey: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: 0 })
  transactionCount: number;

  @Prop()
  lastLogin: Date;

  @Prop({ default: 'user' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);