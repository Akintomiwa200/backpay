'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const TransferSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });

  // Animation variants
  const bankIconsVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
      },
    }),
  };

  const phoneVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-secondary-100 py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Phone and Bank Icons */}
        <div className="relative flex items-center justify-center w-full md:w-auto">
          {/* Vertical Bank Icons */}
          <div className="absolute -left-24 top-1/4 flex flex-col items-center space-y-4 z-10">
            <motion.div
              custom={0}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={bankIconsVariants}
              className="bg-white rounded-2xl shadow-lg p-2"
            >
              <Image
                src="/images/banks/guaranty-trust-bank.svg"
                alt="GTBank"
                width={40}
                height={40}
                className="w-10 h-10 object-cover"
              />
            </motion.div>
            <motion.div
              custom={1}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={bankIconsVariants}
              className="bg-white rounded-2xl shadow-lg p-2"
            >
              <Image
                src="/images/banks/moniepoint.svg"
                alt="Moniepoint"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </motion.div>
            <motion.div
              custom={2}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={bankIconsVariants}
              className="bg-white rounded-2xl shadow-lg p-2"
            >
              <Image
                src="/images/banks/access-bank-plc.svg"
                alt="Access Bank"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </motion.div>
            <motion.div
              custom={3}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={bankIconsVariants}
              className="bg-white rounded-2xl shadow-lg p-2"
            >
              <Image
                src="/images/banks/OPay.svg"
                alt="Opay"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </motion.div>
            <motion.div
              custom={4}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={bankIconsVariants}
              className="bg-secondary-100 text-secondary-700 font-semibold text-xs rounded-xl px-4 py-4 mt-2 shadow text-center"
            >
              50+ Banks
            </motion.div>
          </div>

          {/* Phone Mockup */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={phoneVariants}
            className="relative z-20"
          >
            <div className="relative w-80 h-[600px]">
              <div className="absolute inset-0 bg-black rounded-[3rem] shadow-2xl">
                <div className="absolute inset-2 bg-black rounded-[2.5rem] overflow-hidden">
                  <div className="h-full bg-gradient-to-b from-primary-900 to-black text-white relative">
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
                    {/* Chat UI (sample) */}
                    <div className="p-6 space-y-2">
                      <div className="flex items-center mb-4">
                        <Image
                          src="https://randomuser.me/api/portraits/men/32.jpg"
                          alt="User"
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-semibold shadow">
                          Sent 20k to Mama Ngozi
                        </span>
                      </div>
                      <div className="bg-green-700 bg-opacity-80 p-3 rounded-2xl text-sm w-fit ml-auto">
                        Send 2k to my GTB
                      </div>
                      <div className="bg-gray-800 bg-opacity-80 p-3 rounded-2xl text-sm w-fit">
                        Please enter the recipient&apos;s account number for
                        your GTB.
                      </div>
                      <div className="bg-green-700 bg-opacity-80 p-3 rounded-2xl text-sm w-fit ml-auto">
                        The last Gtbank I sent money to
                      </div>
                      <div className="bg-gray-800 bg-opacity-80 p-3 rounded-2xl text-sm w-fit">
                        Do you mean account number 0240256606?
                      </div>
                      <div className="bg-green-700 bg-opacity-80 p-3 rounded-2xl text-sm w-fit ml-auto">
                        What&apos;s the name
                      </div>
                      <div className="bg-gray-800 bg-opacity-80 p-3 rounded-2xl text-sm w-fit">
                        The name associated with account number 0240256606 is
                        SULAIMAN ABDULSEMIU ADEWALE.
                      </div>
                      <div className="bg-gray-800 bg-opacity-80 p-3 rounded-2xl text-sm w-fit">
                        Are you sure you want to transfer N2,000.00 to SULAIMAN
                        ABDULSEMIU ADEWALE (0240256606) at Guaranty Trust Bank?
                      </div>
                      <div className="bg-green-700 bg-opacity-80 p-3 rounded-2xl text-sm w-fit ml-auto">
                        Yes
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="flex-1 max-w-xl text-center md:text-left">
          <motion.span
            custom={0}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={textVariants}
            className="uppercase text-secondary-500 font-semibold tracking-wider text-sm mb-2 block"
          >
            Transfer
          </motion.span>

          <motion.h2
            custom={1}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={textVariants}
            className="text-4xl md:text-5xl font-bold text-[#3b2562] mb-4"
          >
            Send Money,
            <br />
            <span className="text-[#4b2992]">Stress-Free</span>
          </motion.h2>

          <motion.p
            custom={2}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={textVariants}
            className="text-lg text-[#3b2562] mb-8"
          >
            Transfer funds quickly and securely — whether it&apos;s to a friend,
            a vendor, or your other accounts.
          </motion.p>

          <motion.button
            custom={3}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={textVariants}
            onClick={() => {
              const message = encodeURIComponent(
                "Hi, I'd like to get started with Laskad!"
              );
              window.open(`https://wa.me/2349065577709?text=Hi`, '_blank');
            }}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-secondary-700 transition-colors"
          >
            Try It Out
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default TransferSection;
