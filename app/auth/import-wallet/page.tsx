// app/import-wallet/page.jsx
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RecoveryPhraseImport from '../../../components/RecoveryPhraseImport'
import PrivateKeyImport from '../../../components/PrivateKeyImport'

const ImportWalletPage = () => {
  const router = useRouter();
  const [importMethod, setImportMethod] = useState('recovery'); // 'recovery' or 'privateKey'
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    router.push('/create-wallet');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-gray-900 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Import Wallet
          </h1>
          <p className="text-gray-400">
            Restore your wallet using your recovery phrase or private key
          </p>
        </div>

        {/* Import Method Selection */}
        <div className="bg-gray-700/50 rounded-xl p-4 mb-6 border border-gray-600">
          <h3 className="text-white font-semibold mb-3">Import Method</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setImportMethod('recovery')}
              className={`p-3 rounded-lg border-2 transition-all ${
                importMethod === 'recovery'
                  ? 'border-green-500 bg-green-900/20 text-white'
                  : 'border-gray-600 bg-gray-600/50 text-gray-300 hover:border-gray-500'
              }`}
            >
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-semibold">Recovery Phrase</span>
            </button>
            <button
              onClick={() => setImportMethod('privateKey')}
              className={`p-3 rounded-lg border-2 transition-all ${
                importMethod === 'privateKey'
                  ? 'border-blue-500 bg-blue-900/20 text-white'
                  : 'border-gray-600 bg-gray-600/50 text-gray-300 hover:border-gray-500'
              }`}
            >
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              <span className="text-sm font-semibold">Private Key</span>
            </button>
          </div>
        </div>

        {/* Import Form */}
        {importMethod === 'recovery' ? (
          <RecoveryPhraseImport />
        ) : (
          <PrivateKeyImport />
        )}

        {/* Back Button */}
        <button
          onClick={handleBack}
          disabled={isLoading}
          className="w-full bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 mt-4 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Wallet Options
        </button>
      </div>
    </div>
  );
};

export default ImportWalletPage;