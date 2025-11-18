// components/SecretQuestionSetup.jsx
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRegisterSetQuestionMutate } from '@/hooks/useRegisterMutation';


const SecretQuestionSetup = ({ onSuccess, onBack }) => {
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const securityQuestions = [
    {
      id: 1,
      question: "What was the name of your first pet?",
      placeholder: "Enter your first pet's name"
    },
    {
      id: 2,
      question: "In what city were you born?",
      placeholder: "Enter your birth city"
    },
    {
      id: 3,
      question: "What is your mother's maiden name?",
      placeholder: "Enter mother's maiden name"
    },
    {
      id: 4,
      question: "What was the name of your elementary school?",
      placeholder: "Enter elementary school name"
    },
    {
      id: 5,
      question: "What was your childhood nickname?",
      placeholder: "Enter your childhood nickname"
    }
  ];

  const router = useRouter();

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    if (error) setError('');
  };

  const allQuestionsAnswered = () => {
    return securityQuestions.every(question => 
      answers[question.id]?.trim().length > 2
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!allQuestionsAnswered()) {
      setError('Please answer all security questions');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Store security answers and generate wallet
      const response = await fetch('/api/auth/setup-wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          answers,
          action: 'create'
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Security questions set up successfully, generate passphrase
        onSuccess(data.generatedPassphrase, data.walletAddress);
      } else {
        setError(data.error || 'Failed to set up security questions');
      }
    } catch (err) {
      setError('Setup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-2xl border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Set Up Security Questions
          </h1>
          <p className="text-gray-400">
            These questions will help you recover your wallet if needed
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <div className="w-16 h-1 bg-blue-500 mx-2"></div>
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">2</span>
            </div>
            <div className="w-16 h-1 bg-gray-600 mx-2"></div>
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">3</span>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 mb-8">
          <span className="text-purple-400">Security Questions</span> → Backup Phrase → Complete
        </div>

        {/* Security Questions Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {securityQuestions.map((question, index) => (
            <div key={question.id} className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
              <label className="block text-white font-semibold mb-3">
                <span className="text-purple-400 mr-2">Q{index + 1}:</span>
                {question.question}
              </label>
              <input
                type="text"
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                placeholder={question.placeholder}
                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                disabled={isLoading}
              />
            </div>
          ))}

          {error && (
            <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onBack}
              disabled={isLoading}
              className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!allQuestionsAnswered() || isLoading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
            >
              {isLoading ? 'Setting Up...' : 'Generate Recovery Phrase'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecretQuestionSetup;