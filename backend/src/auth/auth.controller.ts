import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login with phone number and PIN' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: { phoneNumber: string; pin: string }) {
    const user = await this.authService.validateUser(loginDto.phoneNumber, loginDto.pin);
    
    if (!user) {
      return {
        success: false,
        message: 'Invalid phone number or PIN',
      };
    }

    return {
      success: true,
      ...await this.authService.login(user),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  getProfile(@Request() req) {
    return {
      success: true,
      user: req.user,
    };
  }

  @Public()
  @Post('verify-token')
  @ApiOperation({ summary: 'Verify JWT token' })
  @ApiResponse({ status: 200, description: 'Token is valid' })
  @ApiResponse({ status: 401, description: 'Token is invalid' })
  async verifyToken(@Body() body: { token: string }) {
    try {
      const user = await this.authService.validateToken(body.token);
      return {
        success: true,
        user: {
          phoneNumber: user.phoneNumber,
          fullName: user.fullName,
          walletAddress: user.walletAddress,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: 'Invalid token',
      };
    }
  }
}