import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum TransactionType {
  SEND = 'send',
  RECEIVE = 'receive',
}

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true })
  fromPhone: string;

  @Prop({ required: true })
  toPhone: string;

  @Prop()
  fromWallet?: string;

  @Prop()
  toWallet?: string;

  @Prop({ required: true })
  amount: string;

  @Prop({ default: 'ETH' })
  currency: string;

  @Prop({ enum: TransactionType, default: TransactionType.SEND })
  type: TransactionType;

  @Prop({ enum: TransactionStatus, default: TransactionStatus.PENDING })
  status: TransactionStatus;

  @Prop({ unique: true, sparse: true })
  transactionHash?: string;

  @Prop()
  blockNumber?: number;

  @Prop()
  description?: string;

  @Prop({ default: false })
  notified: boolean;

  @Prop()
  completedAt?: Date;
}

export type TransactionDocument = Transaction & Document;

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

TransactionSchema.index({ fromPhone: 1, createdAt: -1 });
TransactionSchema.index({ toPhone: 1, createdAt: -1 });
TransactionSchema.index({ transactionHash: 1 }, { unique: true, sparse: true });

