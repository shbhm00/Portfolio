/**
 * Utility Functions
 *
 * WHY centralized utilities:
 * - Reusable helper functions across the application
 * - Tested and reliable implementations
 * - Keeps components clean and focused on rendering
 */

// ============================================================================
// String Utilities
// ============================================================================

/**
 * Capitalizes the first letter of a string
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Converts a string to a URL-friendly slug
 */
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Truncates text to a specified length with ellipsis
 */
export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length).trim() + '...';
};

// ============================================================================
// Date Utilities
// ============================================================================

/**
 * Formats a date string to a readable format
 * @example formatDate('2024-01-15') => 'January 15, 2024'
 */
export const formatDate = (
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};

/**
 * Formats a date range (e.g., for work experience)
 * @example formatDateRange('2022-01', '2024-06') => 'Jan 2022 - Jun 2024'
 * @example formatDateRange('2022-01') => 'Jan 2022 - Present'
 */
export const formatDateRange = (startDate: string, endDate?: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
  const start = new Date(startDate).toLocaleDateString('en-US', options);
  const end = endDate ? new Date(endDate).toLocaleDateString('en-US', options) : 'Present';
  return `${start} - ${end}`;
};

/**
 * Calculates reading time for a text
 * Assumes average reading speed of 200 words per minute
 */
export const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// ============================================================================
// DOM Utilities
// ============================================================================

/**
 * Combines multiple class names, filtering out falsy values
 * Alternative to libraries like clsx or classnames
 *
 * @example cn('base-class', isActive && 'active', className)
 */
export const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Scrolls to an element with smooth animation
 */
export const scrollToElement = (elementId: string, offset = 0): void => {
  const element = document.getElementById(elementId);
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

/**
 * Checks if we're in a browser environment
 * Useful for SSR compatibility
 */
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

// ============================================================================
// Validation Utilities
// ============================================================================

/**
 * Validates an email address format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Checks if a string is empty or only whitespace
 */
export const isEmpty = (value: string | undefined | null): boolean => {
  return value === undefined || value === null || value.trim() === '';
};

// ============================================================================
// Array Utilities
// ============================================================================

/**
 * Groups an array of objects by a key
 *
 * @example
 * const items = [{ category: 'A', name: 'Item 1' }, { category: 'B', name: 'Item 2' }];
 * groupBy(items, 'category') => { A: [...], B: [...] }
 */
export const groupBy = <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> => {
  return array.reduce(
    (result, item) => {
      const groupKey = String(item[key]);
      result[groupKey] ??= [];
      result[groupKey].push(item);
      return result;
    },
    {} as Record<string, T[]>
  );
};

/**
 * Returns unique values from an array
 */
export const unique = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

/**
 * Shuffles an array (Fisher-Yates algorithm)
 */
export const shuffle = <T>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j]!, result[i]!];
  }
  return result;
};

// ============================================================================
// Async Utilities
// ============================================================================

/**
 * Creates a delay promise (useful for testing loading states)
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Debounces a function call
 * Useful for search inputs, resize handlers, etc.
 */
export const debounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

// ============================================================================
// Storage Utilities
// ============================================================================

/**
 * Safe localStorage getter with JSON parsing
 */
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (!isBrowser()) return defaultValue;

  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
};

/**
 * Safe localStorage setter with JSON stringification
 */
export const setToStorage = <T>(key: string, value: T): void => {
  if (!isBrowser()) return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};
