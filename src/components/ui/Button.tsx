/**
 * Button Component
 *
 * WHY this design:
 * - Uses variant pattern for different visual styles (primary, secondary, ghost)
 * - Size variants for flexibility
 * - Supports both <button> and <a> elements (polymorphic)
 * - Fully accessible with proper focus states
 * - Integrates with Framer Motion for animations
 *
 * LEARNING NOTE: This component demonstrates several important patterns:
 * - Variant props with TypeScript discriminated unions
 * - Polymorphic components (button vs anchor)
 * - Composition with the cn() utility
 */

import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

// ============================================================================
// Types
// ============================================================================

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Base props shared between button and anchor versions
 */
interface ButtonBaseProps {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size variant */
  size?: ButtonSize;
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state - disables button and shows spinner */
  isLoading?: boolean;
  /** Icon to show before the label */
  leftIcon?: React.ReactNode;
  /** Icon to show after the label */
  rightIcon?: React.ReactNode;
  /** Children elements */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
}

/**
 * Button element props
 */
interface ButtonAsButton extends ButtonBaseProps {
  as?: 'button';
  href?: never;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}

/**
 * Anchor element props (for link buttons)
 */
interface ButtonAsAnchor extends ButtonBaseProps {
  as: 'a';
  href: string;
  target?: string;
  rel?: string;
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>['onClick'];
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

// ============================================================================
// Styles
// ============================================================================

/**
 * Base styles applied to all button variants
 */
const baseStyles = cn(
  // Layout
  'inline-flex items-center justify-center gap-2',
  // Typography
  'font-medium',
  // Shape
  'rounded-xl',
  // Transitions
  'transition-all duration-200',
  // Focus states (accessibility)
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  'focus-visible:ring-primary-500 focus-visible:ring-offset-stone-50',
  'dark:focus-visible:ring-offset-stone-900',
  // Disabled state
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
);

/**
 * Variant-specific styles
 *
 * LEARNING NOTE: Using a record object makes it easy to add new variants
 * and provides type safety - TypeScript will error if you miss a variant.
 */
const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-primary-500 text-white',
    'hover:bg-primary-600',
    'active:bg-primary-700',
    'shadow-soft hover:shadow-soft-lg'
  ),
  secondary: cn(
    'bg-stone-100 text-stone-900',
    'dark:bg-stone-800 dark:text-stone-100',
    'hover:bg-stone-200 dark:hover:bg-stone-700',
    'active:bg-stone-300 dark:active:bg-stone-600'
  ),
  ghost: cn(
    'bg-transparent text-stone-700',
    'dark:text-stone-300',
    'hover:bg-stone-100 dark:hover:bg-stone-800',
    'active:bg-stone-200 dark:active:bg-stone-700'
  ),
  danger: cn(
    'bg-red-500 text-white',
    'hover:bg-red-600',
    'active:bg-red-700',
    'shadow-soft hover:shadow-soft-lg'
  ),
  outline: cn(
    'bg-transparent border-2 border-primary-500 text-primary-500',
    'dark:border-primary-400 dark:text-primary-400',
    'hover:bg-primary-50 dark:hover:bg-primary-900/20',
    'active:bg-primary-100 dark:active:bg-primary-900/40'
  ),
};

/**
 * Size-specific styles
 */
const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-base',
  lg: 'h-14 px-8 text-lg',
};

// ============================================================================
// Loading Spinner Component
// ============================================================================

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
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
// Button Component
// ============================================================================

/**
 * Reusable Button component with multiple variants and sizes
 *
 * @example
 * // Primary button
 * <Button variant="primary" onClick={handleClick}>Submit</Button>
 *
 * @example
 * // Link button
 * <Button as="a" href="/about" variant="ghost">Learn More</Button>
 *
 * @example
 * // With icons
 * <Button leftIcon={<PlusIcon />}>Add Item</Button>
 */
export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    className,
    as = 'button',
  } = props;

  // Combine all styles
  const combinedClassName = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    isLoading && 'cursor-wait',
    className
  );

  // Content with loading state
  const content = (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </>
  );

  // Render as anchor or button
  if (as === 'a') {
    const { href, target, rel, onClick } = props as ButtonAsAnchor;
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={combinedClassName}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.1 }}
      >
        {content}
      </motion.a>
    );
  }

  const { type = 'button', disabled, onClick } = props as ButtonAsButton;
  return (
    <motion.button
      type={type}
      disabled={isLoading || disabled}
      onClick={onClick}
      className={combinedClassName}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
    >
      {content}
    </motion.button>
  );
}
