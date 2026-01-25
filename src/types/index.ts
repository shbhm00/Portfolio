/**
 * Centralized Type Definitions
 *
 * WHY centralized types:
 * - Single source of truth for data structures
 * - Easy to maintain and update
 * - Enables TypeScript's full power for type checking
 * - Facilitates code reuse across components
 */

// ============================================================================
// Project Types
// ============================================================================

/**
 * Project status enum for type-safe status handling
 * Using const assertion for literal types
 */
export const PROJECT_STATUS = {
  COMPLETED: 'completed',
  IN_PROGRESS: 'in-progress',
  PLANNED: 'planned',
} as const;

export type ProjectStatus = (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS];

/**
 * Technology/skill used in projects
 * Separate interface for extensibility (could add icon, category, etc.)
 */
export interface Technology {
  name: string;
  color?: string;
}

/**
 * Project data structure
 * Used for portfolio project cards and detail pages
 */
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  technologies: Technology[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  status: ProjectStatus;
  featured: boolean;
  startDate: string;
  endDate?: string;
}

// ============================================================================
// Blog Types
// ============================================================================

/**
 * Blog post structure
 * Designed to be scalable - could easily connect to a CMS
 */
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number; // in minutes
  tags: string[];
  featured: boolean;
}

export interface Author {
  name: string;
  avatar: string;
  bio?: string;
}

// ============================================================================
// Experience & Skills Types
// ============================================================================

/**
 * Work experience entry
 * Used in the About page timeline
 */
export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string; // undefined means "Present"
  description: string;
  achievements: string[];
  technologies: string[];
}

/**
 * Skill category for organized skill display
 */
export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: SkillLevel;
  yearsOfExperience?: number;
}

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

// ============================================================================
// Contact Form Types
// ============================================================================

/**
 * Contact form data structure
 * Matches the form fields in the Contact page
 * Index signature required for useForm hook compatibility
 */
export interface ContactFormData {
  [key: string]: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Form field validation state
 * Generic type for reusable form validation
 */
export interface FormFieldState<T> {
  value: T;
  error?: string;
  touched: boolean;
}

// ============================================================================
// UI Types
// ============================================================================

/**
 * Theme options for the application
 */
export type Theme = 'light' | 'dark';

/**
 * Navigation link structure
 */
export interface NavLink {
  label: string;
  path: string;
  icon?: string;
}

/**
 * Social media link
 */
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Generic API response wrapper
 * Useful for consistent error handling
 */
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

/**
 * Make certain keys of a type required
 * Useful for component props that extend base types
 */
export type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Make all properties of a type optional except specified keys
 * Useful for update operations
 */
export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;
