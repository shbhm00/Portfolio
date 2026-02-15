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
import { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';

/**
 * Scrolls the window to the top on every route change.
 * This ensures navigating to a new page always starts from the top.
 */
function ScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function Layout() {
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

      <ScrollRestoration />
      <Header />

      {/* Main content */}
      <main id="main-content" className="flex-grow pt-16 md:pt-20" tabIndex={-1}>
        {/* 
          Outlet renders the matched child route component
          LEARNING NOTE: This is how React Router v6+ handles nested routes.
          The Layout is the parent route, and pages are child routes.
        */}
        <Outlet />
      </main>

      <Footer />

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
}
