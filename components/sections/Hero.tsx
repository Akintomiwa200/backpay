// 'use client';

// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Image from 'next/image';

// gsap.registerPlugin(ScrollTrigger);

// export default function Hero() {
//   const sectionRef = useRef(null);
//   const headingRef = useRef(null);
//   const contentRef = useRef(null);
//   const phoneRef = useRef(null);

//   useEffect(() => {
//     const section = sectionRef.current;
//     const heading = headingRef.current;
//     const content = contentRef.current;
//     const phone = phoneRef.current;

//     // Initial animation
//     gsap.fromTo(
//       heading,
//       { opacity: 0, y: 50 },
//       { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
//     );

//     gsap.fromTo(
//       content,
//       { opacity: 0, y: 30 },
//       { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
//     );

//     gsap.fromTo(
//       phone,
//       { opacity: 0, x: 50 },
//       { opacity: 1, x: 0, duration: 1, delay: 0.6, ease: 'power3.out' }
//     );

//     // Scroll-triggered animations
//     ScrollTrigger.create({
//       trigger: section,
//       start: 'top center',
//       end: 'bottom center',
//       onEnter: () => {
//         gsap.to(phone, {
//           y: 20,
//           duration: 1.5,
//           ease: 'power1.inOut',
//           yoyo: true,
//           repeat: -1,
//         });
//       },
//       onLeave: () => {
//         gsap.killTweensOf(phone);
//       },
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative bg-gradient-to-b from-white to-primary-50 dark:from-gray-900 dark:to-gray-800 pt-20 pb-32 overflow-hidden"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left Content */}
//           <div className="space-y-8 lg:pr-12">
//             <div ref={headingRef} className="space-y-5">
//               <div className="inline-block">
//                 <span className="bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wide">
//                   AI-Powered Finance Assistant
//                 </span>
//               </div>

//               <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
//                 Banking Made{' '}
//                 <span className="text-primary-600 dark:text-primary-400">Simple</span>{' '}
//                 Through WhatsApp
//               </h1>

//               <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
//                 Laskad transforms your WhatsApp into a powerful financial
//                 assistant that helps you manage money, make payments, and track
//                 expenses — all through natural conversation.
//               </p>
//             </div>

//             <div ref={contentRef} className="flex flex-wrap items-center gap-4">
//               <Button
//                 size="lg"
//                 className="text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
//                 onClick={() => {
//                   const message = encodeURIComponent(
//                     "Hi, I'd like to get started with Laskad!"
//                   );
//                   window.open(
//                     `https://wa.me/2349065577709?text=Hi`,
//                     '_blank'
//                   );
//                 }}
//               >
//                 Get Started
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="bg-white text-gray-700 hover:bg-gray-100 dark:bg-transparent"
//                 onClick={() => {

//                   window.open(
//                     `/watchdemo`,
//                     '_blank'
//                   );}}
//               >
//                 <span className="mr-2">
//                   <svg
//                     className="w-5 h-5"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M8 5v14l11-7z" />
//                   </svg>
//                 </span>
//                 Watch Demo
//               </Button>
//             </div>

//             <div className="pt-4">
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 Trusted by over <span className="font-medium">10,000+</span>{' '}
//                 users and growing
//               </p>
//               <div className="flex space-x-6 mt-4">
//                 {/* Partner logos would go here */}
//                 {/* <div className="h-8 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
//                   <div className="h-full w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
//                 </div>
//                 <div className="h-8 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
//                   <div className="h-full w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
//                 </div>
//                 <div className="h-8 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
//                   <div className="h-full w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
//                 </div> */}

