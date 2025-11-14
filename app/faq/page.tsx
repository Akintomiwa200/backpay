// @ts-nocheck

'use client';

import Accordion from '@/components/accordion';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import CTASection from '@/components/sections/CTASection';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const faqs = [
  {
    category: 'General',
    items: [
      {
        question: 'What is Laskad?',
        answer:
          'Laskad is your financial assistant that helps you manage money, make payments, and track expenses — all through natural conversation on WhatsApp.',
      },
      {
        question: 'How does Laskad work?',
        answer:
          'Laskad connects to your bank accounts securely and lets you perform transactions, check balances, and more, all via chat.',
      },
      {
        question: 'How do I start using Laskad?',
        answer:
          'Just add Laskad to your WhatsApp contacts, send a message, and follow the onboarding instructions.',
      },
    ],
  },
  {
    category: 'Security',
    items: [
      {
        question: 'Is Laskad secure?',
        answer:
          "Yes, all communications happen through WhatsApp's end-to-end encryption. We don't store your financial data on our servers, and we use bank-level security protocols for all transactions.",
      },
      {
        question: 'What if I lose my phone?',
        answer:
          'Contact your bank immediately to secure your accounts. You can also reach out to Laskad support for assistance.',
      },
      {
        question: 'How is my financial data protected?',
        answer:
          'We use tokenization to ensure your actual account details are never stored or transmitted. All transactions require multi-factor authentication.',
      },
    ],
  },
  {
    category: 'Features',
    items: [
      {
        question: 'What can I do with Laskad?',
        answer:
          'Send/receive money, pay bills, check balances, set savings goals, track expenses, and more - all through WhatsApp chat.',
      },
      {
        question: 'Does Laskad support voice and multiple languages?',
        answer:
          "Currently, Laskad supports text chat in English, but we're working on adding more languages and voice support soon.",
      },
      {
        question: 'Can I use Laskad for business transactions?',
        answer:
          'Yes! Laskad Business allows you to accept payments, send invoices, and manage business finances through WhatsApp.',
      },
    ],
  },
  {
    category: 'Troubleshooting',
    items: [
      {
        question: "What if Laskad doesn't understand my input?",
        answer:
          "You can rephrase your question or type 'Help' to get support from our team.",
      },
      {
        question: "Why isn't my transaction going through?",
        answer:
          "Check your internet connection, ensure you have sufficient balance, and verify you've completed all authentication steps.",
      },
      {
        question: 'How do I report a problem?',
        answer:
          "Type 'Support' in your chat or email help@laskad.com with details of your issue.",
      },
    ],
  },
];

const popularQuestions = [
  'How do I start using Laskad?',
  'Is Laskad secure?',
  'What can I do with Laskad?',
  'How is my financial data protected?',
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<{
    category: number;
    item: number;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('General');
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const faqItemsRef = useRef<HTMLDivElement>(null);

  const toggleFaq = (categoryIndex: number, itemIndex: number) => {
    setActiveIndex(
      activeIndex?.category === categoryIndex && activeIndex.item === itemIndex
        ? null
        : { category: categoryIndex, item: itemIndex }
    );
  };

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  const router = useRouter();

  const handleLive = () => {
    router.push('/liveChat');
  };

  const handleSupport = () => {
    router.push('/support');
  };

  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How can we help?
          </h1>
          <p className="text-xl mb-8">
            Find answers to common questions about Laskad
          </p>

          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full py-4 px-6 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 text-gray-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="w-6 h-6 text-gray-500 absolute right-6 top-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Popular Questions</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {popularQuestions.map((question, i) => (
              <Button
                key={i}
                variant="outline"
                className="text-left h-auto py-4 px-6 border-gray-300 hover:bg-gray-100"
                onClick={() => {
                  // Find the question in our FAQs and open it
                  for (let c = 0; c < faqs.length; c++) {
                    for (let q = 0; q < faqs[c].items.length; q++) {
                      if (faqs[c].items[q].question === question) {
                        setActiveCategory(faqs[c].category);
                        setActiveIndex({ category: c, item: q });
                        document
                          .getElementById('faq-section')
                          ?.scrollIntoView({ behavior: 'smooth' });
                        return;
                      }
                    }
                  }
                }}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section ref={sectionRef} id="faq-section" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Frequently Asked Questions
          </h2>

          <div className="flex overflow-x-auto mb-8 pb-2 scrollbar-hide">
            {faqs.map((category, i) => (
              <button
                key={i}
                className={cn(
                  'whitespace-nowrap px-6 py-2 mr-4 rounded-full font-medium',
                  activeCategory === category.category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                )}
                onClick={() => setActiveCategory(category.category)}
              >
                {category.category}
              </button>
            ))}
          </div>

          <div ref={faqItemsRef} className="space-y-6">
            {filteredFaqs
              .filter((category) => category.category === activeCategory)
              .map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-6">
                  {category.items.map((faq, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="border border-gray-200 rounded-xl overflow-hidden"
                    >
                      <button
                        className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                        onClick={() =>
                          toggleFaq(
                            faqs.findIndex(
                              (c) => c.category === category.category
                            ),
                            category.items.indexOf(faq)
                          )
                        }
                      >
                        <span className="text-lg font-medium flex-1 text-left">
                          {faq.question}
                        </span>
                        <svg
                          className={cn(
                            'w-6 h-6 text-gray-500 transition-transform',
                            activeIndex?.category ===
                              faqs.findIndex(
                                (c) => c.category === category.category
                              ) &&
                              activeIndex?.item === category.items.indexOf(faq)
                              ? 'transform rotate-45'
                              : ''
                          )}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <line
                            x1="12"
                            y1="5"
                            x2="12"
                            y2="19"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                          <line
                            x1="5"
                            y1="12"
                            x2="19"
                            y2="12"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                      <div
                        className={cn(
                          'overflow-hidden transition-all duration-300 ease-in-out',
                          activeIndex?.category ===
                            faqs.findIndex(
                              (c) => c.category === category.category
                            ) &&
                            activeIndex?.item === category.items.indexOf(faq)
                            ? 'max-h-96 px-6 pb-6'
                            : 'max-h-0'
                        )}
                      >
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm">
            <Image
              src="/images/support-team.svg"
              alt="Support Team"
              width={200}
              height={200}
              className="mx-auto mb-6"
            />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our support team is available 24/7 to help you with any questions
              or issues.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                onClick={handleSupport}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg"
              >
                Contact Support
              </Button>
              <Button
                variant="outline"
                onClick={handleLive}
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
              >
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </>
  );
}
