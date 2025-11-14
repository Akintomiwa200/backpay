'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const blockchainFeatures = [
  {
    icon: '⚡',
    title: 'Instant Settlements',
    description: 'No more waiting for bank transfers. Crypto transactions settle in minutes, not days.'
  },
  {
    icon: '🌐',
    title: 'Borderless Payments',
    description: 'Send crypto to anyone, anywhere in the world without currency conversion fees.'
  },
  {
    icon: '🔒',
    title: 'Bank-Grade Security',
    description: 'Blockchain technology ensures tamper-proof transactions with cryptographic security.'
  },
  {
    icon: '💸',
    title: 'Low Fees',
    description: 'Avoid high international transfer fees with minimal blockchain transaction costs.'
  },
  {
    icon: '📊',
    title: 'Transparent Tracking',
    description: 'Every transaction is recorded on the blockchain for complete transparency.'
  },
  {
    icon: '🤖',
    title: 'Smart Contracts',
    description: 'Automated, trustless transactions with programmable conditions and rules.'
  }
];

export default function BlockchainSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powered by Blockchain Technology
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            BackPay leverages the power of Web3 to bring you secure, fast, and borderless 
            financial transactions through the platform you already use every day.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blockchainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Supported Chains */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-6">
            Supported Blockchain Networks
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['Ethereum', 'Polygon', 'Binance Smart Chain', 'Arbitrum', 'Optimism', 'Base'].map((chain) => (
              <div
                key={chain}
                className="flex items-center space-x-2 text-gray-500 dark:text-gray-400"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">{chain}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}