import { IsNotEmpty, IsString, IsEmail, IsOptional, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User phone number' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[\+]?[1-9][\d]{0,15}$/, {
    message: 'Invalid phone number format'
  })
  phoneNumber: string;

  @ApiProperty({ description: 'User full name' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'User email (optional)', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;
}

export class UpdateUserDto {
  @ApiProperty({ description: 'User full name', required: false })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ description: 'User email', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;
}