//                 <div className="h-8 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
//                   <img
//                     src="/images/banks/visa.svg"
//                     alt="Visa"
//                     className="h-full w-auto object-contain"
//                   />
//                 </div>
//                 <div className="h-8 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
//                   <img
//                     src="/images/banks/mastercard.svg"
//                     alt="Mastercard"
//                     className="h-full w-auto object-contain"
//                   />
//                 </div>
//                 <div className="h-8 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
//                   <img
//                     src="/images/banks/browser-certificate-ssl.svg"
//                     alt="SSL Secured"
//                     className="h-full w-auto object-contain"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Content - Hero Illustration/Phone */}
//           <div
//             ref={phoneRef}
//             className="relative lg:ml-auto flex justify-center lg:justify-end"
//           >
//             <div className="relative w-80 h-[600px]">
//               {/* Phone Frame */}
//               <div className="absolute inset-0 bg-black rounded-[3rem] shadow-2xl transform transition duration-500 hover:scale-105">
//                 <div className="absolute inset-2 bg-black rounded-[2.5rem] overflow-hidden">
//                   {/* Screen Content */}
//                   <div className="h-full bg-gradient-to-b from-primary-900 to-black text-white relative">
//                     {/* Status Bar */}
//                     <div className="flex justify-between items-center px-6 pt-4 text-sm">
//                       <span>9:41</span>
//                       <div className="flex items-center space-x-1">
//                         <div className="w-4 h-2 bg-white rounded-sm"></div>
//                         <div className="w-6 h-2 bg-white rounded-sm"></div>
//                         <div className="w-6 h-3 border border-white rounded-sm">
//                           <div className="w-4 h-2 bg-white rounded-sm ml-0.5 mt-0.5"></div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* App Interface */}
//                     <div className="pt-6 px-6">
//                       <div className="flex items-center">
//                         <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-md font-bold">
//                           L
//                         </div>
//                         <div className="ml-4">
//                           <div className="font-medium">Laskad</div>
//                           <div className="text-xs text-primary-300">
//                             Your financial assistant
//                           </div>
//                         </div>
//                       </div>

//                       <div className="mt-8 space-y-4">
//                         <div className="bg-primary-800 bg-opacity-40 p-4 rounded-2xl">
//                           <p className="text-sm font-medium">Current Balance</p>
//                           <p className="text-2xl font-bold mt-1">₦124,500.00</p>
//                           <div className="flex justify-between mt-4 text-xs text-primary-200">
//                             <span>GTBank</span>
//                             <span>••••4567</span>
//                           </div>
//                         </div>

//                         <div className="mt-6">
//                           <p className="text-sm font-medium mb-3">
//                             Quick Actions
//                           </p>
//                           <div className="grid grid-cols-4 gap-2">
//                             {['Send', 'Request', 'Bills', 'More'].map(
//                               (action, i) => (
//                                 <div
//                                   key={i}
//                                   className="flex flex-col items-center"
//                                 >
//                                   <div className="w-12 h-12 bg-primary-700 bg-opacity-50 rounded-full flex items-center justify-center mb-1">
//                                     <span className="text-xs"></span>
//                                   </div>
//                                   <span className="text-xs">{action}</span>
//                                 </div>
//                               )
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="absolute bottom-0 left-0 right-0 p-6">
//                       <div className="flex items-center space-x-2 bg-primary-800 bg-opacity-40 rounded-full px-4 py-3">
//                         <svg
//                           className="w-5 h-5 text-primary-300"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M12 4v16m8-8H4"
//                           />
//                         </svg>
//                         <input
//                           type="text"
//                           placeholder="How can I help with your finances?"
//                           className="flex-1 bg-transparent text-white placeholder-primary-300 text-sm outline-none"
//                         />
//                         <svg
//                           className="w-5 h-5 text-primary-300"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                           />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Floating Elements */}
//               <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
//                     <span className="text-white text-xs font-bold">✓</span>
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-900 dark:text-white text-sm">
//                       Payment Sent
//                     </p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       ₦2,000 to Abdulsemu
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="absolute -bottom-2 -left-10 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center px-2 py-1 space-x-[-12px] z-10">
//                 {/* Moniepoint (primary) */}
//                 <span className="inline-flex w-12 h-12 rounded-full bg-white justify-center items-center shadow-md">
//                   <Image
//                     src="/images/banks/moniepoint.svg" // Path to your image in public folder
//                     alt="Moniepoint"
//                     width={28}
//                     height={28}
//                     className="object-contain"
//                   />
//                 </span>

