'use client';

import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/sections/Navbar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const Features = () => {
  const coreFeatures = [
    {
      title: 'WhatsApp Native Transactions',
      description:
        'Complete financial transactions without leaving your WhatsApp conversations.',
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      image: '/images/whatsapp-integration.jpg',
    },
    {
      title: 'AI-Powered Language Understanding',
      description:
        'Our natural language processing understands transaction requests just like human conversation.',
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      ),
      image: '/images/ai-language.jpg',
    },
    {
      title: 'Instant Notifications',
      description:
        'Get real-time alerts for all transactions and account activities.',
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      ),
      image: '/images/notifications.jpg',
    },
  ];

  // Animation Refs
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const featuresRef = useRef(null);

  const financialFeatures = [
    {
      title: 'Send & Receive Money',
      description:
        'Transfer funds to anyone in your contacts with just a chat message.',
      icon: '💰',
    },
    {
      title: 'Bill Payments',
      description:
        'Pay utilities, subscriptions, and other bills directly through chat.',
      icon: '🧾',
    },
    {
      title: 'Business Payments',
      description:
        'Accept customer payments and send invoices without extra apps.',
      icon: '🏢',
    },
    {
      title: 'International Transfers',
      description: 'Send money abroad with competitive exchange rates.',
      icon: '🌎',
    },
    {
      title: 'Savings Goals',
      description: 'Set up and manage savings targets through simple commands.',
      icon: '🎯',
    },
    {
      title: 'Transaction History',
      description:
        'Access your complete financial history with natural language queries.',
      icon: '📊',
    },
  ];

  const securityFeatures = [
    {
      title: 'End-to-End Encryption',
      description:
        'All messages and transactions secured with military-grade encryption.',
    },
    {
      title: 'Biometric Authentication',
      description: 'Secure access with fingerprint or face recognition.',
    },
    {
      title: 'AI Fraud Detection',
      description: 'Real-time monitoring for suspicious activity.',
    },
    {
      title: 'Dispute Resolution',
      description: 'Quickly report and resolve transaction issues.',
    },
  ];

  const imageExists = (src: string) => {
    // List of real images in /public/images/
    const realImages = [
      '/images/whatsapp-integration.jpg',
      '/images/ai-language.jpg',
      '/images/notifications.jpg',
      '/images/laskad-logo.png',
    ];
    return realImages.includes(src) ? src : '/images/laskad-logo.png';
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[100vh] bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Laskad Features
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Discover how our AI-powered WhatsApp transaction platform makes
              financial management simple, secure, and conversational
            </p>
          </div>
        </section>

        {/* Core Features */}
        <section ref={sectionRef} className="w-[80vw] mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h2
              ref={headingRef}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Core Capabilities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Laskad transforms your WhatsApp into a powerful financial platform
              with these foundational features
            </p>
          </div>
          <div ref={featuresRef} className="grid md:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
              >
                <div className="h-48 relative bg-gray-200 group">
                  <Image
                    src={imageExists(feature.image)}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={index === 0}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg mr-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Financial Features */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Financial Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Complete banking operations through simple WhatsApp commands
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {financialFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Example Conversations */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              See It In Action
            </h2>

            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-green-600 p-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="text-white">
                  <h3 className="font-semibold">Laskad Payments</h3>
                  <p className="text-sm opacity-80">
                    Typically replies instantly
                  </p>
                </div>
              </div>

              <div className="p-4 space-y-3">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-blue-100 rounded-lg py-2 px-4 max-w-xs">
                    <p>Send $50 to Sarah for dinner</p>
                    <p className="text-xs text-gray-500 text-right mt-1">
                      12:05 PM
                    </p>
                  </div>
                </div>

                {/* System Message */}
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg py-2 px-4 max-w-xs">
                    <p>Confirm sending $50 to Sarah Williams (•••• 2345)?</p>
                    <div className="flex gap-2 mt-2">
                      <button className="text-xs bg-blue-600 text-white py-1 px-2 rounded">
                        Confirm
                      </button>
                      <button className="text-xs border border-gray-300 py-1 px-2 rounded">
                        Cancel
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">12:05 PM</p>
                  </div>
                </div>

                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-blue-100 rounded-lg py-2 px-4 max-w-xs">
                    <p>Yes</p>
                    <p className="text-xs text-gray-500 text-right mt-1">
                      12:06 PM
                    </p>
                  </div>
                </div>

                {/* System Message */}
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg py-2 px-4 max-w-xs">
                    <p className="text-green-600 font-medium">
                      Success! $50 sent to Sarah Williams
                    </p>
                    <p className="text-sm mt-1">Transaction ID: LSK-789234</p>
                    <p className="text-sm">Balance: $1,245.00</p>
                    <p className="text-xs text-gray-500 mt-1">12:06 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Security & Privacy
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Enterprise-grade protection built into every feature
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </div>

      <Footer />
    </>
  );
};

export default Features;
