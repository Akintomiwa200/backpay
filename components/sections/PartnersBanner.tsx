'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const partners = [
  {
    name: 'GTBank',
    logo: '/images/banks/guaranty-trust-bank.svg',
  },
  {
    name: 'Moniepoint',
    logo: '/images/banks/moniepoint.svg',
  },
  {
    name: 'Access Bank',
    logo: '/images/banks/access-bank-plc.svg',
  },
  {
    name: 'OPay',
    logo: '/images/banks/OPay.svg',
  },
  {
    name: 'Lint',
    logo: '/images/banks/lint.png',
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
      className="py-16 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Trusted by Leading Banks</h2>
          <p className="text-gray-600">Seamlessly connect with all your favorite banks</p>
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
                duration: 20,
                ease: "linear"
              }
            }}
          >
            {/* First set of logos */}
            {partners.map((partner, index) => (
              <motion.div
                key={`partner-1-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="flex-shrink-0 bg-white rounded-xl p-4 w-32 h-32 flex items-center justify-center duration-300"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </motion.div>
            ))}
            {/* Duplicate set of logos for seamless loop */}
            {partners.map((partner, index) => (
              <motion.div
                key={`partner-2-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ 
                  delay: (index + partners.length) * 0.1,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="flex-shrink-0 p-4 w-32 h-32 flex items-center justify-center duration-300"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default PartnersBanner;