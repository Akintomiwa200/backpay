import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Web3Service } from './web3.service';

@ApiTags('web3')
@Controller('web3')
export class Web3Controller {
  constructor(private readonly web3Service: Web3Service) {}

  @Post('send')
  @ApiOperation({ summary: 'Send transaction' })
  async sendTransaction(
    @Body() body: { to: string; amount: string; fromPhone: string },
  ) {
    return this.web3Service.sendTransaction(body.to, body.amount, body.fromPhone);
  }

  @Get('balance/:address')
  @ApiOperation({ summary: 'Get wallet balance' })
  async getBalance(@Param('address') address: string) {
    return this.web3Service.getBalance(address);
  }

  @Post('wallet/create')
  @ApiOperation({ summary: 'Create new wallet' })
  async createWallet() {
    return this.web3Service.createWallet();
  }
}