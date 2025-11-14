import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('transactions')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('user/:phoneNumber')
  @ApiOperation({ summary: 'Get user transactions' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getUserTransactions(
    @Param('phoneNumber') phoneNumber: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const { transactions, total } = await this.transactionsService.findByPhone(phoneNumber, page, limit);

    return {
      success: true,
      transactions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  @Get('hash/:transactionHash')
  @ApiOperation({ summary: 'Get transaction by hash' })
  async getTransactionByHash(@Param('transactionHash') transactionHash: string) {
    const transaction = await this.transactionsService.findByTransactionHash(transactionHash);
    
    if (!transaction) {
      return {
        success: false,
        message: 'Transaction not found',
      };
    }

    return {
      success: true,
      transaction,
    };
  }

  @Post('send')
  @ApiOperation({ summary: 'Send transaction' })
  @ApiResponse({ status: 201, description: 'Transaction initiated' })
  async sendTransaction(
    @Body() body: { fromPhone: string; toPhone: string; amount: string; description?: string },
  ) {
    const result = await this.transactionsService.executeTransaction(
      body.fromPhone,
      body.toPhone,
      body.amount,
      body.description,
    );

    if (result.success) {
      return {
        success: true,
        message: 'Transaction completed successfully',
        transaction: result.transaction,
      };
    } else {
      return {
        success: false,
        message: 'Transaction failed',
        error: result.error,
      };
    }
  }

  @Get('stats/:phoneNumber?')
  @ApiOperation({ summary: 'Get transaction statistics' })
  async getTransactionStats(@Param('phoneNumber') phoneNumber?: string) {
    const stats = await this.transactionsService.getTransactionStats(phoneNumber);
    
    return {
      success: true,
      stats,
    };
  }

  @Get('recent')
  @ApiOperation({ summary: 'Get recent transactions' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getRecentTransactions(@Query('limit') limit = 10) {
    const transactions = await this.transactionsService.getRecentTransactions(limit);
    
    return {
      success: true,
      transactions,
    };
  }

  @Get('pending')
  @ApiOperation({ summary: 'Get pending transactions' })
  async getPendingTransactions() {
    const transactions = await this.transactionsService.getPendingTransactions();
    
    return {
      success: true,
      transactions,
    };
  }
}