'use client';
import { useEffect, useRef } from 'react';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';



const toc = [
  { id: 'acceptance', label: 'Acceptance of Terms' },
  { id: 'service', label: 'Service Description' },
  { id: 'responsibilities', label: 'User Responsibilities' },
  { id: 'relationships', label: 'Financial Institution Relationships' },
  { id: 'limits', label: 'Transaction Limits and Fees' },
  { id: 'dispute', label: 'Dispute Resolution' },
  { id: 'liability', label: 'Limitation of Liability' },
  { id: 'changes', label: 'Changes to Terms' },
  { id: 'contact', label: 'Contact Us' },
];

export default function TermsOfService() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);


  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center flex flex-col items-center">
          <div className="bg-white/10 rounded-full w-20 h-20 flex items-center justify-center mb-6">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" ref={headingRef}>
            Terms of Service
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Please read these terms carefully before using Laskad’s
            WhatsApp-based financial services.
          </p>
        </div>
      </section>

      <section ref={sectionRef} className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12">
          {/* Sidebar/Table of Contents */}
          <div ref={tocRef} className="md:w-1/4 mb-8 md:mb-0">
            <div className="sticky top-32 bg-blue-50 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-blue-700 mb-4">
                On this page
              </h2>
              <ul className="space-y-2">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div
            ref={contentRef}
            className="prose prose-lg max-w-none text-gray-700 space-y-8 md:w-3/4"
          >
            <div className="bg-gray-50 p-6 rounded-xl" id="last-updated">
              <h2 className="text-2xl font-bold mb-4">
                Last Updated: June 15, 2023
              </h2>
              <p className="text-gray-600">
                Welcome to Laskad! These Terms of Service govern your use of our
                WhatsApp-based financial services.
              </p>
            </div>

            <div id="acceptance">
              <h3 className="text-xl font-semibold mb-3">
                1. Acceptance of Terms
              </h3>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-2">
                <p className="text-yellow-800 text-sm font-medium">
                  By accessing or using Laskad's services, you agree to these
                  Terms. If you disagree, please discontinue use immediately.
                </p>
              </div>
            </div>

            <div id="service">
              <h3 className="text-xl font-semibold mb-3">
                2. Service Description
              </h3>
              <p>
                Laskad provides financial transaction services via WhatsApp,
                including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Money transfers between bank accounts</li>
                <li>Airtime and data purchases</li>
                <li>Bill payments</li>
                <li>Account balance inquiries</li>
              </ul>
            </div>

            <div id="responsibilities">
              <h3 className="text-xl font-semibold mb-3">
                3. User Responsibilities
              </h3>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Provide accurate and complete information</li>
                <li>
                  Maintain the confidentiality of your PIN and security details
                </li>
                <li>Use the service only for lawful purposes</li>
                <li>Not engage in fraudulent activities</li>
              </ul>
            </div>

            <div id="relationships">
              <h3 className="text-xl font-semibold mb-3">
                4. Financial Institution Relationships
              </h3>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-2">
                <p className="text-blue-800 text-sm font-medium">
                  Laskad is not a bank. We partner with licensed financial
                  institutions to provide services. Your banking relationships
                  remain solely between you and your bank.
                </p>
              </div>
            </div>

            <div id="limits">
              <h3 className="text-xl font-semibold mb-3">
                5. Transaction Limits and Fees
              </h3>
              <p>
                Transaction limits may apply based on your verification level.
                Fees will be disclosed before confirming any transaction.
              </p>
            </div>

            <div id="dispute">
              <h3 className="text-xl font-semibold mb-3">
                6. Dispute Resolution
              </h3>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded mb-2">
                <p className="text-red-800 text-sm font-medium">
                  Report any unauthorized transactions within 24 hours by
                  contacting support via WhatsApp. We will investigate promptly.
                </p>
              </div>
            </div>

            <div id="liability">
              <h3 className="text-xl font-semibold mb-3">
                7. Limitation of Liability
              </h3>
              <p>
                Laskad shall not be liable for any indirect, incidental, or
                consequential damages arising from use of our services.
              </p>
            </div>

            <div id="changes">
              <h3 className="text-xl font-semibold mb-3">
                8. Changes to Terms
              </h3>
              <p>
                We may modify these Terms at any time. Continued use after
                changes constitutes acceptance of the new Terms.
              </p>
            </div>

            <div id="contact" className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
              <p>
                For questions about these Terms, contact us via WhatsApp at{' '}
                <a
                  href="https://wa.me/2349065577709"
                  className="text-blue-600 underline"
                >
                  +234 906 557 7709
                </a>{' '}
                or email{' '}
                <a
                  href="mailto:legal@laskad.com"
                  className="text-blue-600 underline"
                >
                  legal@laskad.com
                </a>
                .
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/2349065577709?text=Hi%20Legal%20Team!"
                  target="_blank"
                  rel="noopener"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors text-center"
                >
                  Contact Legal on WhatsApp
                </a>
                <a
                  href="mailto:legal@laskad.com"
                  className="bg-white border border-blue-600 text-blue-700 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors text-center"
                >
                  Email Legal Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
