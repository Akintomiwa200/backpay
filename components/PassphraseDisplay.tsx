// components/PassphraseDisplay.jsx
'use client'

import { useState, useEffect } from 'react';

const PassphraseDisplay = ({ passphrase, onContinue, onBack }) => {
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [confirmed, setConfirmed] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0 && showPassphrase) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, showPassphrase]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(passphrase);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatPassphrase = (phrase) => {
    const words = phrase.split(' ');
    return words.map((word, index) => (
      <div
        key={index}
        className="bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-3 text-center"
      >
        <span className="text-gray-400 text-sm block mb-1">{index + 1}</span>
        <span className="text-white font-semibold text-lg">{word}</span>
      </div>
    ));
  };

  const handleReveal = () => {
    setShowPassphrase(true);
    setCountdown(30);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-4xl border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Your Secret Recovery Phrase
          </h1>
          <p className="text-gray-400 text-lg">
            This is the only way to recover your wallet. Save it securely!
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <div className="w-16 h-1 bg-blue-500 mx-2"></div>
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">2</span>
            </div>
            <div className="w-16 h-1 bg-gray-600 mx-2"></div>
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">3</span>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 mb-8">
          Security Questions → <span className="text-yellow-400">Backup Phrase</span> → Complete
        </div>

        {/* Critical Warning Banner */}
        <div className="bg-red-900/50 border border-red-700 rounded-xl p-4 mb-6">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-red-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="text-red-300 font-bold text-lg mb-2">⚠️ Critical Security Warning</h3>
              <div className="text-red-200 text-sm space-y-1">
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                  <strong>Never share this phrase with anyone!</strong> Anyone with this phrase can steal your assets.
                </p>
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                  <strong>We will never ask for your recovery phrase.</strong> Beware of scammers.
                </p>
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                  <strong>Store it securely offline.</strong> This is your only backup.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Passphrase Display Area */}
        <div className="bg-gray-900 rounded-xl p-6 mb-6 border-2 border-dashed border-gray-600">
          {!showPassphrase ? (
            // Hidden State
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Ready to reveal your phrase?</h3>
              <p className="text-gray-400 mb-6">Make sure you're in a private space before continuing.</p>
              <button
                onClick={handleReveal}
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
              >
                <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Reveal Recovery Phrase
              </button>
            </div>
          ) : (
            // Revealed State
            <>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                {formatPassphrase(passphrase)}
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={copyToClipboard}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {copied ? 'Copied to Clipboard!' : 'Copy to Clipboard'}
                </button>
                <button
                  onClick={() => setShowPassphrase(false)}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  Hide Phrase
                </button>
              </div>

              {/* Countdown Timer */}
              {countdown > 0 && (
                <div className="text-center mt-4">
                  <p className="text-yellow-400 text-sm">
                    ⏳ Please save your phrase. Continuing in {countdown} seconds...
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Confirmation Checkbox */}
        {showPassphrase && (
          <div className="bg-gray-700/50 rounded-xl p-4 mb-6 border border-gray-600">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-1 w-5 h-5 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
              />
              <div>
                <span className="text-white font-semibold block mb-1">
                  I have securely saved my recovery phrase
                </span>
                <span className="text-gray-400 text-sm">
                  I understand that if I lose this phrase, I will permanently lose access to my wallet and funds. 
                  I have stored it in a secure offline location.
                </span>
              </div>
            </label>
          </div>
        )}

        {/* Security Best Practices */}
        <div className="bg-blue-900/20 rounded-xl p-4 mb-6 border border-blue-700/50">
          <h4 className="text-blue-300 font-semibold mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Security Best Practices
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-blue-200 text-sm">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Write it down on paper
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Use a metal backup plate
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Store in a fireproof safe
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Never store digitally
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Memorize if possible
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Keep multiple copies
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onBack}
            className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Security Questions
          </button>
          <button
            onClick={onContinue}
            disabled={!confirmed || countdown > 0}
            className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {countdown > 0 ? (
              `Continue in ${countdown}s`
            ) : (
              <>
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                I've Saved My Phrase
              </>
            )}
          </button>
        </div>

        {/* Final Warning */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 This is your last chance to save your recovery phrase. You won't be able to see it again.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PassphraseDisplay;