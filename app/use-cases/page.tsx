'use client';

import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/sections/Navbar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Usecase = () => {
  const useCases = [
    {
      title: 'Peer-to-Peer Payments',
      description:
        'Send and receive money instantly between friends and family through simple WhatsApp messages.',
      icon: (
        <svg
          className="w-10 h-10 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      features: [
        'Split bills with friends',
        'Send birthday gifts',
        'Pay back borrowed money',
      ],
      image: '/images/p2p-payments.jpg',
    },
    {
      title: 'Small Business Transactions',
      description:
        'Accept payments from customers directly through WhatsApp without any technical setup.',
      icon: (
        <svg
          className="w-10 h-10 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      features: [
        'Invoice customers via chat',
        'Accept payments for services',
        'Track transactions automatically',
      ],
      image: '/images/business-payments.jpg',
    },
    {
      title: 'Recurring Payments',
      description:
        'Set up automatic payments for subscriptions, rent, or other regular expenses.',
      icon: (
        <svg
          className="w-10 h-10 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      features: [
        'Automate monthly bills',
        'Set payment reminders',
        'Modify schedules easily',
      ],
      image: '/images/recurring-payments.jpg',
    },
    {
      title: 'International Remittances',
      description:
        'Send money across borders with competitive exchange rates and low fees.',
      icon: (
        <svg
          className="w-10 h-10 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7zm5-4h9a2 2 0 012 2v2a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z"
          />
        </svg>
      ),
      features: [
        'Send money to family abroad',
        'Real-time exchange rates',
        'Track transfer status',
      ],
      image: '/images/remittances.jpg',
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-[100vh] bg-gray-50">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Laskad Use Cases
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Discover how our AI-powered WhatsApp transaction platform solves
              real financial needs through simple conversations
            </p>
          </div>
        </section>

        {/* Use Cases Grid */}
        <section className="w-[80vw] mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 relative bg-gray-200">
                  <Image
                    src={useCase.image}
                    alt={useCase.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg mr-4">
                      {useCase.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {useCase.title}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {useCase.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {useCase.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2"
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
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    View Example Conversation
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white py-16">
          <div className="w-[80vw] mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">
              How Businesses Use Laskad
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              See how different industries leverage our platform to streamline
              their payment processes
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Retail */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 text-blue-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Retail Stores
                </h3>
                <p className="text-gray-600 mb-4">
                  Accept payments for orders placed via WhatsApp with automated
                  order confirmation and receipts.
                </p>
                <div className="bg-blue-50 p-3 rounded-lg text-sm">
                  <p className="font-medium text-blue-800">Customer message:</p>
                  <p>
                    "I'd like to order 2 pairs of the blue sneakers in size 10"
                  </p>
                </div>
              </div>

              {/* Freelancers */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 text-blue-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Freelancers
                </h3>
                <p className="text-gray-600 mb-4">
                  Invoice clients and receive payments without leaving your
                  WhatsApp conversations.
                </p>
                <div className="bg-blue-50 p-3 rounded-lg text-sm">
                  <p className="font-medium text-blue-800">
                    Freelancer message:
                  </p>
                  <p>
                    "Here's your invoice for the website design: $1200 (Pay Now
                    button)"
                  </p>
                </div>
              </div>

              {/* Property Managers */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 text-blue-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Property Managers
                </h3>
                <p className="text-gray-600 mb-4">
                  Collect rent payments and manage tenant communications all in
                  one place.
                </p>
                <div className="bg-blue-50 p-3 rounded-lg text-sm">
                  <p className="font-medium text-blue-800">Tenant message:</p>
                  <p>"Just sent the $1500 rent for June. Receipt attached."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </div>

      <Footer />
    </>
  );
};

export default Usecase;
