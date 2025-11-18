import { NextRequest, NextResponse } from 'next/server';
import { getCache } from '@/lib/redis-utils';
import { getWalletBalance, sendTransaction } from '@/lib/blockchain-utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const address = searchParams.get('address');

    if (!userId && !address) {
      return NextResponse.json(
        { success: false, error: 'User ID or address required' },
        { status: 400 }
      );
    }

    let walletAddress = address;
    
    if (userId && !address) {
      const sessionData = await getCache(`wallet:${userId}`);
      if (!sessionData) {
        return NextResponse.json(
          { success: false, error: 'Wallet not found' },
          { status: 404 }
        );
      }
      walletAddress = sessionData.walletAddress;
    }

    const balance = await getWalletBalance(walletAddress!);

    return NextResponse.json({
      success: true,
      address: walletAddress,
      balance
    });
  } catch (error) {
    console.error('Wallet error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { from, to, amount, privateKey } = await request.json();

    const txHash = await sendTransaction(from, to, amount, privateKey);

    return NextResponse.json({
      success: true,
      transactionHash: txHash
    });
  } catch (error) {
    console.error('Transaction error:', error);
    return NextResponse.json(
      { success: false, error: 'Transaction failed' },
      { status: 500 }
    );
  }
}