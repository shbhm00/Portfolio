/**
 * Layout Component
 *
 * WHY this design:
 * - Consistent page structure across all routes
 * - Header and Footer included once
 * - Main content area with proper semantic HTML
 * - Skip to main content link for accessibility
 *
 * LEARNING NOTE: The layout component is a great place to handle
 * common page elements that shouldn't be re-rendered on navigation.
 */

import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';

/**
 * Page transition animation variants
 */
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-900">
      {/* 
        Skip to main content link
        LEARNING NOTE: This is crucial for keyboard users - allows them to
        skip past the navigation directly to the main content.
      */}
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to main content
      </a>

      <Header />

      {/* Main content with route transitions */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          id="main-content"
          className="flex-grow pt-16 md:pt-20"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageVariants}
          tabIndex={-1}
        >
          {/* 
            Outlet renders the matched child route component
            LEARNING NOTE: This is how React Router v6+ handles nested routes.
            The Layout is the parent route, and pages are child routes.
          */}
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
}
