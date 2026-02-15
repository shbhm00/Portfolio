/**
 * ReadingProgress Component
 *
 * A fixed progress bar at the top of the page that shows
 * how far the user has scrolled through the article.
 *
 * WHY this pattern:
 * - Visual feedback for long articles
 * - Encourages reading completion
 * - Non-intrusive (thin bar at top)
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-accent-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
}

/**
 * Estimated reading time remaining based on scroll position
 */
export function useReadingProgress(totalMinutes: number) {
  const [minutesLeft, setMinutesLeft] = useState(totalMinutes);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    const scrollProgress = Math.min(scrollTop / docHeight, 1);
    setProgress(scrollProgress);
    setMinutesLeft(Math.max(1, Math.ceil(totalMinutes * (1 - scrollProgress))));
  }, [totalMinutes]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { minutesLeft, progress };
}
