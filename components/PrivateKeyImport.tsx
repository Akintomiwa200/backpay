// components/PrivateKeyImport.jsx
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PrivateKeyImport = () => {
  const router = useRouter();
  const [privateKey, setPrivateKey] = useState('');
  const [walletName, setWalletName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  const handleImport = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic private key validation
    const cleanedKey = privateKey.trim();
    if (!cleanedKey) {
      setError('Please enter your private key');
      setIsLoading(false);
      return;
    }

    // Check if it's a valid hex string (basic check)
    const hexRegex = /^(0x)?[0-9a-fA-F]{64}$/;
    if (!hexRegex.test(cleanedKey)) {
      setError('Invalid private key format. Should be 64-character hex string.');
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
          type: 'privateKey',
          privateKey: cleanedKey,
          walletName,
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
      setError('Import failed. Please check your private key and try again.');
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
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Private Key Input */}
      <div>
        <label className="block text-white font-semibold mb-2">
          Private Key
        </label>
        <div className="relative">
          <input
            type={showPrivateKey ? "text" : "password"}
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            placeholder="Enter your 64-character private key (with or without 0x prefix)"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPrivateKey(!showPrivateKey)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
          >
            {showPrivateKey ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-gray-400 text-xs mt-1">
          64-character hexadecimal string (with or without 0x prefix)
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Critical Security Warning */}
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h4 className="text-red-300 font-semibold mb-1">Extreme Caution Required</h4>
            <ul className="text-red-200 text-xs space-y-1">
              <li>• Never share your private key with anyone</li>
              <li>• Ensure you're in a completely private environment</li>
              <li>• Double-check for malicious software or keyloggers</li>
              <li>• Consider using recovery phrase instead for better security</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Import Button */}
      <button
        type="submit"
        disabled={!privateKey.trim() || isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            Import with Private Key
          </>
        )}
      </button>
    </form>
  );
};

export default PrivateKeyImport;