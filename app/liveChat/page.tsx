'use client';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/sections/Navbar';
import { useEffect, useRef } from 'react';


const LiveChat = () => {
  const heroRef = useRef(null);
  const chatRef = useRef(null);

  
  return (
    <>
      <Navbar />
      <div className="min-h-[100vh] bg-gray-50">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-20"
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Live Chat Support
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Chat instantly with our support team for real-time help, 24/7.
            </p>
          </div>
        </section>

        {/* Live Chat UI Mockup */}
        <section className="w-[80vw] mx-auto px-4 py-12 flex flex-col items-center">
          <div
            ref={chatRef}
            className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full flex flex-col items-center"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <svg
                  className="w-7 h-7 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2m2-4h4a2 2 0 012 2v4a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  Laskad Live Support
                </h3>
                <p className="text-sm text-gray-500">
                  Typically replies instantly
                </p>
              </div>
            </div>
            <div
              className="w-full bg-gray-50 rounded-lg p-4 mb-4 flex flex-col gap-3"
              style={{ minHeight: 200 }}
            >
              <div className="flex justify-end">
                <div className="bg-blue-100 rounded-lg py-2 px-4 max-w-xs">
                  <p>Hi, I need help with a transaction</p>
                  <p className="text-xs text-gray-500 text-right mt-1">
                    12:05 PM
                  </p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-green-100 rounded-lg py-2 px-4 max-w-xs">
                  <p>Hello! How can I assist you today?</p>
                  <p className="text-xs text-gray-500 mt-1">12:05 PM</p>
                </div>
              </div>
            </div>
            <form className="w-full flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
                disabled
              >
                Send
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-3 text-center">
              (Demo only. For real chat, use WhatsApp or email support.)
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default LiveChat;
