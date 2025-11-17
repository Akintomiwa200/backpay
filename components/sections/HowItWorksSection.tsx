'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    step: 1,
    title: 'Start Chatting',
    description: 'Open WhatsApp and message BackPay to begin',
    icon: '💬',
    color: 'from-green-500 to-green-600'
  },
  {
    step: 2,
    title: 'Create Wallet',
    description: 'Set up your secure crypto wallet in seconds through chat',
    icon: '👛',
    color: 'from-blue-500 to-blue-600'
  },
  {
    step: 3,
    title: 'Send Crypto',
    description: 'Type "send 0.1 ETH to +1234567890" to transfer instantly',
    icon: '🚀',
    color: 'from-purple-500 to-purple-600'
  },
  {
    step: 4,
    title: 'Track Transactions',
    description: 'Get real-time updates and blockchain confirmations',
    icon: '📊',
    color: 'from-orange-500 to-orange-600'
  }
];

export default function HowItWorksSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How BackPay Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Start sending crypto through WhatsApp in under 2 minutes. No apps to download, 
            no complicated setups—just simple chat commands.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 via-blue-500 via-purple-500 to-orange-500 transform -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center group"
              >
                <div className="relative">
                  <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${step.color} shadow-lg group-hover:scale-110 transition-transform duration-300 flex items-center justify-center text-white text-2xl mb-4 relative z-10`}>
                    {step.icon}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
                
                <div className="flex justify-center mb-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-semibold">
                    {step.step}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Example Chat Commands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Try These Commands in WhatsApp
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              '💸 "send 0.1 ETH to +2438154975351"',
              '💰 "balance"',
              '👤 "create wallet"',
              '📊 "transaction history"',
              '🌍 "supported networks"',
              '🆘 "help"'
            ].map((command, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400 transition-colors duration-200"
              >
                <code className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                  {command}
                </code>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}