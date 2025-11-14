'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useInView, Variants } from 'framer-motion';

const useCases = [
  {
    badge: { icon: '↗', amount: '₦20,000', recipient: 'Iya Silipha' },
    image: 'https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&w=600',
    bankIcon: '/images/banks/guaranty-trust-bank.svg',
    title: 'Paying at a Street Food Stall',
    desc: 'Pay for lunch in seconds. no cash, no apps.',
  },
  {
    badge: { icon: '↗', amount: '₦20,000', recipient: 'Mama Ngozi' },
    image: 'https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&w=600',
    bankIcon: '/images/banks/moniepoint.svg',
    title: 'Paying a Market Vendor',
    desc: 'Settle up at your local market with just a scan.',
  },
  {
    badge: { icon: '↗', amount: '₦10,000', recipient: 'Chuks' },
    image: 'https://images.pexels.com/photos/1666067/pexels-photo-1666067.jpeg?auto=compress&w=600',
    bankIcon: '/images/banks/access-bank-plc.svg',
    title: 'Splitting a Bill Among Friends',
    desc: 'Split bills fast. No awkward delays.',
  },
  {
    badge: { icon: '↗', amount: '₦5,000', recipient: 'Iyanu Barber' },
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=600',
    bankIcon: '/images/banks/OPay.svg',
    title: 'Haircut/Beauty Service',
    desc: 'Get styled, then scan to pay. beautifully simple.',
  },
];

const UseCasesSection = () => {
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
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
      className="relative bg-black py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headingVariants}
          className="text-center mb-16"
        >
          <div className="uppercase text-white/70 text-xs tracking-widest mb-2">
            Send to any bank from Laskad
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Where Laskad Fits Into Everyday Lives
          </h2>
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
              className="relative rounded-3xl overflow-hidden border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 group"
              whileHover={{ y: -5 }}
            >
              {/* Badge - positioned absolutely at top */}
              <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {uc.badge.icon}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-xs text-gray-900">
                    Sent {uc.badge.amount}
                  </div>
                  <div className="text-[10px] text-gray-500">
                    to {uc.badge.recipient}
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={uc.image}
                  alt={uc.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>

              {/* Content - positioned below image */}
              <div className="p-6">
                {/* Bank/App Icon */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-14 h-10 bg-white rounded-xl shadow-lg overflow-hidden">
                    <Image
                      src={uc.bankIcon}
                      alt="Bank/App"
                      fill
                      className="object-fit rounded-xl"
                      unoptimized
                    />
                  </div>
                  <h3 className="font-bold text-white text-xl mb-2 leading-tight">
                    {uc.title}
                  </h3>
                </div>

                {/* Title & Description */}
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {uc.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UseCasesSection;