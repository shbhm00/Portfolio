/**
 * TableOfContents Component
 *
 * A sticky sidebar/collapsible TOC that highlights the current section
 * as the user scrolls through the article.
 *
 * WHY this design:
 * - Improves navigation for long posts
 * - Shows article structure at a glance
 * - Active section tracking for context
 * - Responsive: sidebar on desktop, collapsible on mobile
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TocHeading } from './MarkdownContent';

interface TableOfContentsProps {
  headings: TocHeading[];
}

/**
 * Desktop sticky TOC (sidebar)
 */
export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  // Track which heading is currently visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    );

    for (const heading of headings) {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  if (headings.length < 3) return null;

  return (
    <nav className="hidden xl:block" aria-label="Table of contents">
      <div className="sticky top-28">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-4">
          On this page
        </p>
        <ul className="space-y-1 max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hide">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => handleClick(heading.id)}
                className={`block w-full text-left text-sm py-1.5 transition-all duration-200 border-l-2 ${
                  heading.level === 1 ? 'pl-3' : heading.level === 2 ? 'pl-5' : 'pl-7'
                } ${
                  activeId === heading.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400 font-medium'
                    : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 hover:border-stone-300 dark:hover:border-stone-600'
                }`}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/**
 * Mobile TOC (collapsible)
 */
export function MobileTableOfContents({ headings }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback((id: string) => {
    setIsOpen(false);
    // Small delay for the collapse animation
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 100);
  }, []);

  if (headings.length < 3) return null;

  return (
    <div className="xl:hidden mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full px-4 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
      >
        <svg
          className="w-5 h-5 text-primary-500"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        <span className="font-medium text-sm">Table of Contents</span>
        <svg
          className={`w-4 h-4 ml-auto transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <ul className="mt-2 space-y-0.5 bg-stone-50 dark:bg-stone-800/50 rounded-xl p-3">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <button
                    onClick={() => handleClick(heading.id)}
                    className={`block w-full text-left text-sm py-1.5 px-3 rounded-lg text-stone-600 dark:text-stone-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-stone-100 dark:hover:bg-stone-700/50 transition-colors ${
                      heading.level === 1 ? '' : heading.level === 2 ? 'pl-6' : 'pl-9'
                    }`}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
