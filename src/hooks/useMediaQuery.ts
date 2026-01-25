/**
 * useMediaQuery Hook
 *
 * WHY this hook:
 * - Provides a clean way to respond to media query changes in React
 * - Useful for responsive behavior that can't be achieved with CSS alone
 * - Handles SSR safely by defaulting to false
 *
 * LEARNING NOTE: This is a great example of a custom hook that wraps
 * browser APIs and integrates them with React's lifecycle.
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
 */

import { useState, useEffect } from 'react';
import { isBrowser } from '@/utils';

/**
 * Hook to track a CSS media query
 * @param query - CSS media query string
 * @returns boolean indicating if the query matches
 */
export function useMediaQuery(query: string): boolean {
  /**
   * Initialize with false for SSR safety
   *
   * LEARNING NOTE: We can't call matchMedia on the server, so we
   * default to false and update on mount. This prevents hydration mismatches.
   */
  const [matches, setMatches] = useState<boolean>(() => {
    if (!isBrowser()) return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (!isBrowser()) return;

    // Create media query list
    const mediaQueryList = window.matchMedia(query);

    // Set initial value (in case it changed between render and effect)
    setMatches(mediaQueryList.matches);

    /**
     * Event handler for media query changes
     *
     * LEARNING NOTE: MediaQueryListEvent has a 'matches' property
     * that tells us the new state of the query.
     */
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener (modern API)
    mediaQueryList.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]); // Re-run if query changes

  return matches;
}

// ============================================================================
// Convenience Hooks (built on useMediaQuery)
// ============================================================================

/**
 * Hook to check if viewport is mobile size
 * Uses Tailwind's sm breakpoint (640px)
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 639px)');
}

/**
 * Hook to check if viewport is tablet size or smaller
 * Uses Tailwind's md breakpoint (768px)
 */
export function useIsTablet(): boolean {
  return useMediaQuery('(max-width: 767px)');
}

/**
 * Hook to check if viewport is desktop size
 * Uses Tailwind's lg breakpoint (1024px)
 */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

/**
 * Hook to check user's motion preference
 *
 * LEARNING NOTE: This is important for accessibility!
 * Some users experience discomfort with animations.
 * Use this to disable or reduce motion when preferred.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
