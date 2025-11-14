// import Link from 'next/link';
// import ThemeToggle from './theme-toggle';

// export default function Header() {
//   return (
//     <header className="absolute top-4 md:top-6 w-full z-30 pb-4 md:pb-6 border-b [border-image:linear-gradient(to_right,transparent,--theme(--color-indigo-300/.4),transparent)1] dark:[border-image:linear-gradient(to_right,transparent,--theme(--color-indigo-300/.16),transparent)1] shadow-[0_1px_0_0_--theme(--color-white/.2)] dark:shadow-none">
//       <div className="px-4 sm:px-6">
//         <div className="max-w-3xl mx-auto">
//           <div className="relative flex items-center justify-between gap-x-2 h-12 bg-linear-to-b from-white/90 to-white/70 dark:from-gray-700/80 dark:to-gray-700/70 rounded-lg px-3 shadow-sm">
//             {/* Border with dots in corners */}
//             <div
//               className="absolute -inset-1.5 bg-indigo-500/15 dark:bg-gray-800/50 rounded-xs -z-10 before:absolute before:inset-y-0 before:left-0 before:w-[10px] before:bg-[length:10px_10px] before:[background-position:top_center,bottom_center] before:bg-no-repeat before:[background-image:radial-gradient(circle_at_center,--theme(--color-indigo-500/.56)_1px,transparent_1px),radial-gradient(circle_at_center,--theme(--color-indigo-500/.56)_1px,transparent_1px)] dark:before:[background-image:radial-gradient(circle_at_center,--theme(--color-gray-600/.56)_1px,transparent_1px),radial-gradient(circle_at_center,--theme(--color-gray-600/.56)_1px,transparent_1px)] after:absolute after:inset-y-0 after:right-0 after:w-[10px] after:bg-[length:10px_10px] after:[background-position:top_center,bottom_center] after:bg-no-repeat after:[background-image:radial-gradient(circle_at_center,--theme(--color-indigo-500/.56)_1px,transparent_1px),radial-gradient(circle_at_center,--theme(--color-indigo-500/.56)_1px,transparent_1px)] dark:after:[background-image:radial-gradient(circle_at_center,--theme(--color-gray-600/.56)_1px,transparent_1px),radial-gradient(circle_at_center,--theme(--color-gray-600/.56)_1px,transparent_1px)]"
//               aria-hidden="true"
//             />
//             {/* Site branding */}
//             <div className="flex-1">
//               {/* Logo */}
//               <Link href="/">
//                 <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32}>
//                   <path
//                     className="fill-indigo-300"
//                     d="M16.975 3.036c6.402.475 11.514 5.586 11.99 11.989H24.32a7.345 7.345 0 0 1-7.345-7.345V3.036Zm-1.95 21.284v4.644c-6.402-.475-11.514-5.587-11.989-11.99H7.68a7.345 7.345 0 0 1 7.345 7.346Z"
//                   />
//                   <path
//                     className="fill-indigo-500"
//                     d="M3.036 15.025c.475-6.403 5.587-11.514 11.99-11.99V7.68a7.345 7.345 0 0 1-7.346 7.345H3.036Zm21.284 1.95h4.644c-.475 6.402-5.586 11.514-11.989 11.989V24.32a7.345 7.345 0 0 1 7.345-7.345Z"
//                   />
//                 </svg>
//               </Link>
//             </div>
//             {/* Navigation links */}
//             {/* <nav className="flex justify-center">
//               <ul className="flex items-center sm:gap-x-3 text-sm font-medium">
//                 <li>
//                   <Link
//                     className="text-gray-800 dark:text-gray-200 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-800/30 py-1.5 px-3"
//                     href="/updates"
//                   >
//                     Updates
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     className="text-gray-800 dark:text-gray-200 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-800/30 transition-colors py-1.5 px-3"
//                     href="/faq"
//                   >
//                     FAQ
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     className="text-gray-800 dark:text-gray-200 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-800/30 transition-colors py-1.5 px-3"
//                     href="/contact"
//                   >
//                     Contact us
//                   </Link>
//                 </li>
//               </ul>
//             </nav> */}

//             {/* Light switch */}
//             <ThemeToggle />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }


'use client'


import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/images/banks/laskad_png_transparent.png" alt="Laskad Logo" width={20} height={20} />
            <span className="text-2xl font-bold text-gray-900">askad</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex space-x-8">
              <li><Link href="/transfer" className="text-base font-medium text-gray-900 hover:text-green-600 transition-colors">Transfer</Link></li>
              <li><Link href="/security" className="text-base font-medium text-gray-900 hover:text-green-600 transition-colors">Security</Link></li>
              <li><Link href="/features" className="text-base font-medium text-gray-900 hover:text-green-600 transition-colors">Features</Link></li>
              <li><Link href="/support" className="text-base font-medium text-gray-900 hover:text-green-600 transition-colors">Support</Link></li>
              <li><Link href="/use-cases" className="text-base font-medium text-gray-900 hover:text-green-600 transition-colors">Use Cases</Link></li>
            </ul>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link href="#" className="bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold text-base hover:bg-green-700 transition-colors">
              Try it Out
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none transition-colors"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6 transition-transform duration-300`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6 transition-transform duration-300`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`fixed inset-0 bg-white transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
          style={{ top: '64px' }}
        >
          <div className="px-4 pt-4 pb-6 space-y-4">
            <Link 
              href="#transfer" 
              className="block px-4 py-3 text-lg font-medium text-gray-900 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Transfer
            </Link>
            <Link 
              href="#security" 
              className="block px-4 py-3 text-lg font-medium text-gray-900 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Security
            </Link>
            <Link 
              href="#features" 
              className="block px-4 py-3 text-lg font-medium text-gray-900 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="#support" 
              className="block px-4 py-3 text-lg font-medium text-gray-900 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Support
            </Link>
            <Link 
              href="#use-cases" 
              className="block px-4 py-3 text-lg font-medium text-gray-900 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Use Cases
            </Link>
            <div className="pt-4">
              <Link 
                href="#" 
                className="block w-full text-center px-4 py-3 text-lg font-medium text-white bg-gray-900 hover:bg-green-700 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Try it Out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 