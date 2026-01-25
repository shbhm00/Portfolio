/**
 * useLocalStorage Hook
 *
 * WHY this hook:
 * - Provides a useState-like API that automatically syncs with localStorage
 * - Handles JSON serialization/parsing
 * - Handles errors gracefully
 * - SSR-safe implementation
 *
 * LEARNING NOTE: This hook demonstrates several important patterns:
 * - Generic types for flexibility
 * - Lazy initialization for performance
 * - Error handling for robustness
 *
 * @example
 * const [name, setName] = useLocalStorage('user-name', 'Anonymous');
 */

import { useState, useCallback, useEffect } from 'react';
import { isBrowser } from '@/utils';

/**
 * Custom hook that syncs state with localStorage
 *
 * @template T - Type of the stored value
 * @param key - localStorage key
 * @param initialValue - Default value if nothing is stored
 * @returns Tuple of [value, setValue] similar to useState
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  /**
   * Initialize state from localStorage or fallback to initial value
   *
   * LEARNING NOTE: Using a function initializer (lazy initialization)
   * ensures we only read from localStorage once, not on every render.
   */
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isBrowser()) {
      return initialValue;
    }

    try {
      const item = localStorage.getItem(key);
      // Parse stored JSON or return initial value if empty
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      // If error (e.g., invalid JSON), return initial value
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * Setter function that updates both state and localStorage
   *
   * LEARNING NOTE: We accept both a value and a function (like setState)
   * to support updates based on the previous value.
   */
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        // Handle function updates (like setState)
        const valueToStore = value instanceof Function ? value(storedValue) : value;

        // Update state
        setStoredValue(valueToStore);

        // Update localStorage
        if (isBrowser()) {
          localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  /**
   * Sync with other tabs/windows
   *
   * LEARNING NOTE: The 'storage' event fires when localStorage is modified
   * in another tab. This keeps our state in sync across tabs.
   */
  useEffect(() => {
    if (!isBrowser()) return;

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(JSON.parse(event.newValue) as T);
        } catch {
          // Invalid JSON, ignore
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}
