"use client";

import { useState, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';

// Define TypeScript interface for testimonials
interface Testimonial {
  quote: string;
  author: string;
  title: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Sending crypto through WhatsApp has been a game-changer. I can now help my family abroad instantly without worrying about bank fees or exchange rates.",
    author: "Adebayo Johnson",
    title: "Crypto Trader",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    quote: "As a freelancer working with international clients, BackPay has simplified my life. Getting paid in crypto and managing it through WhatsApp is incredibly convenient.",
    author: "Chiamaka Okafor",
    title: "Freelance Developer",
    image: "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=100",
  },
  {
    quote: "The security features gave me confidence to try crypto transactions. Having my private keys encrypted and transactions on the blockchain makes me feel safe using BackPay daily.",
    author: "Emmanuel Adeyemi",
    title: "Blockchain Engineer",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    quote: "I travel constantly for work, and BackPay lets me manage my crypto portfolio from anywhere. No more worrying about carrying hardware wallets or accessing exchanges.",
    author: "Fatima Bello",
    title: "Digital Nomad",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    quote: "The gas fee optimization tips have saved me hundreds in transaction costs. BackPay's smart suggestions make Web3 accessible to everyone.",
    author: "David Chen",
    title: "DeFi Enthusiast",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    quote: "Being able to check my portfolio and make trades through simple WhatsApp commands has revolutionized how I interact with crypto. It's like having a personal Web3 assistant.",
    author: "Sarah Martinez",
    title: "Crypto Investor",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
];

// Properly typed animation variants
const variants: Record<string, Variants> = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  },
  heading: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1, 
        ease: "easeOut" 
      }
    }
  },
  control: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    }
  },
  navButton: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    }
  },
  navButtonRight: {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    }
  }
};

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          variants={variants.heading}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Web3 Pioneers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of crypto enthusiasts who are revolutionizing finance with BackPay through WhatsApp.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div 
            className="overflow-hidden"
            variants={variants.container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
              {testimonials.map((testimonial, i) => (
                <motion.div 
                  key={i} 
                  className="w-full flex-shrink-0 px-4"
                  variants={variants.item}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 h-full border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                    {/* Crypto-themed icon */}
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-6">
                      <span className="text-blue-600 dark:text-blue-400 text-lg">₿</span>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                      "{testimonial.quote}"
                    </p>
                    
                    <div className="flex items-center">
                      <Image
                        alt={testimonial.author}
                        width={48}
                        height={48}
                        src={testimonial.image}
                        className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center border-2 border-blue-200 dark:border-blue-800"
                      />
                      <div className="flex-grow flex flex-col pl-4">
                        <span className="title-font font-semibold text-gray-900 dark:text-white">
                          {testimonial.author}
                        </span>
                        <span className="text-blue-600 dark:text-blue-400 text-sm">
                          {testimonial.title}
                        </span>
                      </div>
                      {/* Small crypto badge */}
                      <div className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full">
                        <span className="text-green-600 dark:text-green-400 text-xs font-medium">
                          Crypto User
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Navigation Dots */}
          <motion.div 
            className="flex justify-center mt-8 space-x-2"
            variants={variants.container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === activeIndex 
                    ? "bg-blue-600 dark:bg-blue-400" 
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
                variants={variants.control}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </motion.div>

          {/* Navigation Buttons */}
          <motion.button 
            onClick={prevTestimonial}
            className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-12 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none border border-gray-200 dark:border-gray-600"
            aria-label="Previous testimonial"
            variants={variants.navButton}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.button 
            onClick={nextTestimonial}
            className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-12 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none border border-gray-200 dark:border-gray-600"
            aria-label="Next testimonial"
            variants={variants.navButtonRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center"
          variants={variants.container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            { number: "5,000+", label: "Active Users" },
            { number: "$15M+", label: "Volume Processed" },
            { number: "50+", label: "Countries" },
            { number: "99.9%", label: "Uptime" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
              variants={variants.item}
            >
              <div className="text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}