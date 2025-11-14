'use client';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/sections/Navbar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const Watchdemo = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[100vh] bg-gray-50">
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-blue-500 font-medium">Product Demo</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Experience Laskad's AI-Powered WhatsApp Transactions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            See how our platform transforms simple WhatsApp chats into secure,
            intelligent financial transactions.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
              Watch Full Demo Video
            </Button>
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 px-8 py-6 text-lg"
            >
              Try Live Demo
            </Button>
          </div>

          <div className="relative h-96 bg-gray-200 rounded-xl overflow-hidden shadow-lg">
            {/* Auto-generated video thumbnail */}
            <Image
              src="https://picsum.photos/800/400?random=1"
              alt="Laskad Platform Demo"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-all">
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Showcase */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              How Laskad Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
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
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Natural Language Processing
                </h3>
                <p className="text-gray-600">
                  Our AI understands transaction requests in natural language -
                  just chat like you would with a friend.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Bank-Level Security
                </h3>
                <p className="text-gray-600">
                  Every transaction is protected with end-to-end encryption and
                  multi-factor authentication.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Fraud Detection</h3>
                <p className="text-gray-600">
                  Our AI monitors for suspicious activity and prevents fraud in
                  real-time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Demo */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              See It In Action
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8 mb-12">
                <div className="md:w-1/2">
                  <div className="bg-white p-6 rounded-lg shadow-md h-full">
                    <h3 className="text-xl font-semibold mb-4 text-blue-600">
                      1. Initiate Transaction
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Start a chat with Laskad on WhatsApp and type your
                      transaction request naturally.
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                      <p className="text-gray-700">
                        "Hey Laskad, send $50 to Sarah for dinner last night"
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-gray-200 rounded-lg h-full min-h-[200px] overflow-hidden">
                    {/* Auto-generated screenshot for step 1 */}
                    <Image
                      src="https://picsum.photos/400/300?random=2"
                      alt="Initiate transaction"
                      width={400}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 mb-12">
                <div className="md:w-1/2 order-2 md:order-1">
                  <div className="bg-gray-200 rounded-lg h-full min-h-[200px] overflow-hidden">
                    {/* Auto-generated screenshot for step 2 */}
                    <Image
                      src="https://picsum.photos/400/300?random=3"
                      alt="Verification process"
                      width={400}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 order-1 md:order-2">
                  <div className="bg-white p-6 rounded-lg shadow-md h-full">
                    <h3 className="text-xl font-semibold mb-4 text-blue-600">
                      2. Verification
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Laskad verifies your identity using secure methods and
                      confirms transaction details.
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                      <p className="text-gray-700">
                        "Please confirm your PIN to send $50 to Sarah (••••)"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <div className="bg-white p-6 rounded-lg shadow-md h-full">
                    <h3 className="text-xl font-semibold mb-4 text-blue-600">
                      3. Completion
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Receive instant confirmation and receipt right in your
                      WhatsApp chat.
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                      <p className="text-green-600">
                        "Success! $50 sent to Sarah. Transaction ID:
                        LASK-789012"
                      </p>
                      <p className="text-gray-700 mt-2">
                        "Would you like to set up a recurring payment?"
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-gray-200 rounded-lg h-full min-h-[200px] overflow-hidden">
                    {/* Auto-generated screenshot for step 3 */}
                    <Image
                      src="https://picsum.photos/400/300?random=4"
                      alt="Transaction completion"
                      width={400}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
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

export default Watchdemo;
