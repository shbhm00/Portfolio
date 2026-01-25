/**
 * Card Component
 *
 * WHY this design:
 * - Composable card system with Card, CardHeader, CardContent, CardFooter
 * - Allows flexibility in card structure without prop drilling
 * - Supports hover effects and click interactions
 * - Works well with both light and dark themes
 *
 * LEARNING NOTE: This uses the "compound component" pattern.
 * Instead of passing everything as props to one component,
 * we compose multiple related components together.
 *
 * @example
 * <Card hover>
 *   <CardHeader>
 *     <CardTitle>Project Name</CardTitle>
 *   </CardHeader>
 *   <CardContent>Description...</CardContent>
 *   <CardFooter>
 *     <Button>View Project</Button>
 *   </CardFooter>
 * </Card>
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

// ============================================================================
// Card (Container)
// ============================================================================

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Enable hover lift effect */
  hover?: boolean;
  /** Make the entire card clickable */
  clickable?: boolean;
  /** Use glass morphism style */
  glass?: boolean;
  /** Remove padding */
  noPadding?: boolean;
}

/**
 * Card container component
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    hover = false,
    clickable = false,
    glass = false,
    noPadding = false,
    className,
    children,
    ...props
  },
  ref
) {
  const cardClassName = cn(
    // Base styles
    'rounded-2xl overflow-hidden',
    // Background
    glass
      ? 'bg-white/80 dark:bg-stone-900/80 backdrop-blur-lg border border-stone-200/50 dark:border-stone-700/50'
      : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700',
    // Shadow
    'shadow-soft',
    // Hover effect
    hover && 'transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1',
    // Clickable styles
    clickable && 'cursor-pointer',
    // Padding
    !noPadding && 'p-6',
    className
  );

  // If hover animation is needed, use motion div
  if (hover) {
    return (
      <motion.div
        ref={ref}
        className={cardClassName}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={cardClassName} {...props}>
      {children}
    </div>
  );
});

// ============================================================================
// CardHeader
// ============================================================================

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Add bottom border */
  withBorder?: boolean;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { withBorder = false, className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'mb-4',
        withBorder && 'pb-4 border-b border-stone-200 dark:border-stone-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

// ============================================================================
// CardTitle
// ============================================================================

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading level (h1-h6) */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(function CardTitle(
  { as: Component = 'h3', className, children, ...props },
  ref
) {
  return (
    <Component
      ref={ref}
      className={cn('text-xl font-display text-stone-900 dark:text-stone-100', className)}
      {...props}
    >
      {children}
    </Component>
  );
});

// ============================================================================
// CardDescription
// ============================================================================

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function CardDescription({ className, children, ...props }, ref) {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-stone-600 dark:text-stone-400 mt-1', className)}
      {...props}
    >
      {children}
    </p>
  );
});

// ============================================================================
// CardContent
// ============================================================================

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardContent({ className, children, ...props }, ref) {
    return (
      <div ref={ref} className={cn('text-stone-700 dark:text-stone-300', className)} {...props}>
        {children}
      </div>
    );
  }
);

// ============================================================================
// CardFooter
// ============================================================================

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Add top border */
  withBorder?: boolean;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { withBorder = false, className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'mt-4 flex items-center gap-3',
        withBorder && 'pt-4 border-t border-stone-200 dark:border-stone-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

// ============================================================================
// CardImage
// ============================================================================

interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  /** Image source */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Aspect ratio class */
  aspectRatio?: 'video' | 'square' | 'portrait';
}

export const CardImage = forwardRef<HTMLDivElement, CardImageProps>(function CardImage(
  { src, alt, aspectRatio = 'video', className, ...props },
  ref
) {
  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-portrait',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden -mx-6 -mt-6 mb-4',
        aspectClasses[aspectRatio],
        className
      )}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
  );
});
