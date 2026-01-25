/**
 * Theme Context
 *
 * WHY Context for theme:
 * - Avoids prop drilling theme state through the entire component tree
 * - Provides a clean API for any component to access/modify theme
 * - Centralizes theme logic (localStorage sync, system preference detection)
 *
 * LEARNING NOTE: Context is ideal for "global" state that many components need,
 * like theme, auth status, or locale. For more complex state, consider Zustand or Redux.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { Theme } from '@/types';
import { THEME_STORAGE_KEY } from '@/constants';
import { isBrowser } from '@/utils';

// ============================================================================
// Types
// ============================================================================

interface ThemeContextValue {
  /** Current theme ('light' or 'dark') */
  theme: Theme;
  /** Toggle between light and dark themes */
  toggleTheme: () => void;
  /** Set a specific theme */
  setTheme: (theme: Theme) => void;
  /** Whether the current theme is dark */
  isDark: boolean;
}

interface ThemeProviderProps {
  children: ReactNode;
  /** Default theme if no preference is stored/detected */
  defaultTheme?: Theme;
}

// ============================================================================
// Context Creation
// ============================================================================

/**
 * LEARNING NOTE: We create the context with a default value.
 * This value is only used when a component tries to use the context
 * without a Provider wrapping it (which is usually a bug).
 */
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ============================================================================
// Provider Component
// ============================================================================

/**
 * Theme Provider Component
 *
 * Wraps the application to provide theme state and controls.
 * Handles:
 * - Initial theme detection (localStorage → system preference → default)
 * - Theme persistence to localStorage
 * - Syncing theme class on document element
 */
export function ThemeProvider({ children, defaultTheme = 'light' }: ThemeProviderProps) {
  /**
   * Initialize theme state
   *
   * LEARNING NOTE: We use a function initializer for useState to avoid
   * running the detection logic on every render. This is called "lazy initialization".
   */
  const [theme, setThemeState] = useState<Theme>(() => {
    if (!isBrowser()) return defaultTheme;

    // Priority: localStorage > system preference > default
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;

    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  /**
   * Sync theme to DOM and localStorage
   *
   * LEARNING NOTE: useEffect with theme dependency ensures DOM stays in sync
   * whenever theme changes, regardless of how it was changed.
   */
  useEffect(() => {
    if (!isBrowser()) return;

    // Update document class for Tailwind dark mode
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Persist to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#1c1917' : '#14b8a6');
    }
  }, [theme]);

  /**
   * Listen for system theme changes
   *
   * LEARNING NOTE: This allows the app to respond when user changes
   * their OS theme preference, but only if they haven't explicitly set a theme.
   */
  useEffect(() => {
    if (!isBrowser()) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't manually set a preference
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (!stored) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    // Modern browsers
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  /**
   * Toggle theme function
   *
   * LEARNING NOTE: useCallback memoizes the function so it doesn't change
   * on every render. This prevents unnecessary re-renders in consuming components.
   */
  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  /**
   * Set specific theme function
   */
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  /**
   * Memoized context value
   *
   * LEARNING NOTE: useMemo prevents the context value object from being
   * recreated on every render, which would cause all consumers to re-render.
   */
  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme,
      setTheme,
      isDark: theme === 'dark',
    }),
    [theme, toggleTheme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// ============================================================================
// Custom Hook
// ============================================================================

/**
 * Custom hook to access theme context
 *
 * WHY a custom hook:
 * - Provides type-safe access to the context
 * - Throws a helpful error if used outside the Provider
 * - Clean API: const { theme, toggleTheme } = useTheme();
 *
 * LEARNING NOTE: Always check for undefined context value.
 * This catches bugs where a component uses the hook but isn't wrapped in the Provider.
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
