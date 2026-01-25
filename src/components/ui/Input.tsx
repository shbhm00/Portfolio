/**
 * Input Component
 *
 * WHY this design:
 * - Accessible form inputs with proper labeling
 * - Error and helper text support
 * - Consistent styling with the design system
 * - Supports both controlled and uncontrolled usage
 *
 * LEARNING NOTE: This component shows the difference between
 * controlled and uncontrolled components:
 *
 * CONTROLLED: React manages the value via state
 *   const [value, setValue] = useState('');
 *   <Input value={value} onChange={(e) => setValue(e.target.value)} />
 *
 * UNCONTROLLED: DOM manages the value, use ref to access
 *   const inputRef = useRef<HTMLInputElement>(null);
 *   <Input ref={inputRef} defaultValue="initial" />
 *   // Access value: inputRef.current?.value
 */

import { forwardRef, useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils';

// ============================================================================
// Types
// ============================================================================

interface InputBaseProps {
  /** Label text (required for accessibility) */
  label: string;
  /** Helper text shown below input */
  helperText?: string;
  /** Error message (shows error state when present) */
  error?: string;
  /** Hide the label visually (still accessible to screen readers) */
  hideLabel?: boolean;
  /** Full width input */
  fullWidth?: boolean;
}

type InputProps = InputBaseProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>;

type TextareaProps = InputBaseProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> & {
    /** Number of visible text rows */
    rows?: number;
  };

// ============================================================================
// Styles
// ============================================================================

const inputBaseStyles = cn(
  // Layout
  'w-full px-4 py-3',
  // Shape
  'rounded-xl',
  // Colors
  'bg-white dark:bg-stone-800',
  'border border-stone-300 dark:border-stone-600',
  'text-stone-900 dark:text-stone-100',
  // Placeholder
  'placeholder:text-stone-400 dark:placeholder:text-stone-500',
  // Focus
  'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
  // Transitions
  'transition-all duration-200',
  // Disabled
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-stone-100 dark:disabled:bg-stone-900'
);

const errorStyles = cn(
  'border-red-500 dark:border-red-400',
  'focus:ring-red-500 dark:focus:ring-red-400'
);

const labelStyles = cn('block text-sm font-medium mb-2', 'text-stone-700 dark:text-stone-300');

const helperStyles = cn('mt-1.5 text-sm text-stone-500 dark:text-stone-400');

const errorMessageStyles = cn('mt-1.5 text-sm text-red-500 dark:text-red-400');

// ============================================================================
// Input Component
// ============================================================================

/**
 * Text input component with label and error handling
 *
 * @example
 * // Controlled usage
 * <Input
 *   label="Email"
 *   type="email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   error={errors.email}
 * />
 *
 * @example
 * // Uncontrolled usage
 * <Input
 *   ref={emailRef}
 *   label="Email"
 *   type="email"
 *   defaultValue=""
 * />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, helperText, error, hideLabel = false, fullWidth = true, id: providedId, ...props },
  ref
) {
  /**
   * Generate unique ID for label association
   *
   * LEARNING NOTE: useId() generates a stable unique ID that persists
   * across renders. This is essential for connecting labels to inputs.
   */
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  const hasError = Boolean(error);

  return (
    <div className={cn(fullWidth && 'w-full')}>
      {/* Label */}
      <label htmlFor={id} className={cn(labelStyles, hideLabel && 'sr-only')}>
        {label}
        {props.required && (
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {/* Input */}
      <input
        ref={ref}
        id={id}
        className={cn(inputBaseStyles, hasError && errorStyles)}
        aria-invalid={hasError}
        aria-describedby={cn(hasError && errorId, helperText && helperId)}
        {...props}
      />

      {/* Error message */}
      {hasError && (
        <p id={errorId} className={errorMessageStyles} role="alert">
          {error}
        </p>
      )}

      {/* Helper text (only show if no error) */}
      {!hasError && helperText && (
        <p id={helperId} className={helperStyles}>
          {helperText}
        </p>
      )}
    </div>
  );
});

// ============================================================================
// Textarea Component
// ============================================================================

/**
 * Textarea component with label and error handling
 *
 * @example
 * <Textarea
 *   label="Message"
 *   rows={5}
 *   value={message}
 *   onChange={(e) => setMessage(e.target.value)}
 *   error={errors.message}
 * />
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    label,
    helperText,
    error,
    hideLabel = false,
    fullWidth = true,
    rows = 4,
    id: providedId,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  const hasError = Boolean(error);

  return (
    <div className={cn(fullWidth && 'w-full')}>
      {/* Label */}
      <label htmlFor={id} className={cn(labelStyles, hideLabel && 'sr-only')}>
        {label}
        {props.required && (
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {/* Textarea */}
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={cn(inputBaseStyles, 'resize-y min-h-[100px]', hasError && errorStyles)}
        aria-invalid={hasError}
        aria-describedby={cn(hasError && errorId, helperText && helperId)}
        {...props}
      />

      {/* Error message */}
      {hasError && (
        <p id={errorId} className={errorMessageStyles} role="alert">
          {error}
        </p>
      )}

      {/* Helper text */}
      {!hasError && helperText && (
        <p id={helperId} className={helperStyles}>
          {helperText}
        </p>
      )}
    </div>
  );
});

// ============================================================================
// Select Component
// ============================================================================

interface SelectProps extends InputBaseProps {
  /** Options for the select */
  options: Array<{ value: string; label: string }>;
  /** Placeholder text */
  placeholder?: string;
}

type SelectFullProps = SelectProps &
  Omit<InputHTMLAttributes<HTMLSelectElement>, 'className' | 'children'>;

export const Select = forwardRef<HTMLSelectElement, SelectFullProps>(function Select(
  {
    label,
    helperText,
    error,
    hideLabel = false,
    fullWidth = true,
    options,
    placeholder,
    id: providedId,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  const hasError = Boolean(error);

  return (
    <div className={cn(fullWidth && 'w-full')}>
      {/* Label */}
      <label htmlFor={id} className={cn(labelStyles, hideLabel && 'sr-only')}>
        {label}
        {props.required && (
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {/* Select */}
      <select
        ref={ref}
        id={id}
        className={cn(inputBaseStyles, 'cursor-pointer', hasError && errorStyles)}
        aria-invalid={hasError}
        aria-describedby={cn(hasError && errorId, helperText && helperId)}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Error message */}
      {hasError && (
        <p id={errorId} className={errorMessageStyles} role="alert">
          {error}
        </p>
      )}

      {/* Helper text */}
      {!hasError && helperText && (
        <p id={helperId} className={helperStyles}>
          {helperText}
        </p>
      )}
    </div>
  );
});
