/**
 * useScrollPosition Hook
 *
 * WHY this hook:
 * - Track scroll position for sticky headers, scroll-to-top buttons, etc.
 * - Performance optimized with throttling
 * - Provides both position and direction
 *
 * LEARNING NOTE: Scroll events fire very frequently, so we use throttling
 * to limit how often we update state. This prevents performance issues.
 *
 * @example
 * const { y, direction, isAtTop, isScrolled } = useScrollPosition();
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { isBrowser } from '@/utils';

interface ScrollPosition {
  /** Current scroll X position */
  x: number;
  /** Current scroll Y position */
  y: number;
  /** Scroll direction: 'up', 'down', or null (not scrolling) */
  direction: 'up' | 'down' | null;
  /** Whether the page is scrolled to the top */
  isAtTop: boolean;
  /** Whether the page has been scrolled (useful for header shadow) */
  isScrolled: boolean;
}

interface UseScrollPositionOptions {
  /** Throttle delay in ms (default: 100) */
  throttleMs?: number;
  /** Threshold in pixels to consider "scrolled" (default: 10) */
  scrolledThreshold?: number;
}

export function useScrollPosition(options: UseScrollPositionOptions = {}): ScrollPosition {
  const { throttleMs = 100, scrolledThreshold = 10 } = options;

  const [position, setPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: null,
    isAtTop: true,
    isScrolled: false,
  });

  /**
   * Use refs to track values without triggering re-renders
   *
   * LEARNING NOTE: Refs are perfect for values we need to read
   * in event handlers but don't need to cause re-renders.
   */
  const lastY = useRef(0);
  const ticking = useRef(false);

  const updatePosition = useCallback(() => {
    const currentY = window.scrollY;
    const currentX = window.scrollX;

    setPosition({
      x: currentX,
      y: currentY,
      direction: currentY > lastY.current ? 'down' : currentY < lastY.current ? 'up' : null,
      isAtTop: currentY === 0,
      isScrolled: currentY > scrolledThreshold,
    });

    lastY.current = currentY;
    ticking.current = false;
  }, [scrolledThreshold]);

  useEffect(() => {
    if (!isBrowser()) return;

    /**
     * Throttled scroll handler using requestAnimationFrame
     *
     * LEARNING NOTE: requestAnimationFrame is better than setTimeout for
     * scroll handlers because it syncs with the browser's repaint cycle.
     */
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // Additional throttle with setTimeout
          setTimeout(updatePosition, throttleMs);
        });
        ticking.current = true;
      }
    };

    // Set initial position
    updatePosition();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [throttleMs, updatePosition]);

  return position;
}

/**
 * Simplified hook that just returns whether page is scrolled
 * Useful for header shadow effects
 */
export function useIsScrolled(threshold = 10): boolean {
  const { isScrolled } = useScrollPosition({ scrolledThreshold: threshold });
  return isScrolled;
}