//                 {/* Logo 2 (Orange Diamond) */}
//                 <span className="inline-flex w-12 h-12 rounded-full bg-orange-50 justify-center items-center shadow-md">
//                   <Image
//                     src="/images/banks/access-bank-plc.svg"
//                     alt="Orange Diamond"
//                     width={28}
//                     height={28}
//                     className="object-contain"
//                   />
//                 </span>

//                 {/* Logo 3 (Green Circle) */}
//                 <span className="inline-flex w-12 h-12 rounded-full bg-green-50 justify-center items-center shadow-md">
//                   <Image
//                     src="/images/banks/OPay.svg"
//                     alt="Green Circle"
//                     width={28}
//                     height={28}
//                     className="object-contain"
//                   />
//                 </span>
//               </div>

//               <div className="absolute -left-10 top-1/4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 max-w-[180px]">
//                 <div className="text-xs text-gray-500 dark:text-gray-400">
//                   Monthly Savings
//                 </div>
//                 <div className="flex items-end">
//                   <div className="text-xl font-bold text-gray-900 dark:text-white">
//                     ₦45,000
//                   </div>
//                   <div className="text-xs text-green-500 ml-2 font-medium">
//                     +12%
//                   </div>
//                 </div>
//                 <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full mt-2">
//                   <div className="h-2 bg-primary-500 rounded-full w-3/4"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Background Decorations */}
//       <div className="absolute top-0 left-0 right-0 h-full overflow-hidden -z-10 opacity-20 dark:opacity-10">
//         <div className="absolute top-0 left-0 w-96 h-96 bg-primary-400 rounded-full filter blur-3xl"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl"></div>
//       </div>
//     </section>
//   );
// }

