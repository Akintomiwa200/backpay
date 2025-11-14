import { IsNotEmpty, IsString, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ description: 'Sender phone number' })
  @IsNotEmpty()
  @IsString()
  fromPhone: string;

  @ApiProperty({ description: 'Recipient phone number' })
  @IsNotEmpty()
  @IsString()
  toPhone: string;

  @ApiProperty({ description: 'Amount to send' })
  @IsNotEmpty()
  @IsString()
  amount: string;

  @ApiProperty({ description: 'Transaction description (optional)', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}