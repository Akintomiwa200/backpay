import { IsNotEmpty, IsString, Matches, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({
    description: 'Phone number in international format (without +)',
    example: '1234567890',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[\+]?[1-9][\d]{0,15}$/, {
    message: 'Invalid phone number format'
  })
  to: string;

  @ApiProperty({
    description: 'Message to send',
    example: 'Hello from BackPay!',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 1000)
  message: string;
}

export class BroadcastMessageDto {
  @ApiProperty({
    description: 'Array of phone numbers in international format',
    example: ['1234567890', '0987654321'],
    type: [String],
  })
  @IsNotEmpty()
  phoneNumbers: string[];

  @ApiProperty({
    description: 'Message to broadcast',
    example: 'Important update from BackPay!',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 1000)
  message: string;
}