import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as contractJson from './abi/MyContract.json';

@Injectable()
export class Web3Service {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    this.contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS!,
      contractJson.abi,
      this.provider
    );
  }

  async getMessage() {
    return await this.contract.message();
  }

  async setMessage(newMessage: string) {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, this.provider);
    const contract = this.contract.connect(wallet);
    const tx = await contract.setMessage(newMessage);
    await tx.wait();
    return tx.hash;
  }
}
