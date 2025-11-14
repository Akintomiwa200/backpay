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
      className="relative bg-[#eef3fc] py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Phone and Support Chat */}
        <div className="relative flex items-center justify-center w-full md:w-auto">
          {/* Floating Support Agent Bubble */}
          <motion.div
            ref={supportAgentRef}
            className="absolute -top-10 left-0 translate-x-1/2 z-20 flex items-center space-x-4 bg-white rounded-full shadow-lg px-8 py-6 min-w-[280px]"
            variants={supportAgentVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.span
              className="inline-block"
              variants={floatingAnimation}
              animate="animate"
            >
              {/* Simple bot avatar */}
              <svg
                width="40"
                height="40"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="16" cy="16" r="16" fill="#2563EB" />
                <ellipse cx="16" cy="20" rx="8" ry="5" fill="#fff" />
                <circle cx="12" cy="15" r="2" fill="#fff" />
                <circle cx="20" cy="15" r="2" fill="#fff" />
                <ellipse cx="16" cy="22" rx="3" ry="1.5" fill="#2563EB" />
              </svg>
            </motion.span>
            <div>
              <div className="font-semibold text-gray-900 text-base">
                Laskad Support
              </div>
              <div className="text-sm text-gray-500">
                Hey 👋, How can I help
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
            <div className="absolute inset-0 bg-black rounded-[3rem] shadow-2xl">
              <div className="absolute inset-2 bg-black rounded-[2.5rem] overflow-hidden">
                <div className="h-full w-full bg-black flex flex-col justify-end p-6 relative">
                  {/* Status Bar */}
                  <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 pt-4 text-sm text-white">
                    <span>4:13</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-2 bg-white rounded-sm"></div>
                      <div className="w-6 h-2 bg-white rounded-sm"></div>
                      <div className="w-6 h-3 border border-white rounded-sm">
                        <div className="w-4 h-2 bg-white rounded-sm ml-0.5 mt-0.5"></div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Bubbles */}
                  <motion.div
                    ref={chatBubblesRef}
                    className="flex flex-col space-y-2 mt-16"
                    variants={chatBubblesContainerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                  >
                    <motion.div
                      className="self-end bg-primary-600 text-white px-4 py-2 rounded-2xl text-sm w-fit"
                      variants={chatBubbleVariants}
                    >
                      I have an issue
                    </motion.div>

                    <motion.div
                      className="self-end bg-primary-600 text-white px-4 py-2 rounded-2xl text-sm w-fit"
                      variants={chatBubbleVariants}
                    >
                      My transaction failed
                    </motion.div>

                    <motion.div
                      className="self-start bg-gray-800 text-white px-4 py-2 rounded-2xl text-sm w-fit max-w-[220px]"
                      variants={chatBubbleVariants}
                    >
                      I&apos;m sorry to hear that your transaction failed. Could
                      you please provide the transaction reference number or a
                      receipt for the failed transaction?
                    </motion.div>

                    {/* Receipt Card */}
                    <motion.div
                      className="self-end"
                      variants={chatBubbleVariants}
                    >
                      <div className="bg-white rounded-xl shadow p-3 w-48">
                        <div className="text-xs text-gray-500 mb-1">
                          ₦1,000.00
                        </div>
                        <div className="text-xs text-gray-500">
                          On 6/13/2023
                        </div>
                        <div className="text-xs text-gray-700 mt-2">
                          Recipient:{' '}
                          <span className="font-semibold">John Doe</span>
                        </div>
                        <div className="text-xs text-gray-700">
                          Account:{' '}
                          <span className="font-semibold">1234567890</span>
                        </div>
                        <div className="text-xs text-gray-700">
                          Reference:{' '}
                          <span className="font-semibold">876543210</span>
                        </div>
                        <div className="text-xs text-green-600 font-semibold mt-2">
                          Complete
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="self-start bg-gray-800 text-white px-4 py-2 rounded-2xl text-sm w-fit max-w-[220px]"
                      variants={chatBubbleVariants}
                    >
                      Thank you for providing the details. We will investigate
                      the failed transaction.
                    </motion.div>
                  </motion.div>
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
                className="absolute -left-10 bottom-10 bg-primary-600 text-white px-4 py-2 rounded-full shadow-lg rotate-[-20deg] text-xs font-semibold"
                variants={decorativeShapeVariants}
                whileHover={{
                  scale: 1.1,
                  rotate: -15,
                  transition: { duration: 0.2 },
                }}
              >
                Transfer
              </motion.div>

              <motion.div
                className="absolute left-1/2 bottom-0 -translate-x-1/2 bg-gradient-to-tr from-pink-500 via-purple-500 to-primary-500 w-20 h-20 rounded-3xl blur-xl opacity-80"
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
            className="uppercase text-primary-600 font-semibold tracking-wider text-sm mb-2 block"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Self Support
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-primary-600 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Get Help
            <br />
            <span className="text-primary-600">Without the Wait</span>
          </motion.h2>

          <motion.p
            className="text-lg text-primary-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            No call centers, no hold music. Laskad answers your questions
            instantly with smart, in-app support.
          </motion.p>

          <motion.button
            onClick={() => {
              const message = encodeURIComponent(
                "Hi, I'd like to get started with Laskad!"
              );
              window.open(`https://wa.me/2349065577709?text=Hi`, '_blank');
            }}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-primary-600 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1 },
            }}
          >
            Try It Out
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SupportSection;
