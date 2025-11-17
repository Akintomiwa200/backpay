import { ethers } from 'ethers';

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

// Create provider with better configuration
export const provider = new ethers.JsonRpcProvider(
  `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
  'mainnet',
  {
    batchMaxCount: 1,
    staticNetwork: true
  }
);

export async function getWalletBalance(address: string): Promise<string> {
  try {
    // Validate address
    if (!ethers.isAddress(address)) {
      throw new Error('Invalid Ethereum address');
    }

    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error('Error getting balance:', error);
    return '0';
  }
}

export async function sendTransaction(from: string, to: string, amount: string, privateKey: string) {
  try {
    // Validate inputs
    if (!ethers.isAddress(from) || !ethers.isAddress(to)) {
      throw new Error('Invalid address provided');
    }

    const wallet = new ethers.Wallet(privateKey, provider);
    
    // Check balance first
    const balance = await provider.getBalance(from);
    const value = ethers.parseEther(amount);
    
    if (balance < value) {
      throw new Error('Insufficient balance');
    }

    // Estimate gas
    const gasEstimate = await provider.estimateGas({
      from,
      to,
      value
    });

    const tx = await wallet.sendTransaction({
      to,
      value,
      gasLimit: gasEstimate
    });
    
    return {
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: amount,
      timestamp: Date.now()
    };
  } catch (error) {
    console.error('Error sending transaction:', error);
    throw error;
  }
}

export async function getTransactionReceipt(txHash: string) {
  try {
    return await provider.getTransactionReceipt(txHash);
  } catch (error) {
    console.error('Error getting transaction receipt:', error);
    return null;
  }
}

export async function getTransactionHistory(address: string) {
  try {
    // Note: For mainnet transaction history, you'll need to use:
    // - Etherscan API
    // - The Graph
    // - Alchemy Enhanced APIs
    // - Moralis
    
    // Placeholder for actual implementation
    console.log('Transaction history requires external service integration');
    return [];
  } catch (error) {
    console.error('Error getting transaction history:', error);
    return [];
  }
}

// Additional utility functions
export function isValidAddress(address: string): boolean {
  return ethers.isAddress(address);
}

export function formatEther(wei: bigint): string {
  return ethers.formatEther(wei);
}

export function parseEther(eth: string): bigint {
  return ethers.parseEther(eth);
}