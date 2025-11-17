import { NextRequest, NextResponse } from 'next/server';
import { getTransactionHistory } from '@/lib/blockchain-utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json(
        { success: false, error: 'Address required' },
        { status: 400 }
      );
    }

    const transactions = await getTransactionHistory(address);

    return NextResponse.json({
      success: true,
      transactions
    });
  } catch (error) {
    console.error('Transactions error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}