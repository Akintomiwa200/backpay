"use client";

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

const WhatsAppSecuritySection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const featuresRef = useRef(null);
  const badgeRef = useRef(null);

  const headingInView = useInView(headingRef, { once: false, margin: "0px 0px -100px 0px" });
  const featuresInView = useInView(featuresRef, { once: false, margin: "0px 0px -100px 0px" });
  const badgeInView = useInView(badgeRef, { once: false, margin: "0px 0px -200px 0px" });

  // Animation variants
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={sectionRef} className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-12">
          {/* Main Heading */}
          <motion.div 
            ref={headingRef}
            initial="hidden"
            animate={headingInView ? "visible" : "hidden"}
            variants={headingVariants}
            className="space-y-4"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Web3 Security Meets WhatsApp Privacy
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your crypto transactions are protected by blockchain technology and WhatsApp's end-to-end encryption, 
              creating the most secure way to manage digital assets through messaging.
            </p>
          </motion.div>

          {/* Security Features Grid */}
          <motion.div 
            ref={featuresRef}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8 mt-16"
          >
            {/* Blockchain Encryption */}
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Blockchain Encryption</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Your private keys are encrypted locally and all transactions are secured on the blockchain with cryptographic proof.
              </p>
              <div className="mt-4 inline-flex items-center space-x-1 text-sm text-blue-600 dark:text-blue-400">
                <span>🔗</span>
                <span>Immutable transaction records</span>
              </div>
            </motion.div>

            {/* Local Key Storage */}
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Local Key Storage</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Private keys never leave your device. We don't store sensitive information - your crypto remains in your control.
              </p>
              <div className="mt-4 inline-flex items-center space-x-1 text-sm text-green-600 dark:text-green-400">
                <span>📱</span>
                <span>Device-only access</span>
              </div>
            </motion.div>

            {/* Smart Contract Security */}
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Smart Contract Audits</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                All smart contracts are professionally audited and transactions are verified on-chain before execution.
              </p>
              <div className="mt-4 inline-flex items-center space-x-1 text-sm text-purple-600 dark:text-purple-400">
                <span>🔍</span>
                <span>Verified code execution</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Additional Security Features */}
          <motion.div 
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8 mt-8"
          >
            {/* Multi-Signature Support */}
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">2/3</span>
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 dark:text-white">Multi-Signature Wallets</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Advanced security with multiple approval requirements</p>
                </div>
              </div>
            </motion.div>

            {/* Real-time Monitoring */}
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">🚨</span>
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 dark:text-white">Real-time Monitoring</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Instant alerts for suspicious activity</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* WhatsApp Logo and Trust Badge */}
          <motion.div 
            ref={badgeRef}
            initial="hidden"
            animate={badgeInView ? "visible" : "hidden"}
            variants={badgeVariants}
            className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-12 pt-12"
          >
            {/* WhatsApp Badge */}
            <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 px-8 py-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center shadow-md">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900 dark:text-white text-lg">Powered by WhatsApp</div>
                <div className="text-gray-600 dark:text-gray-300">End-to-end encrypted messaging</div>
                <div className="text-sm text-green-600 dark:text-green-400 mt-1">2+ billion trusted users</div>
              </div>
            </div>

            {/* Blockchain Badge */}
            <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 px-8 py-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">₿</span>
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900 dark:text-white text-lg">Secured by Blockchain</div>
                <div className="text-gray-600 dark:text-gray-300">Immutable transaction records</div>
                <div className="text-sm text-blue-600 dark:text-blue-400 mt-1">Cryptographic security</div>
              </div>
            </div>
          </motion.div>

          {/* Security Assurance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={badgeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5 }}
            className="pt-8"
          >
            <p className="text-gray-600 dark:text-gray-300 text-sm max-w-2xl mx-auto">
              BackPay combines the privacy of WhatsApp with the security of blockchain technology. 
              Your crypto transactions are protected by multiple layers of encryption and verification.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppSecuritySection;