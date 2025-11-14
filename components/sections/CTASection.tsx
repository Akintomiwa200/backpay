// "use client"

// import { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// declare global {
//   interface Window {
//     gtag?: (...args: any[]) => void;
//   }
// }

// gsap.registerPlugin(ScrollTrigger);

// const CTASection = () => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);
//   const buttonsRef = useRef<HTMLDivElement>(null);
//   const disclaimerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const section = sectionRef.current;
//     const content = contentRef.current;
//     const buttons = buttonsRef.current;
//     const disclaimer = disclaimerRef.current;

//     if (!section || !content || !buttons || !disclaimer) return;

//     // Animation setup (same as before)
//     gsap.fromTo(content, { opacity: 0, y: 50 }, {
//       opacity: 1,
//       y: 0,
//       duration: 1,
//       scrollTrigger: {
//         trigger: section,
//         start: "top center+=100",
//         toggleActions: "play none none reverse"
//       }
//     });

//     // Buttons animation
//     gsap.fromTo(buttons.children, { opacity: 0, y: 30 }, {
//       opacity: 1,
//       y: 0,
//       duration: 0.8,
//       stagger: 0.2,
//       scrollTrigger: {
//         trigger: buttons,
//         start: "top center+=100",
//         toggleActions: "play none none reverse"
//       }
//     });

//     // Disclaimer animation
//     gsap.fromTo(disclaimer, { opacity: 0 }, {
//       opacity: 1,
//       duration: 1,
//       delay: 0.5,
//       scrollTrigger: {
//         trigger: disclaimer,
//         start: "top center+=200",
//         toggleActions: "play none none reverse"
//       }
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, []);

//   // WhatsApp Integration Functions
//   const handleWhatsAppClick = () => {
//     // Track the click event
//     if (window.gtag) {
//       window.gtag('event', 'conversion', {
//         'send_to': 'AW-YOUR_CONVERSION_ID/LaskadCTA'
//       });
//     }

//     // Prepare the WhatsApp message
//     const phoneNumber = '2349065577709'; // Replace with your Laskad WhatsApp number
//     const message = encodeURIComponent(
//       "Hi Laskad team! I'd like to get started with your WhatsApp banking services. Can you help me with the onboarding process?"
//     );

//     // Check device type
//     const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

//     if (isMobile) {
//       // Direct deep link for mobile
//       window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
//     } else {
//       // Web version for desktop
//       window.open(
//         `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`,
//         '_blank'
//       );
//     }
//   };

//   return (
//     <section ref={sectionRef} className="bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-800 py-20 relative overflow-hidden">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
//         <div className="space-y-8">
//           <div ref={contentRef} className="space-y-4">
//             <h2 className="text-4xl lg:text-5xl font-bold text-white">
//               Ready to Transform Your Financial Life?
//             </h2>
//             <p className="text-xl text-primary-100 max-w-3xl mx-auto">
//               Join thousands of users who are already managing their finances smarter with Laskad.
//             </p>
//           </div>

//           <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
//             <button
//               onClick={handleWhatsAppClick}
//               className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center space-x-2 shadow-lg transform transition-transform hover:scale-105"
//             >
//               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
//               </svg>
//               <span>Chat with Us on WhatsApp</span>
//             </button>

//             <button
//               className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white/10 transition-colors flex items-center space-x-2 transform transition-transform hover:scale-105"
//               onClick={() => {
//                 // Track learn more click
//                 if (window.gtag) {
//                   window.gtag('event', 'click', {
//                     'event_category': 'CTA',
//                     'event_label': 'Learn More'
//                   });
//                 }
//                 // Scroll to features section or open modal
//                 document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
//               }}
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <span>Learn More</span>
//             </button>
//           </div>

//           <div ref={disclaimerRef} className="pt-8 text-primary-100 text-sm max-w-2xl mx-auto">
//             <p>
//               By using Laskad, you agree to our <a href="/terms" className="underline hover:text-white">Terms of Service</a> and <a href="/privacy" className="underline hover:text-white">Privacy Policy</a>. Laskad is a financial assistant and not a bank. Banking services are provided by our partner banks.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* WhatsApp Floating Button for Mobile */}
//       <div className="fixed bottom-6 right-6 z-50 sm:hidden">
//         <button
//           onClick={handleWhatsAppClick}
//           className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors animate-bounce"
//         >
//           <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
//           </svg>
//         </button>
//       </div>
//     </section>
//   );
// };

// export default CTASection;

'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const disclaimerRef = useRef<HTMLDivElement>(null);

  // useInView hooks for each section
  const isContentInView = useInView(contentRef, { once: false, amount: 0.3 });
  const isButtonsInView = useInView(buttonsRef, { once: false, amount: 0.3 });
  const isDisclaimerInView = useInView(disclaimerRef, {
    once: false,
    amount: 0.3,
  });

  // Animation variants
  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const buttonsContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const disclaimerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.5,
        ease: 'easeOut',
      },
    },
  };

  // WhatsApp Integration Functions
  const handleWhatsAppClick = () => {
    // Track the click event
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-YOUR_CONVERSION_ID/LaskadCTA',
      });
    }

    // Prepare the WhatsApp message
    const phoneNumber = '2349065577709'; // Replace with your Laskad WhatsApp number
    const message = encodeURIComponent(
      "Hi Laskad team! I'd like to get started with your WhatsApp banking services. Can you help me with the onboarding process?"
    );

    // Check device type
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Direct deep link for mobile
      window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
    } else {
      // Web version for desktop
      window.open(
        `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`,
        '_blank'
      );
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-800 py-20 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-8">
          <motion.div
            ref={contentRef}
            initial="hidden"
            animate={isContentInView ? 'visible' : 'hidden'}
            variants={contentVariants}
            className="space-y-4"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Ready to Transform Your Financial Life?
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Join thousands of users who are already managing their finances
              smarter with Laskad.
            </p>
          </motion.div>

          <motion.div
            ref={buttonsRef}
            initial="hidden"
            animate={isButtonsInView ? 'visible' : 'hidden'}
            variants={buttonsContainerVariants}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <motion.button
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsAppClick}
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center space-x-2 shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              <span>Chat with Us on WhatsApp</span>
            </motion.button>

            <motion.button
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white/10 transition-colors flex items-center space-x-2"
              onClick={() => {
                // Track learn more click
                if (window.gtag) {
                  window.gtag('event', 'click', {
                    event_category: 'CTA',
                    event_label: 'Learn More',
                  });
                }
                // Scroll to features section or open modal
                document
                  .getElementById('features')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Learn More</span>
            </motion.button>
          </motion.div>

          <motion.div
            ref={disclaimerRef}
            initial="hidden"
            animate={isDisclaimerInView ? 'visible' : 'hidden'}
            variants={disclaimerVariants}
            className="pt-8 text-primary-100 text-sm max-w-2xl mx-auto"
          >
            <p>
              By using Laskad, you agree to our{' '}
              <a href="/terms" className="underline hover:text-white">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="underline hover:text-white">
                Privacy Policy
              </a>
              . Laskad is a financial assistant and not a bank. Banking services
              are provided by our partner banks.
            </p>
          </motion.div>
        </div>
      </div>

      {/* WhatsApp Floating Button for Mobile */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50 sm:hidden"
      >
        <motion.button
          onClick={handleWhatsAppClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop' as const,
            ease: 'easeInOut',
          }}
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default CTASection;
