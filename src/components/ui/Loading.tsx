/**
 * Loading Components
 *
 * WHY multiple loading variants:
 * - Full page loading for route transitions
 * - Inline spinner for buttons and small areas
 * - Skeleton loading for content placeholders
 *
 * LEARNING NOTE: Good loading states improve perceived performance.
 * Users feel the app is faster when they see immediate feedback.
 */

import { cn } from '@/utils';

// ============================================================================
// Spinner
// ============================================================================

interface SpinnerProps {
  /** Size of the spinner */
  size?: 'sm' | 'md' | 'lg';
  /** Additional className */
  className?: string;
}

const spinnerSizes = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <svg
      className={cn('animate-spin text-primary-500', spinnerSizes[size], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// ============================================================================
// Full Page Loading
// ============================================================================

interface PageLoadingProps {
  /** Loading message */
  message?: string;
}

export function PageLoading({ message = 'Loading...' }: PageLoadingProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-stone-50 dark:bg-stone-900"
      role="status"
      aria-live="polite"
    >
      <Spinner size="lg" />
      <p className="mt-4 text-stone-600 dark:text-stone-400">{message}</p>
      <span className="sr-only">{message}</span>
    </div>
  );
}

// ============================================================================
// Skeleton Loading
// ============================================================================

interface SkeletonProps {
  /** Width class (e.g., 'w-full', 'w-32') */
  width?: string;
  /** Height class (e.g., 'h-4', 'h-8') */
  height?: string;
  /** Additional className */
  className?: string;
  /** Rounded corners */
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

export function Skeleton({
  width = 'w-full',
  height = 'h-4',
  rounded = 'md',
  className,
}: SkeletonProps) {
  const roundedStyles = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-stone-200 dark:bg-stone-700',
        width,
        height,
        roundedStyles[rounded],
        className
      )}
      aria-hidden="true"
    />
  );
}

// ============================================================================
// Card Skeleton
// ============================================================================

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-soft">
      {/* Image placeholder */}
      <Skeleton height="h-48" rounded="lg" className="mb-4" />

      {/* Title */}
      <Skeleton width="w-3/4" height="h-6" className="mb-2" />

      {/* Description lines */}
      <Skeleton width="w-full" height="h-4" className="mb-2" />
      <Skeleton width="w-5/6" height="h-4" className="mb-4" />

      {/* Tags */}
      <div className="flex gap-2">
        <Skeleton width="w-16" height="h-6" rounded="full" />
        <Skeleton width="w-20" height="h-6" rounded="full" />
        <Skeleton width="w-14" height="h-6" rounded="full" />
      </div>
    </div>
  );
}

// ============================================================================
// Blog Post Skeleton
// ============================================================================

export function BlogPostSkeleton() {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-soft">
      {/* Image */}
      <Skeleton height="h-52" rounded="lg" className="mb-4" />

      {/* Meta info */}
      <div className="flex items-center gap-4 mb-3">
        <Skeleton width="w-24" height="h-4" />
        <Skeleton width="w-20" height="h-4" />
      </div>

      {/* Title */}
      <Skeleton width="w-full" height="h-7" className="mb-2" />
      <Skeleton width="w-2/3" height="h-7" className="mb-3" />

      {/* Excerpt */}
      <Skeleton width="w-full" height="h-4" className="mb-2" />
      <Skeleton width="w-full" height="h-4" className="mb-2" />
      <Skeleton width="w-4/5" height="h-4" />
    </div>
  );
}
