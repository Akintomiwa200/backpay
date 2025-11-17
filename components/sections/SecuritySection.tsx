'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

const SecuritySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  // Use Framer Motion's useInView hook for scroll-based animations
  const isInView = useInView(sectionRef, {
    once: false,
    margin: '-50% 0px -50% 0px',
  });

  // Animation variants with proper TypeScript typing
  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const phoneVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        delay: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const floatingPhoneVariants: Variants = {
    animate: {
      y: [0, 20, 0],
      transition: {
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
    static: {
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const iconsContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const iconVariants: Variants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.165, 0.84, 0.44, 1],
      },
    },
  };

  const floatingCardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, x: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        delay: 1,
        duration: 0.6,
      },
    },
  };

  const memoryIndicatorVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, x: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        delay: 1.2,
        duration: 0.6,
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            variants={contentVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wide">
                  Web3 Security
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
                Bank-Grade Security{' '}
                <br />
                on Blockchain
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                BackPay combines the convenience of WhatsApp with the security of blockchain technology. 
                Your private keys are encrypted, transactions are immutable, and your funds are always secure.
              </p>
            </div>

            {/* Security Features */}
            <div className="space-y-4">
              {[
                {
                  icon: '🔐',
                  title: 'Encrypted Private Keys',
                  description: 'Your wallet keys are securely encrypted and never leave your device'
                },
                {
                  icon: '🛡️',
                  title: 'Immutable Transactions',
                  description: 'Every transaction is permanently recorded on the blockchain'
                },
                {
                  icon: '🔍',
                  title: 'Transparent Tracking',
                  description: 'Monitor all transactions with real-time blockchain explorers'
                },
                {
                  icon: '⚡',
                  title: 'Instant Verification',
                  description: 'Smart contracts ensure instant transaction verification'
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  const message = encodeURIComponent(
                    "Hi, I'd like to get started with BackPay!"
                  );
                  window.open(`https://wa.me/+2438154975351?text=${message}`, '_blank');
                }}
                className="bg-blue-600 text-white dark:bg-blue-500 dark:hover:bg-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Start Securely
              </button>
              <button
                onClick={() => window.open('/security', '_blank')}
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Learn About Security
              </button>
            </div>
          </motion.div>

          {/* Right Content - WhatsApp Crypto Security Demo */}
          <motion.div
            ref={phoneRef}
            className="relative"
            variants={phoneVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.div
              className="relative mx-auto w-80 h-[600px]"
              variants={floatingPhoneVariants}
              animate={isInView ? 'animate' : 'static'}
            >
              {/* Phone Frame */}
              <div className="absolute inset-0 bg-green-500 rounded-[3rem] shadow-2xl transform transition duration-500 hover:scale-105">
                <div className="absolute inset-2 bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden">
                  {/* Screen Content */}
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
                            Online • Web3 Secure
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="px-4 py-4 space-y-4 flex-1">
                      {/* Welcome Security Message */}
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          B
                        </div>
                        <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                          <p className="text-sm text-gray-800 dark:text-gray-200">
                            🔒 Your wallet is now secured with military-grade encryption
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Private keys encrypted locally
                          </p>
                        </div>
                      </div>

                      {/* User Balance Check */}
                      <div className="flex justify-end">
                        <div className="bg-blue-500 rounded-2xl rounded-br-none px-4 py-3 max-w-xs">
                          <p className="text-sm">balance</p>
                        </div>
                      </div>

                      {/* Balance Response */}
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          B
                        </div>
                        <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                          <p className="text-sm text-gray-800 dark:text-gray-200">
                            💰 Your Balance:
                          </p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            1.245 ETH
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            ≈ $2,150.75 USD
                          </p>
                          <div className="flex items-center space-x-1 mt-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-green-600 dark:text-green-400">
                              Wallet Secured
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Security Notification */}
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          B
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                          <p className="text-sm text-yellow-800 dark:text-yellow-200">
                            ⚠️ Security Tip
                          </p>
                          <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                            Never share your recovery phrase. BackPay will never ask for it.
                          </p>
                        </div>
                      </div>

                      {/* Transaction Security */}
                      <div className="flex justify-end">
                        <div className="bg-blue-500 rounded-2xl rounded-br-none px-4 py-3 max-w-xs">
                          <p className="text-sm">send 0.1 ETH to +1234567890</p>
                        </div>
                      </div>

                      {/* Transaction Security Check */}
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          B
                        </div>
                        <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                          <p className="text-sm text-gray-800 dark:text-gray-200">
                            🔍 Verifying transaction security...
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Checking recipient address
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Transaction Confirmed */}
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          B
                        </div>
                        <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                          <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium">Transaction Secured!</span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            0.1 ETH sent to +1234567890
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Tx: 0x7d9...f4a2 • 12 confirmations
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

              {/* Floating Security Badge */}
              <motion.div
                className="absolute -top-4 -right-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-100 dark:border-gray-700"
                variants={floatingCardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🔒</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      Wallet Secured
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Encrypted & Local
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Blockchain Confirmation */}
              <motion.div
                className="absolute -left-8 top-20 bg-white dark:bg-gray-800 rounded-2xl shadow-xl px-4 py-3 text-center"
                variants={memoryIndicatorVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Block Confirmations
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  12
                </div>
                <div className="w-12 h-1 bg-green-400 rounded-full mx-auto mt-2"></div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default SecuritySection;