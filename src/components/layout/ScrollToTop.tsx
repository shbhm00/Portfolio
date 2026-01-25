/**
 * ScrollToTop Component
 *
 * WHY this design:
 * - Appears when user scrolls down
 * - Smooth scroll to top
 * - Accessible with keyboard support
 * - Smooth entrance/exit animation
 */

import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '@/hooks';
import { ChevronRightIcon } from '@/components/ui';

export function ScrollToTop() {
  const { y } = useScrollPosition();

  // Show button after scrolling 400px
  const isVisible = y > 400;

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          aria-label="Scroll to top"
        >
          <ChevronRightIcon className="w-5 h-5 -rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
