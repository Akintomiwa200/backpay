"use client";

import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, useInView, Variants } from 'framer-motion';

const faqs = [
  {
    question: "What is BackPay?",
    answer: "BackPay is a Web3 financial assistant that enables you to send, receive, and manage cryptocurrencies through simple WhatsApp commands. It brings blockchain transactions to your favorite messaging app."
  },
  {
    question: "How do I send crypto with BackPay?",
    answer: "Simply message BackPay on WhatsApp and use commands like 'send 0.1 ETH to +1234567890' or 'send 50 USDC to wallet-address'. The system will guide you through the secure transaction process."
  },
  {
    question: "Is BackPay secure for crypto transactions?",
    answer: "Yes, BackPay uses military-grade encryption for private keys, all transactions are recorded on the blockchain for transparency, and we never store your sensitive information on our servers. Your funds are secured by blockchain technology."
  },
  {
    question: "Which cryptocurrencies and blockchains does BackPay support?",
    answer: "BackPay supports Ethereum (ETH), Polygon (MATIC), Binance Smart Chain (BNB), Arbitrum (ARB), and popular stablecoins like USDC and USDT. We're constantly adding support for more chains and tokens."
  },
  {
    question: "How do gas fees work on BackPay?",
    answer: "BackPay automatically calculates and displays network fees before transactions. You can type 'gas prices' to see current network conditions and get suggestions for optimal transaction timing to save on fees."
  },
  {
    question: "What happens if I lose my phone or access to WhatsApp?",
    answer: "Your crypto remains secure on the blockchain. Contact BackPay support immediately, and we'll help you recover your wallet using your secure backup phrase (which you should store safely during setup)."
  },
  {
    question: "Can I use BackPay for international transactions?",
    answer: "Absolutely! BackPay enables borderless crypto transactions to anyone, anywhere in the world. Send crypto to phone numbers or wallet addresses globally with minimal fees compared to traditional banking."
  },
  {
    question: "How do I check my crypto balance?",
    answer: "Simply type 'balance' in your WhatsApp chat with BackPay to see your current holdings across all supported chains, with real-time USD equivalents."
  },
  {
    question: "Does BackPay support DeFi and smart contracts?",
    answer: "Yes, BackPay allows interaction with popular DeFi protocols through chat commands. You can swap tokens, provide liquidity, and interact with smart contracts directly from WhatsApp."
  },
  {
    question: "What if a transaction gets stuck or fails?",
    answer: "BackPay provides real-time transaction status and will notify you of any issues. If a transaction fails, you only pay the network fee. Our support can help troubleshoot any blockchain-related issues."
  }
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const faqItemsRef = useRef<HTMLDivElement>(null);

  // useInView hooks for animation triggers
  const isSectionInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const isHeadingInView = useInView(headingRef, { once: false, amount: 0.3 });
  const isFaqItemsInView = useInView(faqItemsRef, { once: false, amount: 0.1 });

  // Animation variants
  const headingVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const faqContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const faqItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.section 
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          animate={isHeadingInView ? "visible" : "hidden"}
          variants={headingVariants}
          className="text-center mb-16"
        >
          <h2 
            ref={headingRef}
            className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Crypto & Web3 FAQs
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get answers to common questions about using BackPay for cryptocurrency transactions through WhatsApp.
          </p>
        </motion.div>
        
        <motion.div 
          ref={faqItemsRef}
          initial="hidden"
          animate={isFaqItemsInView ? "visible" : "hidden"}
          variants={faqContainerVariants}
          className="space-y-4"
        >
          {faqs.map((faq, i) => (
            <motion.div 
              key={i} 
              variants={faqItemVariants}
              className={cn(
                "bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300",
                activeIndex === i 
                  ? "shadow-lg ring-2 ring-blue-500/20" 
                  : "shadow-md hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600"
              )}
            >
              <motion.button
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                onClick={() => toggleFaq(i)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start space-x-4 flex-1">
                  {/* Question Number with Crypto Theme */}
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                      {i + 1}
                    </span>
                  </div>
                  
                  <div className="flex-1 text-left">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {faq.question}
                    </span>
                  </div>
                </div>
                
                <motion.div
                  className="flex-shrink-0 w-6 h-6 text-gray-500 dark:text-gray-400"
                  animate={{ rotate: activeIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <svg 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </motion.div>
              </motion.button>
              
              <motion.div
                initial={false}
                animate={{
                  height: activeIndex === i ? "auto" : 0,
                  opacity: activeIndex === i ? 1 : 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="overflow-hidden"
              >
                <motion.div 
                  className="px-6 pb-6"
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                >
                  <div className="flex items-start space-x-4">
                    {/* Answer Icon */}
                    <div className="flex-shrink-0 w-6 h-6 mt-1 text-blue-500">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                  
                  {/* Example Command for Relevant FAQs */}
                  {(i === 1 || i === 7) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-4 ml-10 bg-gray-100 dark:bg-gray-700 rounded-lg p-3"
                    >
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Example command:
                      </p>
                      <code className="text-sm bg-white dark:bg-gray-800 px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-400 font-mono">
                        {i === 1 ? "send 0.1 ETH to +1234567890" : "balance"}
                      </code>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Help CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isFaqItemsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our crypto support team is available 24/7 on WhatsApp to help with any Web3 questions.
            </p>
            <button
              onClick={() => {
                const message = encodeURIComponent(
                  "Hi, I have a question about BackPay and crypto transactions!"
                );
                window.open(`https://wa.me/+2438154975351?text=${message}`, '_blank');
              }}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Ask on WhatsApp
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}