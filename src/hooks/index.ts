/**
 * Hooks Index
 *
 * WHY a barrel export:
 * - Single import point for all custom hooks
 * - Cleaner import statements in components
 * - Easy to see all available hooks at a glance
 *
 * @example
 * import { useMediaQuery, useLocalStorage, useScrollPosition } from '@/hooks';
 */

export {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  usePrefersReducedMotion,
} from './useMediaQuery';
export { useLocalStorage } from './useLocalStorage';
export { useScrollPosition, useIsScrolled } from './useScrollPosition';
export { useForm } from './useForm';
