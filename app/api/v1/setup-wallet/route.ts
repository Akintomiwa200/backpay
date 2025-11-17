import { NextRequest, NextResponse } from 'next/server';
import { setCache } from '@/lib/redis-utils';
import { generateMnemonic, walletFromMnemonic } from '@/lib/crypto-utils';

export async function POST(request: NextRequest) {
  try {
    const { answers, action } = await request.json();

    if (!answers || Object.keys(answers).length === 0) {
      return NextResponse.json(
        { success: false, error: 'Security answers are required' },
        { status: 400 }
      );
    }

    // Generate mnemonic and wallet
    const mnemonic = generateMnemonic();
    const wallet = walletFromMnemonic(mnemonic);
    
    // Create session ID
    const sessionId = `wallet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Store security answers and wallet info in Redis
    const sessionData = {
      mnemonic,
      walletAddress: wallet.address,
      privateKey: wallet.privateKey,
      securityAnswers: answers,
      createdAt: Date.now(),
      action
    };

    // Store in Redis with 1 hour expiry
    const cacheSuccess = await setCache(`wallet:${sessionId}`, sessionData, 3600);
    
    if (!cacheSuccess) {
      return NextResponse.json(
        { success: false, error: 'Failed to store wallet data' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      sessionId,
      generatedPassphrase: mnemonic,
      walletAddress: wallet.address,
      message: 'Wallet created successfully'
    });
  } catch (error) {
    console.error('Wallet setup error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}