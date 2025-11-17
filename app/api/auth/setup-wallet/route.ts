import { NextResponse } from 'next/server';
import crypto from 'crypto';

const WORDLIST = [
  'orbit', 'quantum', 'ember', 'lunar', 'pixel', 'summit', 'velvet', 'harbor',
  'echo', 'nova', 'galaxy', 'vertex', 'saga', 'ember', 'delta', 'amber',
  'cobalt', 'aurora', 'radar', 'zenith', 'atlas', 'fusion', 'nebula', 'matrix',
];

const generatePassphrase = (length = 12) => {
  const words: string[] = [];
  for (let i = 0; i < length; i += 1) {
    const index = crypto.randomInt(0, WORDLIST.length);
    words.push(WORDLIST[index]);
  }
  return words.join(' ');
};

const generateWalletAddress = () => `0x${crypto.randomBytes(20).toString('hex')}`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers, action } = body ?? {};

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Security answers are required' },
        { status: 400 },
      );
    }

    const normalizedAnswers = Object.values(answers).filter(
      (answer) => typeof answer === 'string' && answer.trim().length >= 3,
    );

    if (normalizedAnswers.length < 3) {
      return NextResponse.json(
        { success: false, error: 'Please provide valid answers for all questions' },
        { status: 400 },
      );
    }

    const generatedPassphrase = generatePassphrase();
    const walletAddress = generateWalletAddress();

    return NextResponse.json({
      success: true,
      action: action || 'create',
      generatedPassphrase,
      walletAddress,
      backup: {
        recoveryQuestions: normalizedAnswers.length,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to set up wallet',
      },
      { status: 500 },
    );
  }
}

