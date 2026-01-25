/**
 * 404 Not Found Page
 *
 * WHY this design:
 * - Clear messaging that the page doesn't exist
 * - Helpful navigation options
 * - Maintains brand consistency
 * - Friendly tone to reduce frustration
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, ArrowRightIcon } from '@/components/ui';

export function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* Large 404 */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mb-8"
        >
          <span className="text-[10rem] md:text-[12rem] font-display font-bold text-stone-200 dark:text-stone-800 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl md:text-7xl">🔍</span>
          </div>
        </motion.div>

        {/* Message */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-display text-stone-900 dark:text-stone-50 mb-4"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-stone-600 dark:text-stone-400 mb-8"
        >
          Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on
          track.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button
            as="a"
            href="/"
            variant="primary"
            rightIcon={<ArrowRightIcon className="w-4 h-4" />}
          >
            Go Home
          </Button>
          <Button as="a" href="/projects" variant="secondary">
            View Projects
          </Button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-700"
        >
          <p className="text-sm text-stone-500 dark:text-stone-500 mb-4">
            Or try one of these pages:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'About', path: '/about' },
              { label: 'Projects', path: '/projects' },
              { label: 'Blog', path: '/blog' },
              { label: 'Contact', path: '/contact' },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
