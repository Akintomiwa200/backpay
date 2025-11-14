import { registerAs } from '@nestjs/config';

export default registerAs('web3', () => ({
  providerUrl: process.env.WEB3_PROVIDER_URL || 'https://mainnet.infura.io/v3/your-key',
  contractAddress: process.env.CONTRACT_ADDRESS,
  privateKey: process.env.PRIVATE_KEY,
}));