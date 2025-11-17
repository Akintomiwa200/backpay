import { Controller, Get, Put, Body, Param, UseGuards, Query, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get paginated users (public)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async listUsers(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const { users, total } = await this.usersService.getAllUsers(
      Math.max((Number(page) || 1) - 1, 0) * (Number(limit) || 10),
      Number(limit) || 10,
    );

    const sanitized = users.map(user => {
      const { encryptedPrivateKey, encryptedPin, ...safeUser } = user.toObject();
      return safeUser;
    });

    return {
      success: true,
      users: sanitized,
      pagination: {
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        total,
        pages: Math.ceil(total / (Number(limit) || 10)) || 0,
      },
    };
  }

  @Get('profile/:phoneNumber')
  @ApiOperation({ summary: 'Get user profile by phone number' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getProfile(@Param('phoneNumber') phoneNumber: string) {
    const user = await this.usersService.findByPhone(phoneNumber);
    
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    // Remove sensitive data
    const { encryptedPrivateKey, encryptedPin, ...userProfile } = user.toObject();

    return {
      success: true,
      user: userProfile,
    };
  }

  @Get('wallet/:walletAddress')
  @ApiOperation({ summary: 'Get user by wallet address' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  async getUserByWallet(@Param('walletAddress') walletAddress: string) {
    const user = await this.usersService.findByWalletAddress(walletAddress);
    
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    const { encryptedPrivateKey, encryptedPin, ...userProfile } = user.toObject();

    return {
      success: true,
      user: userProfile,
    };
  }

  @Put('profile/:phoneNumber')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  async updateProfile(
    @Param('phoneNumber') phoneNumber: string,
    @Body() updateData: { fullName?: string; email?: string },
  ) {
    const user = await this.usersService.update(phoneNumber, updateData);
    
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    const { encryptedPrivateKey, encryptedPin, ...userProfile } = user.toObject();

    return {
      success: true,
      message: 'Profile updated successfully',
      user: userProfile,
    };
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all users (paginated)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getAllUsers(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const skip = (page - 1) * limit;
    const { users, total } = await this.usersService.getAllUsers(skip, limit);

    // Remove sensitive data from all users
    const safeUsers = users.map(user => {
      const userObj = user.toObject();
      const { encryptedPrivateKey, encryptedPin, ...safeUser } = userObj;
      return safeUser;
    });

    return {
      success: true,
      users: safeUsers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get user statistics' })
  async getUserStats() {
    const stats = await this.usersService.getUserStats();
    
    return {
      success: true,
      stats,
    };
  }

  @Delete(':phoneNumber')
  @ApiOperation({ summary: 'Delete user account' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  async deleteUser(@Param('phoneNumber') phoneNumber: string) {
    const result = await this.usersService.deleteUser(phoneNumber);
    
    if (!result) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    return {
      success: true,
      message: 'User deleted successfully',
    };
  }
}