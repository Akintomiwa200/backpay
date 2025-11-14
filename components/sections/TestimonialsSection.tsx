


"use client";

import { useState, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';

// ... (your Testimonial interface and testimonials array remain the same)
// Define TypeScript interface for testimonials
interface Testimonial {
  quote: string;
  author: string;
  title: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "I've never felt so in control of my finances. Being able to check my balance, send money, and pay bills all from WhatsApp has completely changed how I manage money.",
    author: "Adebayo Johnson",
    title: "Small Business Owner",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    quote: "The way Laskad remembers my previous transactions and preferences saves me so much time. I no longer have to repeat myself or navigate complicated banking apps.",
    author: "Chiamaka Okafor",
    title: "Marketing Executive",
    image: "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=100",
  },
  {
    quote: "I was skeptical about banking through WhatsApp at first, but the security features and convenience won me over. Now I can't imagine going back to traditional banking apps.",
    author: "Emmanuel Adeyemi",
    title: "Software Engineer",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    quote: "As someone who travels frequently, having Laskad has been a game-changer. I can manage my finances from anywhere in the world with just WhatsApp.",
    author: "Fatima Bello",
    title: "Travel Blogger",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
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
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          variants={variants.heading}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their financial lives with Laskad.
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
                
              <div className="h-full bg-white bg-opacity-40 p-8 rounded">

                {/* <FaTerminal className="block w-8 text-gray-500 mb-4" /> */}
                <p className="leading-relaxed mb-6">{testimonial.quote}</p>
                <div className="inline-flex items-center">
                  <Image
                    alt="testimonial"
                    width={30}
                    height={20}
                    src={testimonial.image}
                    className="w-12 rounded-full flex-shrink-0 object-cover object-center"
                  />
                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-white">
                      {testimonial.author}
                    </span>
                    <span className="text-gray-500 text-sm uppercase">
                      {testimonial.title}
                    </span>
                  </span>
                </div>
              </div>
            
                </motion.div>
              ))}
            </div>
          </motion.div>

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

          <motion.button 
            onClick={prevTestimonial}
            className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-12 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            aria-label="Previous testimonial"
            variants={variants.navButton}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* ... SVG icon ... */}
          </motion.button>
          
          <motion.button 
            onClick={nextTestimonial}
            className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-12 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            aria-label="Next testimonial"
            variants={variants.navButtonRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* ... SVG icon ... */}
          </motion.button>
        </div>
      </div>
    </section>
  );
}