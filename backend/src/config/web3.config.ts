import { registerAs } from '@nestjs/config';

export default registerAs('web3', () => ({
  providerUrl: process.env.WEB3_PROVIDER_URL || 'https://eth-sepolia.g.alchemy.com/v2/yeh5_cSGrKWM040A2LLfJ',
  contractAddress: process.env.CONTRACT_ADDRESS,
  privateKey: process.env.PRIVATE_KEY,
}));