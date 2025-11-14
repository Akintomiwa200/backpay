'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const blockchainPartners = [
  {
    name: 'Ethereum',
    logo: '/images/chains/ethereum.svg',
    type: 'Blockchain'
  },
  {
    name: 'Polygon',
    logo: '/images/chains/polygon.svg',
    type: 'Layer 2'
  },
  {
    name: 'Binance Smart Chain',
    logo: '/images/chains/binance.svg',
    type: 'Blockchain'
  },
  {
    name: 'Arbitrum',
    logo: '/images/chains/arbitrum.svg',
    type: 'Layer 2'
  },
  {
    name: 'Optimism',
    logo: '/images/chains/optimism.svg',
    type: 'Layer 2'
  },
  {
    name: 'Base',
    logo: '/images/chains/base.svg',
    type: 'Layer 2'
  },
  {
    name: 'Avalanche',
    logo: '/images/chains/avalanche.svg',
    type: 'Blockchain'
  },
  {
    name: 'Solana',
    logo: '/images/chains/solana.svg',
    type: 'Blockchain'
  }
];

const PartnersBanner = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: false, amount: 0.3 });

  return (
    <motion.section 
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="py-16 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Powered by Leading Blockchain Networks
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            BackPay supports multiple blockchain networks, giving you access to the entire Web3 ecosystem through WhatsApp
          </p>
        </motion.div>
                
        <div className="relative overflow-hidden">
          <motion.div 
            className="flex space-x-8"
            animate={{
              x: [0, '-50%']
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop" as const,
                duration: 30,
                ease: "linear"
              }
            }}
          >
            {/* First set of logos */}
            {blockchainPartners.map((partner, index) => (
              <motion.div
                key={`partner-1-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ 
                  scale: 1.1,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="flex-shrink-0 bg-white dark:bg-gray-800 rounded-2xl p-6 w-40 h-40 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                    {partner.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                    {partner.type}
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Duplicate set of logos for seamless loop */}
            {blockchainPartners.map((partner, index) => (
              <motion.div
                key={`partner-2-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ 
                  scale: 1.1,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ 
                  delay: (index + blockchainPartners.length) * 0.1,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="flex-shrink-0 bg-white dark:bg-gray-800 rounded-2xl p-6 w-40 h-40 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                    {partner.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                    {partner.type}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900 dark:to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900 dark:to-transparent z-10" />
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
        >
          {[
            { number: '8+', label: 'Blockchain Networks' },
            { number: '50+', label: 'Supported Tokens' },
            { number: '10K+', label: 'Daily Transactions' },
            { number: '$15M+', label: 'Total Volume' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Ready to explore the multi-chain ecosystem?
          </p>
          <motion.button
            onClick={() => {
              const message = encodeURIComponent(
                "Hi, I want to learn more about BackPay's multi-chain support!"
              );
              window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Start Multi-Chain Journey
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PartnersBanner;