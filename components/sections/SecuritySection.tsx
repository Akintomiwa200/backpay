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
        ease: [0.25, 0.46, 0.45, 0.94], // power3.out equivalent
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
        ease: [0.25, 0.46, 0.45, 0.94], // power3.out equivalent
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
        ease: [0.165, 0.84, 0.44, 1], // power2.out equivalent
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
      className="bg-gradient-to-br from-gray-50 via-primary-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 overflow-hidden"
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
            {/* Existing content */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wide">
                  Smart Banking
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
                Banking Made <br />
                Simple Through WhatsApp
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Laskad transforms your WhatsApp into a powerful financial
                assistant that helps you manage money, make payments, and track
                expenses — all through natural conversation.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  const message = encodeURIComponent(
                    "Hi, I'd like to get started with Laskad!"
                  );
                  window.open(`https://wa.me/2349065577709?text=Hi`, '_blank');
                }}
                className="bg-primary-600 text-white dark:bg-white dark:text-black px-8 py-4 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Floating Context Icons */}
            <motion.div
              ref={iconsRef}
              className="hidden lg:block absolute -right-24 top-1/4 space-y-6"
              variants={iconsContainerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {[
                {
                  color: 'bg-primary-500',
                  icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
                },
                {
                  color: 'bg-green-500',
                  icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
                },
                { color: 'bg-yellow-500', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                {
                  color: 'bg-purple-500',
                  icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
                },
                {
                  color: 'bg-red-500',
                  icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`w-16 h-16 ${item.color} rounded-3xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform`}
                  variants={iconVariants}
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={item.icon}
                    />
                  </svg>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Phone Mockup */}
          <motion.div
            ref={phoneRef}
            className="relative"
            variants={phoneVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Existing phone mockup content */}
            <motion.div
              className="relative mx-auto w-80 h-[600px]"
              variants={floatingPhoneVariants}
              animate={isInView ? 'animate' : 'static'}
            >
              {/* Phone Frame */}
              <div className="absolute inset-0 bg-black rounded-[3rem] shadow-2xl transform transition duration-500 hover:scale-105">
                <div className="absolute inset-2 bg-black rounded-[2.5rem] overflow-hidden">
                  {/* Screen Content */}
                  <div className="h-full bg-gradient-to-b from-gray-900 to-black text-white relative">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center px-6 pt-4 text-sm">
                      <span>12:47</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-2 bg-white rounded-sm"></div>
                        <div className="w-6 h-2 bg-white rounded-sm"></div>
                        <div className="w-6 h-3 border border-white rounded-sm">
                          <div className="w-4 h-2 bg-white rounded-sm ml-0.5 mt-0.5"></div>
                        </div>
                      </div>
                    </div>

                    {/* Chat Header */}
                    <div className="flex items-center px-6 py-4 border-b border-gray-700">
                      <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-xs font-bold">
                        L
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-sm">Laskad</div>
                      </div>
                      <div className="ml-auto flex items-center space-x-4">
                        <svg
                          className="w-5 h-5 text-primary-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <svg
                          className="w-5 h-5 text-primary-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="px-6 py-4 space-y-4 flex-1">
                      {/* User Message */}
                      <div className="flex justify-end">
                        <div className="bg-green-600 rounded-2xl px-4 py-3 max-w-xs">
                          <p className="text-sm">Send 2k to my GTB</p>
                          <p className="text-xs text-green-200 mt-1">
                            12:47 PM
                          </p>
                        </div>
                      </div>

                      {/* Laskad Response */}
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                          L
                        </div>
                        <div className="bg-gray-800 rounded-2xl px-4 py-3 max-w-xs">
                          <p className="text-sm">
                            Please enter the recipient's account number for your
                            GTB.
                          </p>
                          <p className="text-xs text-gray-400 mt-1">12:47 PM</p>
                        </div>
                      </div>

                      {/* User Response */}
                      <div className="flex justify-end">
                        <div className="bg-green-600 rounded-2xl px-4 py-3 max-w-xs">
                          <p className="text-sm">
                            The last GTBank I sent money to
                          </p>
                          <p className="text-xs text-green-200 mt-1">
                            12:47 PM
                          </p>
                        </div>
                      </div>

                      {/* Laskad Smart Response */}
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                          L
                        </div>
                        <div className="bg-gray-800 rounded-2xl px-4 py-3 max-w-xs">
                          <p className="text-sm">
                            Do you mean account number 0240256606?
                          </p>
                          <p className="text-xs text-gray-400 mt-1">12:47 PM</p>
                        </div>
                      </div>

                      {/* User Confirmation */}
                      <div className="flex justify-end">
                        <div className="bg-green-600 rounded-2xl px-4 py-3 max-w-xs">
                          <p className="text-sm">What's the name</p>
                          <p className="text-xs text-green-200 mt-1">
                            12:47 PM
                          </p>
                        </div>
                      </div>

                      {/* Account Name */}
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                          L
                        </div>
                        <div className="bg-gray-800 rounded-2xl px-4 py-3 max-w-xs">
                          <p className="text-sm">
                            The name associated with account number 0240256606
                            is:
                          </p>
                          <p className="text-sm font-medium text-white mt-1">
                            SULAIMAN ABDULSEMU ADEWALE
                          </p>
                          <p className="text-xs text-gray-400 mt-1">12:47 PM</p>
                        </div>
                      </div>

                      {/* Final Confirmation */}
                      <div className="flex justify-end">
                        <div className="bg-green-600 rounded-2xl px-4 py-3 max-w-xs">
                          <p className="text-sm">Yes</p>
                          <p className="text-xs text-green-200 mt-1">
                            12:47 PM
                          </p>
                        </div>
                      </div>

                      {/* Transfer Confirmation */}
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                          L
                        </div>
                        <div className="bg-gray-800 rounded-2xl px-4 py-3 max-w-xs">
                          <p className="text-sm">
                            Are you sure you want to transfer ₦2,000.00 to
                            SULAIMAN ABDULSEMU ADEWALE (0240256606) at Guaranty
                            Trust Bank?
                          </p>
                          <p className="text-xs text-gray-400 mt-1">12:47 PM</p>
                        </div>
                      </div>

                      {/* User Final Yes */}
                      <div className="flex justify-end">
                        <div className="bg-green-600 rounded-2xl px-4 py-3 max-w-xs">
                          <p className="text-sm">Yes</p>
                          <p className="text-xs text-green-200 mt-1">
                            12:47 PM
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Input Area */}
                    <div className="px-6 pb-6">
                      <div className="flex items-center space-x-2 bg-gray-800 rounded-full px-4 py-2">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        <input
                          type="text"
                          placeholder="Type a message..."
                          className="flex-1 bg-transparent text-white placeholder-gray-400 text-sm outline-none"
                        />
                        <svg
                          className="w-5 h-5 text-primary-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Account Card */}
              <motion.div
                className="absolute -top-4 -right-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-100 dark:border-gray-700"
                variants={floatingCardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">GT</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      GTBank
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      0001234567
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Memory Indicator */}
              <motion.div
                className="absolute -left-8 top-20 bg-white dark:bg-gray-800 rounded-2xl shadow-xl px-4 py-3 text-center"
                variants={memoryIndicatorVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Last Transfer
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  ₦2,000
                </div>
                <div className="w-12 h-1 bg-primary-400 rounded-full mx-auto mt-2"></div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default SecuritySection;
