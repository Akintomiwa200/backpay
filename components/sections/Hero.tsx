'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const phoneRef = useRef(null);

  const isInView = useInView(sectionRef, { once: false, amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const phoneVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        delay: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // Online blockchain logos
  const blockchainLogos = [
    {
      name: 'Ethereum',
      url: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg'
    },
    {
      name: 'Polygon',
      url: 'https://cryptologos.cc/logos/polygon-matic-logo.svg'
    },
    {
      name: 'Binance',
      url: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg'
    },
    {
      name: 'Arbitrum',
      url: 'https://cryptologos.cc/logos/arbitrum-arb-logo.svg'
    }
  ];

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="relative bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 pt-20 pb-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 lg:pr-12">
            <motion.div
              ref={headingRef}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-5"
            >
              <motion.div variants={itemVariants} className="inline-block">
                <span className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wide">
                  Web3 Financial Assistant
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white"
              >
                Send crypto with just a{' '}
                <span className="text-blue-600 dark:text-blue-400">
                  WhatsApp message
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                BackPay brings Web3 financial transactions to WhatsApp. Send and receive cryptocurrencies, check balances, and manage your digital assets—all through simple chat commands.
              </motion.p>
            </motion.div>

            <motion.div
              ref={contentRef}
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4"
            >
              <Button
                size="lg"
                className="text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-8 py-3 text-lg"
                onClick={() => {
                  const message = encodeURIComponent(
                    "Hi, I'd like to get started with BackPay!"
                  );
                  window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
                }}
              >
                Start on WhatsApp
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Trusted by <span className="font-medium">5,000+</span> users across 50+ countries
              </p>
              <div className="flex space-x-6 mt-4">
                {blockchainLogos.map((chain) => (
                  <div
                    key={chain.name}
                    className="h-8 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                  >
                    <Image
                      src={chain.url}
                      alt={chain.name}
                      width={32}
                      height={32}
                      className="h-8 w-auto object-contain"
                      onError={(e) => {
                        // Fallback to colored placeholder if image fails to load
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content - WhatsApp Interface */}
          <motion.div
            ref={phoneRef}
            variants={phoneVariants}
            animate={isInView ? 'visible' : 'hidden'}
            className="relative lg:ml-auto flex justify-center lg:justify-end"
          >
            <motion.div
              className="relative w-80 h-[600px]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* WhatsApp Phone Frame */}
              <div className="absolute inset-0 bg-green-500 rounded-[3rem] shadow-2xl">
                <div className="absolute inset-2 bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden">
                  {/* WhatsApp Header */}
                  <div className="bg-green-500 text-white p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <span className="text-green-500 text-lg font-bold">B</span>
                      </div>
                      <div>
                        <div className="font-medium">BackPay</div>
                        <div className="text-xs text-green-100">
                          Online • Web3 Assistant
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="h-full bg-gray-50 dark:bg-gray-800 p-4 space-y-4 overflow-y-auto">
                    {/* Welcome Message */}
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex-shrink-0"></div>
                      <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          Welcome to BackPay! 🚀
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Send crypto to any phone number via WhatsApp
                        </p>
                      </div>
                    </div>

                    {/* User Message */}
                    <div className="flex justify-end">
                      <div className="bg-blue-500 text-white rounded-2xl rounded-br-none px-4 py-3 max-w-[80%]">
                        <p className="text-sm">Send 0.1 ETH to +1234567890</p>
                      </div>
                    </div>

                    {/* Bot Response */}
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex-shrink-0"></div>
                      <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          💸 Sending 0.1 ETH...
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Confirming transaction
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Transaction Success */}
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex-shrink-0"></div>
                      <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                        <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm font-medium">Transaction Confirmed!</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          0.1 ETH sent to +1234567890
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Tx: 0x7d9...f4a2
                        </p>
                      </div>
                    </div>

                    {/* Balance Check */}
                    <div className="flex justify-end">
                      <div className="bg-blue-500 text-white rounded-2xl rounded-br-none px-4 py-3 max-w-[80%]">
                        <p className="text-sm">Balance</p>
                      </div>
                    </div>

                    {/* Balance Response */}
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex-shrink-0"></div>
                      <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          💰 Your Balance:
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          1.245 ETH
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          ≈ $2,150.75 USD
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

              {/* Floating Crypto Elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.8, duration: 0.8 },
                }}
                className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">ETH</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      Ethereum
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      $2,150.75
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: 1, duration: 0.8 },
                }}
                className="absolute -bottom-2 -left-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-lg p-3 z-10"
              >
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Recent Transaction
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    +0.05 ETH
                  </div>
                  <div className="text-xs text-green-500 font-medium">
                    Received
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 right-0 h-full overflow-hidden -z-10 opacity-20 dark:opacity-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 1 },
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 1, delay: 0.3 },
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-green-400 rounded-full filter blur-3xl"
        ></motion.div>
      </div>
    </motion.section>
  );
}