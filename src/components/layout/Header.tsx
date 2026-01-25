/**
 * Header Component
 *
 * WHY this design:
 * - Responsive navigation with mobile hamburger menu
 * - Theme toggle integrated
 * - Sticky header with background blur on scroll
 * - Accessible keyboard navigation
 *
 * LEARNING NOTE: The header demonstrates:
 * - Conditional rendering based on scroll position
 * - Mobile-first responsive design
 * - Focus management for accessibility
 */

import { useState, useCallback, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useIsScrolled, useIsMobile } from '@/hooks';
import { NAV_LINKS, SITE_CONFIG } from '@/constants';
import { cn } from '@/utils';
import { MenuIcon, CloseIcon, SunIcon, MoonIcon } from '@/components/ui';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isScrolled = useIsScrolled(20);
  const isMobile = useIsMobile();
  const location = useLocation();

  /**
   * Close mobile menu on route change
   *
   * LEARNING NOTE: This is a common pattern - when navigation happens,
   * we want to close the mobile menu automatically.
   */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  /**
   * Prevent body scroll when mobile menu is open
   */
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  /**
   * Get active link styles
   */
  const getLinkClassName = useCallback(
    ({ isActive }: { isActive: boolean }) =>
      cn(
        'relative px-1 py-2 text-sm font-medium transition-colors',
        'hover:text-primary-500 dark:hover:text-primary-400',
        isActive ? 'text-primary-600 dark:text-primary-400' : 'text-stone-700 dark:text-stone-300'
      ),
    []
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-300',
        isScrolled
          ? 'bg-white/80 dark:bg-stone-900/80 backdrop-blur-lg shadow-soft'
          : 'bg-transparent'
      )}
    >
      <nav className="container-custom" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-display text-stone-900 dark:text-stone-50 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            aria-label={`${SITE_CONFIG.author} - Home`}
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm">
              P
            </span>
            <span className="hidden sm:block">{SITE_CONFIG.author}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Nav Links */}
            <ul className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path} className={getLinkClassName}>
                    {({ isActive }) => (
                      <>
                        {link.label}
                        {/* Active indicator */}
                        {isActive && (
                          <motion.span
                            layoutId="activeNavIndicator"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={cn(
                'p-2 rounded-xl',
                'hover:bg-stone-100 dark:hover:bg-stone-800',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                'transition-colors'
              )}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {theme === 'dark' ? (
                    <SunIcon className="w-5 h-5 text-amber-400" />
                  ) : (
                    <MoonIcon className="w-5 h-5 text-stone-600" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Theme Toggle (Mobile) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <SunIcon className="w-5 h-5 text-amber-400" />
              ) : (
                <MoonIcon className="w-5 h-5 text-stone-600" />
              )}
            </button>

            {/* Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <CloseIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-700"
          >
            <ul className="container-custom py-4 space-y-1">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      cn(
                        'block px-4 py-3 rounded-xl font-medium transition-colors',
                        isActive
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                          : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                      )
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
