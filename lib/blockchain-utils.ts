import { ethers } from 'ethers';

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);

export async function getWalletBalance(address: string): Promise<string> {
  try {
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error('Error getting balance:', error);
    return '0';
  }
}

export async function sendTransaction(from: string, to: string, amount: string, privateKey: string) {
  try {
    const wallet = new ethers.Wallet(privateKey, provider);
    const tx = await wallet.sendTransaction({
      to,
      value: ethers.parseEther(amount)
    });
    
    return tx.hash;
  } catch (error) {
    console.error('Error sending transaction:', error);
    throw error;
  }
}

export async function getTransactionHistory(address: string) {
  try {
    // This would typically use a service like Etherscan or The Graph
    // For now, return mock data or implement with your preferred service
    return [];
  } catch (error) {
    console.error('Error getting transaction history:', error);
    return [];
  }
}