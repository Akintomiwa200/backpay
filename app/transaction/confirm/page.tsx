'use client'

import { useState } from 'react';
import PassphraseAuth from '../../../components/PassphraseAuth';

const TransactionPage = () => {
  const [showPassphraseAuth, setShowPassphraseAuth] = useState(false);

  const transactionDetails = {
    amount: '0.1',
    currency: 'ETH',
    toAddress: '0x742d35Cc6634C0532925a3b8Dc9C6d8e5aB1F3A2',
    networkFee: '0.0012'
  };

  const handlePassphraseSuccess = (passphrase) => {
    // Handle successful passphrase entry
    console.log('Passphrase verified:', passphrase);
    // Proceed with transaction signing
  };

  const handlePassphraseCancel = () => {
    setShowPassphraseAuth(false);
  };

  if (showPassphraseAuth) {
    return (
      <PassphraseAuth
        transactionDetails={transactionDetails}
        onSuccess={handlePassphraseSuccess}
        onCancel={handlePassphraseCancel}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h1 className="text-2xl font-bold text-white mb-6">Transaction Review</h1>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between">
            <span className="text-gray-400">Send</span>
            <span className="text-white">0.1 ETH</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">To</span>
            <span className="text-white font-mono text-sm">
              0x742d35...B1F3A2
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Network Fee</span>
            <span className="text-white">0.0012 ETH</span>
          </div>
          <div className="flex justify-between pt-4 border-t border-gray-700">
            <span className="text-gray-400">Total</span>
            <span className="text-green-400 font-bold">0.1012 ETH</span>
          </div>
        </div>

        <button 
          onClick={() => setShowPassphraseAuth(true)}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition-colors"
        >
          Confirm with Passphrase
        </button>
      </div>
    </div>
  );
};

export default TransactionPage; 