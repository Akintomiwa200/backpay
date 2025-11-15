// components/WalletComplete.jsx
'use client'

import { useState } from 'react';

const WalletComplete = ({ walletAddress, onContinue }) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-gray-900 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md border border-gray-700 shadow-2xl">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Wallet Created!
          </h1>
          <p className="text-gray-400">
            Your secure wallet is ready to use
          </p>
        </div>

        {/* Wallet Address */}
        <div className="bg-gray-700/50 rounded-xl p-4 mb-6 border border-gray-600">
          <h3 className="text-white font-semibold mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Your Wallet Address
          </h3>
          <div className="flex items-center space-x-2">
            <code className="flex-1 font-mono text-sm text-white bg-gray-600 px-3 py-2 rounded">
              {walletAddress}
            </code>
            <button
              onClick={copyAddress}
              className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded-lg transition-colors"
            >
              {copied ? '✓' : '📋'}
            </button>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-900/20 rounded-xl p-4 mb-6 border border-blue-700/50">
          <h4 className="text-blue-300 font-semibold mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Next Steps
          </h4>
          <ul className="text-blue-200 text-sm space-y-1">
            <li>• Fund your wallet with crypto</li>
            <li>• Explore dApps and DeFi</li>
            <li>• Secure your recovery phrase</li>
            <li>• Never share your private keys</li>
          </ul>
        </div>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
        >
          Enter Your Wallet
        </button>
      </div>
    </div>
  );
};

export default WalletComplete;