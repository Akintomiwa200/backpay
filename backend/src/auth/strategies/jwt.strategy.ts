import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('jwt.secret'),
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findByPhone(payload.phoneNumber);
    
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      userId: user._id,
      phoneNumber: user.phoneNumber,
      fullName: user.fullName,
      walletAddress: user.walletAddress,
      isVerified: user.isVerified,
    };
  }
}