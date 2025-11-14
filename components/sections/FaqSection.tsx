"use client";

import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, useInView, Variants } from 'framer-motion';

const faqs = [
  {
    question: "What is Laskad?",
    answer: "Laskad is your financial assistant that helps you manage money, make payments, and track expenses — all through natural conversation on WhatsApp."
  },
  {
    question: "How does Laskad work?",
    answer: "Laskad connects to your bank accounts securely and lets you perform transactions, check balances, and more, all via chat."
  },
  {
    question: "Is Laskad secure?",
    answer: "Yes, all communications happen through WhatsApp's end-to-end encryption. We don't store your financial data on our servers, and we use bank-level security protocols for all transactions."
  },
  {
    question: "How do I start using Laskad?",
    answer: "Just add Laskad to your WhatsApp contacts, send a message, and follow the onboarding instructions."
  },
  {
    question: "What if Laskad doesn't understand my input?",
    answer: "You can rephrase your question or type 'Help' to get support from our team."
  },
  {
    question: "What if I lose my phone?",
    answer: "Contact your bank immediately to secure your accounts. You can also reach out to Laskad support for assistance."
  },
  {
    question: "Does Laskad support voice and multiple languages?",
    answer: "Currently, Laskad supports text chat in English, but we're working on adding more languages and voice support soon."
  }
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const faqItemsRef = useRef<HTMLDivElement>(null);

  // useInView hooks for animation triggers
  const isSectionInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const isHeadingInView = useInView(headingRef, { once: false, amount: 0.3 });
  const isFaqItemsInView = useInView(faqItemsRef, { once: false, amount: 0.1 });

  // Animation variants
  const headingVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const faqContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const faqItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.section 
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          ref={headingRef}
          initial="hidden"
          animate={isHeadingInView ? "visible" : "hidden"}
          variants={headingVariants}
          className="text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-12"
        >
          Frequently Asked Questions
        </motion.h2>
        
        <motion.div 
          ref={faqItemsRef}
          initial="hidden"
          animate={isFaqItemsInView ? "visible" : "hidden"}
          variants={faqContainerVariants}
          className="divide-y divide-gray-200 dark:divide-gray-800"
        >
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={faqItemVariants}>
              <motion.button
                className="w-full flex justify-between items-center py-8 text-left focus:outline-none"
                onClick={() => toggleFaq(i)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-lg md:text-xl font-medium text-gray-900 dark:text-white flex-1 text-left">
                  {i + 1}. {faq.question}
                </span>
                <motion.svg
                  className="w-6 h-6 text-gray-900 dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: activeIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <line x1="12" y1="5" x2="12" y2="19" strokeWidth={2} strokeLinecap="round" />
                  <line x1="5" y1="12" x2="19" y2="12" strokeWidth={2} strokeLinecap="round" />
                </motion.svg>
              </motion.button>
              
              <motion.div
                initial={false}
                animate={{
                  height: activeIndex === i ? "auto" : 0,
                  opacity: activeIndex === i ? 1 : 0,
                  paddingTop: activeIndex === i ? 8 : 0,
                  paddingBottom: activeIndex === i ? 8 : 0
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                  opacity: { duration: 0.2 }
                }}
                className="overflow-hidden"
              >
                <motion.p 
                  className="text-gray-700 dark:text-gray-300 text-base md:text-lg px-2 md:px-6"
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                >
                  {faq.answer}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}