import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(phoneNumber: string, pin: string): Promise<any> {
    const user = await this.usersService.findByPhone(phoneNumber);
    
    if (user && await this.verifyPin(pin, user.encryptedPin)) {
      const { encryptedPin, ...result } = user.toObject();
      return result;
    }
    
    return null;
  }

  async login(user: any) {
    const payload = { 
      phoneNumber: user.phoneNumber, 
      sub: user._id,
      walletAddress: user.walletAddress 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        phoneNumber: user.phoneNumber,
        fullName: user.fullName,
        walletAddress: user.walletAddress,
        isVerified: user.isVerified,
      },
    };
  }

  async generatePin(): Promise<string> {
    return Math.random().toString().slice(2, 8); // 6-digit PIN
  }

  async hashPin(pin: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(pin, salt);
  }

  async verifyPin(pin: string, hashedPin: string): Promise<boolean> {
    return bcrypt.compare(pin, hashedPin);
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findByPhone(payload.phoneNumber);
      
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      
      return user;
    } catch (error) {
      this.logger.error('Token validation failed', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}