'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const phoneRef = useRef(null);

  const isInView = useInView(sectionRef, { once: false, amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const phoneVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        delay: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const floatAnimation = {
    y: [0, 20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'loop' as const,
      ease: 'easeInOut',
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="relative bg-gradient-to-b from-white to-primary-50 dark:from-gray-900 dark:to-gray-800 pt-20 pb-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 lg:pr-12">
            <motion.div
              ref={headingRef}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-5"
            >
              <motion.div variants={itemVariants} className="inline-block">
                <span className="bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wide">
                  AI-Powered Finance Assistant
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-xl lg:text-4xl xl:text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white"
              >
                Banking without apps, just a chat, a voice note, or a photo via{' '}
                <span className="text-primary-600 dark:text-primary-400">
                  WhatsApp
                </span>{' '}
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                Laskad is a WhatsApp-based financial assistant designed to
                simplify everyday transactions and bring banking-level
                functionality into a familiar, simple platform.
              </motion.p>
            </motion.div>

            <motion.div
              ref={contentRef}
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4"
            >
              <Button
                size="lg"
                className="text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
                onClick={() => {
                  const message = encodeURIComponent(
                    "Hi, I'd like to get started with Laskad!"
                  );
                  window.open('https://wa.me/2349065577709?text=Hi', '_blank');
                }}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-gray-700 hover:bg-gray-100 dark:bg-transparent"
                onClick={() => {
                  window.open('/watchdemo', '_blank');
                }}
              >
                <span className="mr-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                Watch Demo
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Trusted by over <span className="font-medium">10,000+</span>{' '}
                users and growing
              </p>
              <div className="flex space-x-6 mt-4">
                <div className="h-8 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                  <img
                    src="/images/banks/visa.svg"
                    alt="Visa"
                    className="h-full w-auto object-contain"
                  />
                </div>
                <div className="h-8 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                  <img
                    src="/images/banks/mastercard.svg"
                    alt="Mastercard"
                    className="h-full w-auto object-contain"
                  />
                </div>
                <div className="h-8 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                  <img
                    src="/images/banks/browser-certificate-ssl.svg"
                    alt="SSL Secured"
                    className="h-full w-auto object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Hero Illustration/Phone */}
          <motion.div
            ref={phoneRef}
            variants={phoneVariants}
            animate={isInView ? ['visible', 'float'] : 'hidden'}
            className="relative lg:ml-auto flex justify-center lg:justify-end"
          >
            <motion.div
              className="relative w-80 h-[600px]"
              variants={{}}
              custom={0}
            >
              {/* Phone Frame */}
              <div className="absolute inset-0 bg-black rounded-[3rem] shadow-2xl transform transition duration-500 hover:scale-105">
                <div className="absolute inset-2 bg-black rounded-[2.5rem] overflow-hidden">
                  {/* Screen Content */}
                  <div className="h-full bg-gradient-to-b from-primary-900 to-black text-white relative">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center px-6 pt-4 text-sm">
                      <span>9:41</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-2 bg-white rounded-sm"></div>
                        <div className="w-6 h-2 bg-white rounded-sm"></div>
                        <div className="w-6 h-3 border border-white rounded-sm">
                          <div className="w-4 h-2 bg-white rounded-sm ml-0.5 mt-0.5"></div>
                        </div>
                      </div>
                    </div>

                    {/* App Interface */}
                    <div className="pt-6 px-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-md font-bold">
                          L
                        </div>
                        <div className="ml-4">
                          <div className="font-medium">Laskad</div>
                          <div className="text-xs text-primary-300">
                            Your financial assistant
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 space-y-4">
                        <div className="bg-primary-800 bg-opacity-40 p-4 rounded-2xl">
                          <p className="text-sm font-medium">Current Balance</p>
                          <p className="text-2xl font-bold mt-1">₦124,500.00</p>
                          <div className="flex justify-between mt-4 text-xs text-primary-200">
                            <span>GTBank</span>
                            <span>••••4567</span>
                          </div>
                        </div>

                        <div className="mt-6">
                          <p className="text-sm font-medium mb-3">
                            Quick Actions
                          </p>
                          <div className="grid grid-cols-4 gap-2">
                            {['Send', 'Request', 'Bills', 'More'].map(
                              (action, i) => (
                                <div
                                  key={i}
                                  className="flex flex-col items-center"
                                >
                                  <div className="w-12 h-12 bg-primary-700 bg-opacity-50 rounded-full flex items-center justify-center mb-1">
                                    <span className="text-xs"></span>
                                  </div>
                                  <span className="text-xs">{action}</span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center space-x-2 bg-primary-800 bg-opacity-40 rounded-full px-4 py-3">
                        <svg
                          className="w-5 h-5 text-primary-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        <input
                          type="text"
                          placeholder="How can I help with your finances?"
                          className="flex-1 bg-transparent text-white placeholder-primary-300 text-sm outline-none"
                        />
                        <svg
                          className="w-5 h-5 text-primary-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.8, duration: 0.8 },
                }}
                className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      Payment Sent
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      ₦2,000 to Abdulsemu
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: 1, duration: 0.8 },
                }}
                className="absolute -bottom-2 -left-10 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center px-2 py-1 space-x-[-12px] z-10"
              >
                <span className="inline-flex w-12 h-12 rounded-full bg-white justify-center items-center shadow-md">
                  <Image
                    src="/images/banks/moniepoint.svg"
                    alt="Moniepoint"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </span>
                <span className="inline-flex w-12 h-12 rounded-full bg-orange-50 justify-center items-center shadow-md">
                  <Image
                    src="/images/banks/access-bank-plc.svg"
                    alt="Orange Diamond"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </span>
                <span className="inline-flex w-12 h-12 rounded-full bg-green-50 justify-center items-center shadow-md">
                  <Image
                    src="/images/banks/OPay.svg"
                    alt="Green Circle"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.9, duration: 0.8 },
                }}
                className="absolute -left-10 top-1/4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 max-w-[180px]"
              >
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Monthly Savings
                </div>
                <div className="flex items-end">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    ₦45,000
                  </div>
                  <div className="text-xs text-green-500 ml-2 font-medium">
                    +12%
                  </div>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full mt-2">
                  <div className="h-2 bg-primary-500 rounded-full w-3/4"></div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 right-0 h-full overflow-hidden -z-10 opacity-20 dark:opacity-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 1 },
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-primary-400 rounded-full filter blur-3xl"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 1, delay: 0.3 },
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl"
        ></motion.div>
      </div>
    </motion.section>
  );
}
