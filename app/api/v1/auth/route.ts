import { NextRequest, NextResponse } from 'next/server';
import { setCache, getCache, deleteCache } from '@/lib/redis-utils';
import { generateMnemonic, walletFromMnemonic } from '@/lib/crypto-utils';

export async function POST(request: NextRequest) {
  try {
    const { action, answers, userId } = await request.json();

    if (action === 'create') {
      // Generate mnemonic and wallet
      const mnemonic = generateMnemonic();
      const wallet = walletFromMnemonic(mnemonic);
      
      // Store security answers and wallet info in Redis
      const sessionData = {
        mnemonic,
        walletAddress: wallet.address,
        privateKey: wallet.privateKey,
        securityAnswers: answers,
        createdAt: Date.now()
      };

      await setCache(`wallet:${userId}`, sessionData, 3600); // 1 hour expiry

      return NextResponse.json({
        success: true,
        mnemonic,
        walletAddress: wallet.address
      });
    }

    if (action === 'recover') {
      // Verify security answers and recover wallet
      const sessionData = await getCache(`wallet:${userId}`);
      
      if (!sessionData) {
        return NextResponse.json(
          { success: false, error: 'Session expired or invalid' },
          { status: 400 }
        );
      }

      // Verify answers (in real app, you'd use proper encryption/hashing)
      const isVerified = JSON.stringify(sessionData.securityAnswers) === JSON.stringify(answers);
      
      if (!isVerified) {
        return NextResponse.json(
          { success: false, error: 'Security answers incorrect' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        mnemonic: sessionData.mnemonic,
        walletAddress: sessionData.walletAddress
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}