/**
 * Application Constants
 *
 * WHY centralized constants:
 * - Single source of truth for configuration values
 * - Easy to update across the entire application
 * - Prevents magic strings/numbers in components
 * - Improves maintainability and reduces bugs
 */

import type { NavLink, SocialLink, Author } from '@/types';

// ============================================================================
// Site Configuration
// ============================================================================

export const SITE_CONFIG = {
  name: 'Portfolio',
  title: 'Senior Software Engineer',
  description:
    'Senior Software Engineer with 4+ years of experience building scalable mobile applications using React Native and React',
  author: 'Shubham Mishra',
  email: 'shbhm00@gmail.com',
  phone: '+91-9695919216',
  linkedin: 'https://linkedin.com/in/shbhm00',
  location: 'Noida, India',
} as const;

// ============================================================================
// Navigation
// ============================================================================

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

// ============================================================================
// Social Links
// ============================================================================

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/shbhm00',
    icon: 'github',
    label: 'View GitHub Profile',
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/shbhm00',
    icon: 'linkedin',
    label: 'Connect on LinkedIn',
  },
];

// ============================================================================
// Author Information (for blog posts)
// ============================================================================

export const DEFAULT_AUTHOR: Author = {
  name: SITE_CONFIG.author,
  avatar: '/images/avatar.jpg',
  bio: 'Senior Software Engineer with 4+ years of experience building scalable mobile applications. Expert in React Native, performance optimization, and video streaming.',
};

// ============================================================================
// Animation Configuration
// ============================================================================

/**
 * Framer Motion animation variants
 * Reusable across components for consistent animations
 */
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
} as const;

/**
 * Stagger delay calculator for list animations
 */
export const getStaggerDelay = (index: number, baseDelay = 0.1): number => {
  return index * baseDelay;
};

// ============================================================================
// Form Validation
// ============================================================================

export const VALIDATION_RULES = {
  name: {
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'-]+$/,
  },
  email: {
    // RFC 5322 compliant email regex (simplified)
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  message: {
    minLength: 10,
    maxLength: 5000,
  },
  subject: {
    minLength: 5,
    maxLength: 200,
  },
} as const;

export const VALIDATION_MESSAGES = {
  required: (field: string) => `${field} is required`,
  minLength: (field: string, min: number) => `${field} must be at least ${min} characters`,
  maxLength: (field: string, max: number) => `${field} must be less than ${max} characters`,
  email: 'Please enter a valid email address',
  name: 'Name can only contain letters, spaces, hyphens, and apostrophes',
} as const;

// ============================================================================
// Breakpoints (matching Tailwind defaults)
// ============================================================================

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// ============================================================================
// Theme
// ============================================================================

export const THEME_STORAGE_KEY = 'theme';

export const THEME_COLORS = {
  light: {
    background: '#fafaf9',
    foreground: '#1c1917',
    primary: '#14b8a6',
    accent: '#f97316',
  },
  dark: {
    background: '#1c1917',
    foreground: '#fafaf9',
    primary: '#2dd4bf',
    accent: '#fb923c',
  },
} as const;

// ============================================================================
// Routes
// ============================================================================

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  PROJECT_DETAIL: '/projects/:slug',
  BLOG: '/blog',
  BLOG_POST: '/blog/:slug',
  CONTACT: '/contact',
} as const;

/**
 * Helper to generate dynamic route paths
 */
export const getProjectPath = (slug: string): string => `/projects/${slug}`;
export const getBlogPostPath = (slug: string): string => `/blog/${slug}`;
