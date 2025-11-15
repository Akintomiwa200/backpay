// app/forgot-passphrase/page.jsx
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ForgotPassphrasePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (!selectedOption) return;

    setIsLoading(true);
    
    if (selectedOption === 'recover') {
      // Redirect to security questions recovery
      router.push('/auth/secret-question?action=recover');
    } else if (selectedOption === 'create') {
      // Redirect to create new wallet
      router.push('/create-wallet');
    }
  };

  const handleBackToLogin = () => {
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Forgot Passphrase?
          </h1>
          <p className="text-gray-400">
            Don't worry! Choose how you'd like to recover access
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-yellow-900/50 border border-yellow-700 rounded-xl p-4 mb-6">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="text-yellow-300 font-semibold mb-1">Important</h3>
              <p className="text-yellow-200 text-sm">
                If you don't have your recovery phrase or security answers, you cannot recover your existing wallet.
              </p>
            </div>
          </div>
        </div>

        {/* Recovery Options */}
        <div className="space-y-4 mb-6">
          <div
            onClick={() => handleOptionSelect('recover')}
            className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
              selectedOption === 'recover'
                ? 'border-green-500 bg-green-900/20'
                : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
            }`}
          >
            <div className="flex items-start">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 mt-1 ${
                selectedOption === 'recover'
                  ? 'border-green-500 bg-green-500'
                  : 'border-gray-500'
              }`}>
                {selectedOption === 'recover' && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Recover with Security Questions</h3>
                <p className="text-gray-400 text-sm">
                  Answer your security questions to regenerate your passphrase and recover your existing wallet
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={() => handleOptionSelect('create')}
            className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
              selectedOption === 'create'
                ? 'border-blue-500 bg-blue-900/20'
                : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
            }`}
          >
            <div className="flex items-start">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 mt-1 ${
                selectedOption === 'create'
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-500'
              }`}>
                {selectedOption === 'create' && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Create New Wallet</h3>
                <p className="text-gray-400 text-sm">
                  Start fresh with a new wallet. Your existing wallet and funds will be permanently lost.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Warning for Create New Option */}
        {selectedOption === 'create' && (
          <div className="bg-red-900/50 border border-red-700 rounded-xl p-4 mb-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="text-red-300 font-semibold mb-1">⚠️ Permanent Loss Warning</h3>
                <p className="text-red-200 text-sm">
                  Creating a new wallet will permanently disconnect you from your existing wallet. Any funds in your current wallet will be lost forever.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleContinue}
            disabled={!selectedOption || isLoading}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Continuing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Continue
              </>
            )}
          </button>

          <button
            onClick={handleBackToLogin}
            disabled={isLoading}
            className="w-full bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Login
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Need help? Contact our support team for assistance
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassphrasePage;