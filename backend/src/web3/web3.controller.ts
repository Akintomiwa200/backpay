import { Controller, Get, Post, Body } from '@nestjs/common';
import { Web3Service } from './web3.service';

@Controller('web3')
export class Web3Controller {
  constructor(private readonly web3: Web3Service) {}

  @Get('message')
  async getMessage() {
    return { message: await this.web3.getMessage() };
  }

  @Post('message')
  async setMessage(@Body() body: { message: string }) {
    return { txHash: await this.web3.setMessage(body.message) };
  }
}
