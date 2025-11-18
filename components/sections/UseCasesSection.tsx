'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useInView, Variants } from 'framer-motion';

const useCases = [
  {
    badge: { icon: '🚀', amount: '0.1 ETH', recipient: 'Dev Team' },
    image: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&w=600',
    chainIcon: 'ETH',
    title: 'Paying Remote Developers',
    desc: 'Send crypto payments to your global team instantly, no borders or bank delays.',
    chainColor: 'bg-purple-500'
  },
  {
    badge: { icon: '🛒', amount: '0.05 ETH', recipient: 'NFT Artist' },
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&w=600',
    chainIcon: 'MATIC',
    title: 'Buying Digital Art & NFTs',
    desc: 'Purchase NFTs and digital collectibles directly through chat commands.',
    chainColor: 'bg-blue-600'
  },
  {
    badge: { icon: '🌍', amount: '0.2 ETH', recipient: 'Family Abroad' },
    image: 'https://images.pexels.com/photos/2255801/pexels-photo-2255801.jpeg?auto=compress&w=600',
    chainIcon: 'ETH',
    title: 'Sending Money Overseas',
    desc: 'Transfer crypto to family anywhere in the world with minimal fees.',
    chainColor: 'bg-purple-500'
  },
  {
    badge: { icon: '⚡', amount: '50 USDC', recipient: 'DeFi Protocol' },
    image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&w=600',
    chainIcon: 'ARB',
    title: 'DeFi Transactions',
    desc: 'Interact with DeFi protocols and smart contracts through simple messages.',
    chainColor: 'bg-red-500'
  },
  {
    badge: { icon: '🎮', amount: '0.01 ETH', recipient: 'Game Developer' },
    image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&w=600',
    chainIcon: 'ETH',
    title: 'GameFi & Play-to-Earn',
    desc: 'Make in-game purchases and receive gaming rewards in cryptocurrency.',
    chainColor: 'bg-purple-500'
  },
  {
    badge: { icon: '💼', amount: '1.5 ETH', recipient: 'Business Partner' },
    image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&w=600',
    chainIcon: 'ETH',
    title: 'Business Investments',
    desc: 'Send large investments and business payments securely on the blockchain.',
    chainColor: 'bg-purple-500'
  },
  {
    badge: { icon: '🎓', amount: '0.08 ETH', recipient: 'Online Course' },
    image: 'https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&w=600',
    chainIcon: 'BNB',
    title: 'Educational Payments',
    desc: 'Pay for courses, workshops, and educational content with crypto.',
    chainColor: 'bg-yellow-500'
  },
  {
    badge: { icon: '🔄', amount: '500 USDT', recipient: 'Exchange' },
    image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&w=600',
    chainIcon: 'ETH',
    title: 'Crypto Trading',
    desc: 'Execute trades and manage your crypto portfolio through chat commands.',
    chainColor: 'bg-purple-500'
  }
];

const UseCasesSection = () => {
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const headingVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-gray-900 to-blue-900 py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headingVariants}
          className="text-center mb-16"
        >
          <div className="uppercase text-blue-400 text-sm tracking-widest mb-2 font-semibold">
            Powered by Blockchain Technology
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Real-World Crypto Use Cases
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how BackPay is revolutionizing everyday transactions with Web3 technology through WhatsApp.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {useCases.map((uc, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative rounded-3xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Badge - positioned absolutely at top */}
              <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-gray-900/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg border border-gray-600">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {uc.badge.icon}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-xs text-white">
                    Sent {uc.badge.amount}
                  </div>
                  <div className="text-[10px] text-gray-400">
                    to {uc.badge.recipient}
                  </div>
                </div>
              </div>

              {/* Chain Badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className={`w-8 h-8 ${uc.chainColor} rounded-full flex items-center justify-center shadow-lg`}>
                  <span className="text-white text-xs font-bold">
                    {uc.chainIcon}
                  </span>
                </div>
              </div>

              {/* Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={uc.image}
                  alt={uc.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
              </div>

              {/* Content - positioned below image */}
              <div className="p-6">
                {/* Title & Description */}
                <div className="space-y-3">
                  <h3 className="font-bold text-white text-lg leading-tight">
                    {uc.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {uc.desc}
                  </p>
                </div>

                {/* Transaction Details */}
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Network</span>
                    <span className="text-blue-400 font-medium">{uc.chainIcon}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span className="text-gray-400">Type</span>
                    <span className="text-green-400 font-medium">Completed</span>
                  </div>
                </div>
              </div>

              {/* Hover Effect Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headingVariants}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Crypto Experience?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of users who are already managing their crypto portfolio through WhatsApp with BackPay.
            </p>
            <button
              onClick={() => {
                const message = encodeURIComponent(
                  "Hi, I want to start using BackPay for crypto transactions!"
                );
                window.open(`https://wa.me/+2438154975351?text=${message}`, '_blank');
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-base hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Start Crypto Journey
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCasesSection;