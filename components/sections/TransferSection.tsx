'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const TransferSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });

  // Animation variants
  const blockchainIconsVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
      },
    }),
  };

  const phoneVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Phone and Blockchain Icons */}
        <div className="relative flex items-center justify-center w-full md:w-auto">
          {/* Vertical Blockchain Icons */}
          <div className="absolute -left-24 top-1/4 flex flex-col items-center space-y-4 z-10">
            <motion.div
              custom={0}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={blockchainIconsVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-3 border border-gray-200 dark:border-gray-700"
            >
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">ETH</span>
              </div>
            </motion.div>
            <motion.div
              custom={1}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={blockchainIconsVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-3 border border-gray-200 dark:border-gray-700"
            >
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">BNB</span>
              </div>
            </motion.div>
            <motion.div
              custom={2}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={blockchainIconsVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-3 border border-gray-200 dark:border-gray-700"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">MATIC</span>
              </div>
            </motion.div>
            <motion.div
              custom={3}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={blockchainIconsVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-3 border border-gray-200 dark:border-gray-700"
            >
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">ARB</span>
              </div>
            </motion.div>
            <motion.div
              custom={4}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={blockchainIconsVariants}
              className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-semibold text-xs rounded-xl px-4 py-4 mt-2 shadow text-center border border-blue-200 dark:border-blue-800"
            >
              10+ Chains
            </motion.div>
          </div>

          {/* Phone Mockup */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={phoneVariants}
            className="relative z-20"
          >
            <div className="relative w-80 h-[600px]">
              <div className="absolute inset-0 bg-green-500 rounded-[3rem] shadow-2xl">
                <div className="absolute inset-2 bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden">
                  <div className="h-full bg-gray-50 dark:bg-gray-800 text-white relative">
                    {/* WhatsApp Header */}
                    <div className="bg-green-500 text-white p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                          <span className="text-green-500 text-xs font-bold">B</span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">BackPay</div>
                          <div className="text-xs text-green-100">
                            Online • Web3 Transfer
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat UI */}
                    <div className="p-4 space-y-4">
                      {/* Welcome Message */}
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          B
                        </div>
                        <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                          <p className="text-sm text-gray-800 dark:text-gray-200">
                            Ready to send crypto! 🚀
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Use: "send [amount] [coin] to [phone/address]"
                          </p>
                        </div>
                      </div>

                      {/* User Message */}
                      <div className="flex justify-end">
                        <div className="bg-blue-500 rounded-2xl rounded-br-none px-4 py-3 max-w-xs">
                          <p className="text-sm">send 0.1 ETH to +1234567890</p>
                        </div>
                      </div>

                      {/* Processing Message */}
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          B
                        </div>
                        <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                          <p className="text-sm text-gray-800 dark:text-gray-200">
                            🔍 Processing your transaction...
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Verifying recipient
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Confirmation Message */}
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          B
                        </div>
                        <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                          <p className="text-sm text-gray-800 dark:text-gray-200">
                            ✅ Ready to send 0.1 ETH ($215.08)
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            To: +1234567890
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Network fee: ~$1.50
                          </p>
                        </div>
                      </div>

                      {/* User Confirmation */}
                      <div className="flex justify-end">
                        <div className="bg-blue-500 rounded-2xl rounded-br-none px-4 py-3 max-w-xs">
                          <p className="text-sm">confirm</p>
                        </div>
                      </div>

                      {/* Transaction Sent */}
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          B
                        </div>
                        <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                          <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium">Transaction Sent!</span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            0.1 ETH to +1234567890
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                            Tx: 0x7d9...f4a2
                          </p>
                        </div>
                      </div>

                      {/* Balance Update */}
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          B
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            💰 Updated Balance: 1.145 ETH
                          </p>
                          <p className="text-xs text-blue-600 dark:text-blue-400">
                            ≈ $2,465.82 USD
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Input Area */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-2">
                        <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-3xl px-4 py-2">
                          <input
                            type="text"
                            placeholder="Type a message..."
                            className="w-full bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-500 text-sm outline-none"
                          />
                        </div>
                        <button className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="flex-1 max-w-xl text-center md:text-left">
          <motion.span
            custom={0}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={textVariants}
            className="uppercase text-blue-600 font-semibold tracking-wider text-sm mb-2 block"
          >
            Crypto Transfer
          </motion.span>

          <motion.h2
            custom={1}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={textVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Send Crypto,
            <br />
            <span className="text-blue-600 dark:text-blue-400">Border-Free</span>
          </motion.h2>

          <motion.p
            custom={2}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={textVariants}
            className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
          >
            Transfer cryptocurrencies instantly to anyone, anywhere in the world. 
            No borders, no banks, just simple WhatsApp commands for global crypto transactions.
          </motion.p>

          {/* Features List */}
          <motion.div
            custom={3}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={textVariants}
            className="space-y-4 mb-8"
          >
            {[
              '🌐 Send to any phone number or wallet address',
              '⚡ Instant cross-border transactions',
              '💸 Low network fees with optimization',
              '🔒 Secure blockchain confirmations',
              '📊 Real-time transaction tracking',
              '💬 Simple chat commands'
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </motion.div>

          <motion.button
            custom={4}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={textVariants}
            onClick={() => {
              const message = encodeURIComponent(
                "Hi, I want to send crypto with BackPay!"
              );
              window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
            }}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Sending Crypto
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default TransferSection;