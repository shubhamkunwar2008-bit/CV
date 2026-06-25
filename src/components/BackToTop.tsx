import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle button visibility when scrolled past 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check once on initial mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG parameters for scroll progress indicator
  const radius = 22;
  const stroke = 2.5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="back-to-top-btn"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-charcoal-800 text-dusty-blue-600 dark:text-sage-400 hover:text-dusty-blue-700 dark:hover:text-sage-300 shadow-lg shadow-dusty-blue-500/10 dark:shadow-black/40 border border-dusty-blue-100 dark:border-charcoal-700 transition-colors duration-200 cursor-pointer no-print focus:outline-none focus:ring-2 focus:ring-dusty-blue-500 dark:focus:ring-sage-400 group"
          aria-label="Scroll back to top of page"
        >
          {/* Circular Progress Ring */}
          <svg
            className="absolute -rotate-90 w-11 h-11 pointer-events-none"
            width="44"
            height="44"
          >
            <circle
              className="text-dusty-blue-100/20 dark:text-charcoal-700/20"
              stroke="currentColor"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx="22"
              cy="22"
            />
            <circle
              className="text-dusty-blue-500 dark:text-sage-500"
              stroke="currentColor"
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              r={normalizedRadius}
              cx="22"
              cy="22"
              style={{ transition: 'stroke-dashoffset 0.05s ease-out' }}
            />
          </svg>

          {/* Arrow Up Icon */}
          <ArrowUp className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 stroke-[2.5]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
