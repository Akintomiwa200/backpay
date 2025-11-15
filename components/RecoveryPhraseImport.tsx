// components/RecoveryPhraseImport.jsx
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RecoveryPhraseImport = () => {
  const router = useRouter();
  const [recoveryPhrase, setRecoveryPhrase] = useState('');
  const [walletName, setWalletName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [derivationPath, setDerivationPath] = useState("m/44'/60'/0'/0/0");

  const handleImport = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate recovery phrase
    const words = recoveryPhrase.trim().split(/\s+/);
    if (words.length !== 12 && words.length !== 24) {
      setError('Recovery phrase must be 12 or 24 words');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate wallet import process
      const response = await fetch('/api/wallet/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'recovery',
          phrase: recoveryPhrase,
          walletName,
          derivationPath: showAdvanced ? derivationPath : undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Successfully imported, redirect to wallet
        router.push('/wallet');
      } else {
        setError(data.error || 'Failed to import wallet');
      }
    } catch (err) {
      setError('Import failed. Please check your recovery phrase and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleImport} className="space-y-4">
      {/* Wallet Name */}
      <div>
        <label className="block text-white font-semibold mb-2">
          Wallet Name (Optional)
        </label>
        <input
          type="text"
          value={walletName}
          onChange={(e) => setWalletName(e.target.value)}
          placeholder="My Imported Wallet"
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Recovery Phrase */}
      <div>
        <label className="block text-white font-semibold mb-2">
          Recovery Phrase
        </label>
        <textarea
          value={recoveryPhrase}
          onChange={(e) => setRecoveryPhrase(e.target.value)}
          placeholder="Enter your 12 or 24 word recovery phrase separated by spaces"
          rows="4"
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none font-mono text-sm"
        />
        <p className="text-gray-400 text-xs mt-1">
          Usually 12 or 24 words separated by spaces
        </p>
      </div>

      {/* Advanced Options */}
      <div className="border-t border-gray-600 pt-4">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center text-gray-400 hover:text-gray-300 text-sm font-semibold transition-colors"
        >
          <svg 
            className={`w-4 h-4 mr-2 transition-transform ${showAdvanced ? 'rotate-90' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Advanced Options
        </button>

        {showAdvanced && (
          <div className="mt-3 space-y-3">
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Derivation Path
              </label>
              <select
                value={derivationPath}
                onChange={(e) => setDerivationPath(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              >
                <option value="m/44'/60'/0'/0/0">Ethereum (m/44'/60'/0'/0/0)</option>
                <option value="m/44'/1'/0'/0/0">Ethereum Testnet (m/44'/1'/0'/0/0)</option>
                <option value="m/44'/61'/0'/0/0">Ethereum Classic (m/44'/61'/0'/0/0)</option>
                <option value="m/44'/137'/0'/0/0">Polygon (m/44'/137'/0'/0/0)</option>
                <option value="m/44'/60'/0'/0">Ledger Live (m/44'/60'/0'/0)</option>
                <option value="custom">Custom Path</option>
              </select>
              
              {derivationPath === 'custom' && (
                <input
                  type="text"
                  value={derivationPath}
                  onChange={(e) => setDerivationPath(e.target.value)}
                  placeholder="m/44'/60'/0'/0/0"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm mt-2 font-mono"
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Security Warning */}
      <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3">
        <p className="text-yellow-200 text-xs">
          <strong>Security Tip:</strong> Make sure you're in a private space and no one can see your screen while entering your recovery phrase.
        </p>
      </div>

      {/* Import Button */}
      <button
        type="submit"
        disabled={!recoveryPhrase.trim() || isLoading}
        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Importing Wallet...
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Import Wallet
          </>
        )}
      </button>
    </form>
  );
};

export default RecoveryPhraseImport;