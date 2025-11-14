'use client';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/sections/Navbar';
import CTASection from '@/components/sections/CTASection';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const Security = () => {
  const securityFeatures = [
    {
      title: 'End-to-End Encryption',
      description:
        'All transactions and messages are encrypted from sender to recipient, ensuring complete privacy.',
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
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      title: 'Multi-Factor Authentication',
      description:
        'Secure your account with multiple verification methods including biometrics and one-time passwords.',
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: 'AI Fraud Detection',
      description:
        'Our machine learning algorithms monitor transactions 24/7 to detect and prevent suspicious activity.',
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
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
    },
    {
      title: 'Bank-Level Security',
      description:
        'We partner with PCI-DSS compliant payment processors to ensure your money is always protected.',
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
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Regular Security Audits',
      description:
        'Independent security firms test our systems regularly to maintain the highest protection standards.',
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: 'Data Minimization',
      description:
        'We only collect essential information and never store sensitive data longer than necessary.',
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
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
  ];

  // Animation Refs
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const featuresRef = useRef(null);

  
  const complianceBadges = [
    {
      name: 'PCI DSS',
      description: 'Payment Card Industry Data Security Standard',
      image: '/images/pci-dss-badge.png',
    },
    {
      name: 'SOC 2',
      description: 'System and Organization Controls compliance',
      image: '/images/soc2-badge.png',
    },
    {
      name: 'GDPR',
      description: 'General Data Protection Regulation',
      image: '/images/gdpr-badge.png',
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
              Security First
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Your trust is our priority. Laskad uses military-grade encryption
              and bank-level security to protect every transaction.
            </p>
          </div>
        </section>

        {/* Security Features */}
        <section ref={sectionRef} className="w-[80vw] mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h2
              ref={headingRef}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              How We Protect You
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Laskad combines cutting-edge technology with rigorous security
              practices to safeguard your financial data.
            </p>
          </div>
          <div ref={featuresRef} className="grid md:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Security Deep Dive */}
        <section className="bg-white py-16">
          <div className="w-[80vw] mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <Image
                  src="/images/security-illustration.jpg"
                  alt="Security Illustration"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Transaction Security Protocol
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                      <svg
                        className="w-5 h-5 text-green-600"
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
                        Real-Time Monitoring
                      </h3>
                      <p className="text-gray-600">
                        Our AI analyzes every transaction for suspicious
                        patterns, blocking potential fraud before it happens.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                      <svg
                        className="w-5 h-5 text-green-600"
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
                        Device Authentication
                      </h3>
                      <p className="text-gray-600">
                        Each device must be verified before accessing your
                        account, preventing unauthorized logins.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                      <svg
                        className="w-5 h-5 text-green-600"
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
                        Secure PIN Protection
                      </h3>
                      <p className="text-gray-600">
                        Your 4-digit PIN is encrypted and never stored in plain
                        text, with rate limiting to prevent brute force attacks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Industry Compliance
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Laskad meets and exceeds the highest security standards in
                financial services.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {complianceBadges.map((badge, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 relative mb-4">
                    <Image
                      src={badge.image}
                      alt={badge.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{badge.name}</h3>
                  <p className="text-gray-600">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Security FAQs
            </h2>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-3">
                  Is my financial data safe with Laskad?
                </h3>
                <p className="text-gray-600">
                  Absolutely. We use bank-grade encryption and never store your
                  full banking details on our servers. All sensitive data is
                  tokenized and processed through our PCI-DSS compliant
                  partners.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-3">
                  What happens if I lose my phone?
                </h3>
                <p className="text-gray-600">
                  Your account remains protected. Without your PIN or biometric
                  authentication, no one can access your Laskad account or
                  initiate transactions. You can immediately freeze your account
                  through our web portal or by contacting support.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-3">
                  How does Laskad detect fraud?
                </h3>
                <p className="text-gray-600">
                  Our AI analyzes hundreds of data points per transaction
                  including device information, location patterns, transaction
                  history, and behavioral biometrics to identify suspicious
                  activity with 99.9% accuracy.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Can Laskad employees access my account?
                </h3>
                <p className="text-gray-600">
                  No. We follow strict zero-knowledge protocols where even our
                  engineers cannot access your financial data. All support
                  requests requiring account access require your explicit
                  permission through multi-factor authentication.
                </p>
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

export default Security;
