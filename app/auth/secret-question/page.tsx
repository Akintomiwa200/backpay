// app/auth/secret-question/page.jsx
'use client'

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SecretQuestionSetup from '../../../components/SecretQuestionSetup';
import PassphraseDisplay from '../../../components/PassphraseDisplay';
import WalletComplete from '../../../components/WalletComplete';

// Create a separate component that uses useSearchParams
function SecretQuestionContent() {
  const [currentStep, setCurrentStep] = useState('questions');
  const [generatedPassphrase, setGeneratedPassphrase] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const action = searchParams.get('action'); // 'create' or 'recover'

  useEffect(() => {
    if (!action) {
      router.push('/create-wallet');
    }
  }, [action, router]);

  const handleQuestionsSuccess = (passphrase, address) => {
    setGeneratedPassphrase(passphrase);
    setWalletAddress(address);
    setCurrentStep('passphrase');
  };

  const handleBackToQuestions = () => {
    setCurrentStep('questions');
  };

  const handlePassphraseContinue = () => {
    setCurrentStep('complete');
  };

  const handleWalletComplete = () => {
    router.push('/wallet');
  };

  if (currentStep === 'complete') {
    return (
      <WalletComplete 
        walletAddress={walletAddress}
        onContinue={handleWalletComplete}
      />
    );
  }

  if (currentStep === 'passphrase') {
    return (
      <PassphraseDisplay
        passphrase={generatedPassphrase}
        onContinue={handlePassphraseContinue}
        onBack={handleBackToQuestions}
      />
    );
  }

  return (
    <SecretQuestionSetup
      onSuccess={handleQuestionsSuccess}
      onBack={() => router.push('/create-wallet')}
    />
  );
}

// Main component with Suspense boundary
const SecretQuestionPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SecretQuestionContent />
    </Suspense>
  );
};

export default SecretQuestionPage;