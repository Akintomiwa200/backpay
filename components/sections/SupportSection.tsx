'use client';

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

const SupportSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const chatBubblesRef = useRef<HTMLDivElement>(null);
  const supportAgentRef = useRef<HTMLDivElement>(null);
  const decorativeShapesRef = useRef<HTMLDivElement>(null);

  // Use Framer Motion's useInView hook
  const isInView = useInView(sectionRef, {
    once: false,
    margin: '-20% 0px -20% 0px',
  });

  // Animation variants with proper TypeScript typing
  const contentVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
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
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const supportAgentVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const chatBubblesContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const chatBubbleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const decorativeShapesContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      },
    },
  };

  const decorativeShapeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const floatingAnimation: Variants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Phone and Support Chat */}
        <div className="relative flex items-center justify-center w-full md:w-auto">
          {/* Floating Support Agent Bubble */}
          <motion.div
            ref={supportAgentRef}
            className="absolute -top-10 left-0 translate-x-1/2 z-20 flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-full shadow-lg px-8 py-6 min-w-[280px] border border-gray-200 dark:border-gray-700"
            variants={supportAgentVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.span
              className="inline-block"
              variants={floatingAnimation}
              animate="animate"
            >
              {/* BackPay bot avatar */}
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">B</span>
              </div>
            </motion.span>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white text-base">
                BackPay Support
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Need help with crypto? 👋
              </div>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            ref={phoneRef}
            className="relative w-80 h-[600px]"
            variants={phoneVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className="absolute inset-0 bg-green-500 rounded-[3rem] shadow-2xl">
              <div className="absolute inset-2 bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden">
                <div className="h-full w-full bg-gray-50 dark:bg-gray-800 flex flex-col justify-end p-6 relative">
                  {/* WhatsApp Header */}
                  <div className="absolute top-0 left-0 w-full bg-green-500 text-white p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-green-500 text-xs font-bold">B</span>
                      </div>
                      <div>
                        <div className="font-medium text-sm">BackPay</div>
                        <div className="text-xs text-green-100">
                          Online • Web3 Support
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Bubbles */}
                  <motion.div
                    ref={chatBubblesRef}
                    className="flex flex-col space-y-4 mt-16"
                    variants={chatBubblesContainerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                  >
                    {/* User Messages */}
                    <motion.div
                      className="self-end bg-blue-500 text-white px-4 py-3 rounded-2xl rounded-br-none text-sm max-w-xs"
                      variants={chatBubbleVariants}
                    >
                      My ETH transaction is pending for hours
                    </motion.div>

                    <motion.div
                      className="self-end bg-blue-500 text-white px-4 py-3 rounded-2xl rounded-br-none text-sm max-w-xs"
                      variants={chatBubbleVariants}
                    >
                      Can you check the status?
                    </motion.div>

                    {/* Support Responses */}
                    <motion.div
                      className="self-start bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-2xl rounded-tl-none text-sm max-w-xs"
                      variants={chatBubbleVariants}
                    >
                      I can help check your transaction status. Could you share the transaction hash?
                    </motion.div>

                    {/* Transaction Hash Card */}
                    <motion.div
                      className="self-end"
                      variants={chatBubbleVariants}
                    >
                      <div className="bg-blue-50 dark:bg-gray-700 rounded-xl p-3 max-w-xs border border-blue-200 dark:border-gray-600">
                        <div className="text-xs text-blue-600 dark:text-blue-400 font-mono mb-1">
                          0x7d9e8a2b4c6f1a3d8b5e9f2c7a4b6d8e1f3a5c7
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                          <span>0.1 ETH</span>
                          <span>2 hours ago</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Support Response with Status */}
                    <motion.div
                      className="self-start bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-2xl rounded-tl-none text-sm max-w-xs"
                      variants={chatBubbleVariants}
                    >
                      ✅ Transaction found! It's pending due to network congestion. 
                      <div className="mt-2 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-yellow-600 dark:text-yellow-400">
                          Estimated: 15-30 min
                        </span>
                      </div>
                    </motion.div>

                    {/* Gas Suggestion */}
                    <motion.div
                      className="self-start bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-2xl rounded-tl-none text-sm max-w-xs"
                      variants={chatBubbleVariants}
                    >
                      💡 Pro tip: Use higher gas fees during peak times for faster confirmations.
                    </motion.div>

                    {/* User Thanks */}
                    <motion.div
                      className="self-end bg-blue-500 text-white px-4 py-3 rounded-2xl rounded-br-none text-sm max-w-xs"
                      variants={chatBubbleVariants}
                    >
                      Thanks! How do I check gas prices?
                    </motion.div>

                    {/* Helpful Response */}
                    <motion.div
                      className="self-start bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-2xl rounded-tl-none text-sm max-w-xs"
                      variants={chatBubbleVariants}
                    >
                      Type "gas prices" to see current network fees, or "help" for more commands! 🚀
                    </motion.div>
                  </motion.div>

                  {/* Input Area */}
                  <div className="mt-4 flex items-center space-x-2 bg-white dark:bg-gray-900 rounded-full px-4 py-2 border border-gray-200 dark:border-gray-700">
                    <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-500 text-sm outline-none"
                    />
                    <button className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative shapes */}
            <motion.div
              ref={decorativeShapesRef}
              variants={decorativeShapesContainerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <motion.div
                className="absolute -left-10 bottom-10 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg rotate-[-20deg] text-xs font-semibold"
                variants={decorativeShapeVariants}
                whileHover={{
                  scale: 1.1,
                  rotate: -15,
                  transition: { duration: 0.2 },
                }}
              >
                Gas Help
              </motion.div>

              <motion.div
                className="absolute left-1/2 bottom-0 -translate-x-1/2 bg-gradient-to-tr from-blue-500 via-purple-500 to-green-500 w-20 h-20 rounded-3xl blur-xl opacity-80"
                variants={decorativeShapeVariants}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 0.6, 0.8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Text Content */}
        <motion.div
          ref={contentRef}
          className="flex-1 max-w-xl text-center md:text-left"
          variants={contentVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.span
            className="uppercase text-blue-600 font-semibold tracking-wider text-sm mb-2 block"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Crypto Support
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Web3 Support
            <br />
            <span className="text-blue-600 dark:text-blue-400">in Your Pocket</span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Get instant help with crypto transactions, gas fees, and blockchain questions. 
            BackPay's AI support understands Web3 terminology and provides real-time assistance.
          </motion.p>

          {/* Support Features */}
          <motion.div
            className="space-y-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {[
              '✅ Real-time transaction status checks',
              '🚀 Gas fee optimization tips',
              '🔍 Blockchain explorer integration',
              '💬 Web3 terminology support',
              '🌐 Multi-chain assistance',
              '⚡ Instant response 24/7'
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </motion.div>

          <motion.button
            onClick={() => {
              const message = encodeURIComponent(
                "Hi, I need help with a crypto transaction!"
              );
              window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
            }}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1 },
            }}
          >
            Get Crypto Help
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SupportSection;