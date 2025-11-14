import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        {/* <Link href="/" className="flex items-center space-x-2"> */}
        {/* Simple Laskad logo: green chevron + Laskad text */}
        {/* <span className="inline-block">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12L12 4" stroke="#00A86B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 12L12 20" stroke="#00A86B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">Laskad</span>
        </Link> */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/banks/laskad_png_transparent.png"
            alt="Laskad Logo"
            width={20}
            height={20}
          />
          <span className="text-2xl font-bold text-gray-900">
            askad Technologies
          </span>
        </Link>
        {/* Nav Links */}
        <div className="flex-1 flex justify-center">
          {/* <ul className="flex space-x-8">
            <li>
              <Link
                href="/use-cases"
                className="text-base font-medium text-gray-900 dark:text-white hover:text-primary-600 active:text-primary-500 active:border-b-2"
              >
                Use Cases
              </Link>
            </li>
            <li>
              <Link
                href="/features"
                className="text-base font-medium text-gray-900 dark:text-white hover:text-primary-600 active:text-primary-500 active:border-b-2"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/security"
                className="text-base font-medium text-gray-900 dark:text-white hover:text-primary-600 active:text-primary-500 active:border-b-2"
              >
                Security
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="text-base font-medium text-gray-900 dark:text-white hover:text-primary-600 active:text-primary-500 active:border-b-2"
              >
                FAQ
              </Link>
            </li>
          </ul> */}
        </div>
        {/* CTA Button */}
        <div>
          <Link
            href="https://wa.me/2349065577709?text=Hi"
            className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold text-base hover:bg-primary-700 transition-colors"
          >
            Try it Out
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
