"use client"

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

const features = [
  {
    title: "Borderless Crypto Transfers",
    description: "Send cryptocurrencies to anyone, anywhere in the world with just a few WhatsApp messages. No borders, no banks, just blockchain.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    color: "bg-blue-500",
    command: "send 0.1 ETH to +1234567890"
  },
  {
    title: "Multi-Chain Wallet Management",
    description: "Manage your crypto portfolio across Ethereum, Polygon, BSC, and more from a single WhatsApp chat interface.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    color: "bg-purple-500",
    command: "balance"
  },
  {
    title: "Real-Time Portfolio Tracking",
    description: "Monitor your crypto holdings with live price updates and portfolio performance directly through chat commands.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "bg-green-500",
    command: "portfolio"
  },
  {
    title: "Gas Fee Optimization",
    description: "Get smart suggestions for optimal transaction timing to save on network fees across different blockchains.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "bg-orange-500",
    command: "gas prices"
  },
  {
    title: "DeFi Protocol Integration",
    description: "Interact with popular DeFi protocols, swap tokens, and provide liquidity through simple chat commands.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: "bg-red-500",
    command: "swap ETH for USDC"
  },
  {
    title: "NFT Management & Trading",
    description: "View your NFT collection, check floor prices, and make offers on digital collectibles directly through WhatsApp.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: "bg-teal-500",
    command: "my nfts"
  },
  {
    title: "Cross-Chain Bridges",
    description: "Move assets between different blockchain networks seamlessly with our integrated cross-chain bridge functionality.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    color: "bg-indigo-500",
    command: "bridge ETH to polygon"
  },
  {
    title: "Smart Contract Interactions",
    description: "Execute complex smart contract functions and interact with dApps through natural language commands.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: "bg-pink-500",
    command: "stake ETH"
  }
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // useInView hooks for animation triggers
  const isSectionInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const isHeadingInView = useInView(headingRef, { once: false, amount: 0.3 });
  const isFeaturesInView = useInView(featuresRef, { once: false, amount: 0.1 });
  const isButtonInView = useInView(buttonRef, { once: false, amount: 0.3 });

  // Animation variants
  const headingVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const featuresContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };

  const featureItemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={headingRef}
          initial="hidden"
          animate={isHeadingInView ? "visible" : "hidden"}
          variants={headingVariants}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Complete Web3 Power in Your Pocket
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            BackPay brings the full power of Web3 to WhatsApp. Manage your crypto portfolio, 
            execute trades, and interact with blockchain networks through simple chat commands.
          </p>
        </motion.div>

        <motion.div 
          ref={featuresRef}
          initial="hidden"
          animate={isFeaturesInView ? "visible" : "hidden"}
          variants={featuresContainerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div 
              key={i} 
              variants={featureItemVariants}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
            >
              <motion.div 
                className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4", feature.color)}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
              >
                {feature.icon}
              </motion.div>
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Command Example */}
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Try this command:</p>
                <code className="text-xs bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-1 rounded font-mono border border-gray-200 dark:border-gray-600">
                  {feature.command}
                </code>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          ref={buttonRef}
          initial="hidden"
          animate={isButtonInView ? "visible" : "hidden"}
          variants={buttonVariants}
          className="mt-16 text-center"
        >
          <motion.button 
            onClick={() => {
              const message = encodeURIComponent(
                "Hi, I want to explore all BackPay crypto features!"
              );
              window.open(`https://wa.me/+2438154975351?text=${message}`, '_blank');
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 inline-flex items-center shadow-lg"
          >
            Explore All Crypto Features
            <motion.svg 
              className="w-5 h-5 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              whileHover={{
                x: 5,
                transition: { duration: 0.2 }
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </motion.svg>
          </motion.button>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
            All features accessible through simple WhatsApp commands
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}