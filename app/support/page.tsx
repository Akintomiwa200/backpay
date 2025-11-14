'use client';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/sections/Navbar';
import { useEffect, useRef } from 'react';

const Support = () => {
  const heroRef = useRef(null);
  const cardsRef = useRef(null);

  
  return (
    <>
      <Navbar />
      <div className="min-h-[100vh] bg-gray-50">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20"
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Support Center
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Need help? Our team is here 24/7 to assist you with any questions,
              issues, or feedback.
            </p>
          </div>
        </section>

        {/* Support Options */}
        <section className="w-[80vw] mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How can we help you?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose a support option below or fill out the contact form and
              we’ll get back to you as soon as possible.
            </p>
          </div>
          <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 mb-12">
            {/* FAQ */}
            <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
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
              <h3 className="text-lg font-semibold mb-2">FAQs</h3>
              <p className="text-gray-600 text-center mb-4">
                Find answers to common questions about Laskad and our services.
              </p>
              <a
                href="/faq"
                className="text-blue-600 font-medium hover:underline"
              >
                Browse FAQs
              </a>
            </div>
            {/* Live Chat */}
            <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center hover:shadow-lg transition-shadow">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
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
              <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600 text-center mb-4">
                Chat instantly with our support team for real-time assistance.
              </p>
              <a
                href="/liveChat"
                className="text-green-600 font-medium hover:underline"
              >
                Start Live Chat
              </a>
            </div>
            {/* WhatsApp Support */}
            <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center hover:shadow-lg transition-shadow">
              <div className="bg-green-50 p-4 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">WhatsApp Support</h3>
              <p className="text-gray-600 text-center mb-4">
                Message us on WhatsApp for quick help and updates.
              </p>
              <a
                href="https://wa.me/2349065577709?text=Hi%20Laskad%20Support!"
                target="_blank"
                rel="noopener"
                className="text-green-500 font-medium hover:underline"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Contact Us
            </h3>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Support;
