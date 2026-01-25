/**
 * useForm Hook
 *
 * WHY this hook:
 * - Abstracts form state management logic from components
 * - Provides built-in validation
 * - Handles both controlled and tracking of touched fields
 * - Reusable across different forms
 *
 * LEARNING NOTE: This is a classic example of extracting complex logic
 * into a custom hook. The component stays clean and focused on rendering.
 *
 * @example
 * const { values, errors, handleChange, handleBlur, handleSubmit, isValid } = useForm({
 *   initialValues: { email: '', password: '' },
 *   validate: (values) => {
 *     const errors = {};
 *     if (!values.email) errors.email = 'Required';
 *     return errors;
 *   },
 *   onSubmit: async (values) => {
 *     await submitToAPI(values);
 *   },
 * });
 */

import { useState, useCallback, type ChangeEvent, type FormEvent } from 'react';

// ============================================================================
// Types
// ============================================================================

/**
 * Generic type for form values
 * Uses Record<string, string> for typical form data
 */
type FormValues = Record<string, string>;

/**
 * Validation function signature
 * Returns an object with field names as keys and error messages as values
 */
type ValidateFunction<T extends FormValues> = (values: T) => Partial<Record<keyof T, string>>;

/**
 * Submit handler signature
 */
type SubmitFunction<T extends FormValues> = (values: T) => void | Promise<void>;

/**
 * Hook configuration options
 */
interface UseFormOptions<T extends FormValues> {
  /** Initial form values */
  initialValues: T;
  /** Validation function (optional) */
  validate?: ValidateFunction<T>;
  /** Submit handler */
  onSubmit: SubmitFunction<T>;
  /** Validate on change (default: false, validates on blur) */
  validateOnChange?: boolean;
}

/**
 * Return type of the useForm hook
 */
interface UseFormReturn<T extends FormValues> {
  /** Current form values */
  values: T;
  /** Current validation errors */
  errors: Partial<Record<keyof T, string>>;
  /** Which fields have been touched */
  touched: Partial<Record<keyof T, boolean>>;
  /** Whether the form is currently submitting */
  isSubmitting: boolean;
  /** Whether all fields are valid */
  isValid: boolean;
  /** Handle input change events */
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  /** Handle input blur events (marks field as touched) */
  handleBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  /** Handle form submission */
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  /** Set a specific field value programmatically */
  setFieldValue: (field: keyof T, value: T[keyof T]) => void;
  /** Set a specific field error */
  setFieldError: (field: keyof T, error: string) => void;
  /** Reset form to initial values */
  reset: () => void;
  /** Get props for an input field (spread onto input element) */
  getFieldProps: (field: keyof T) => {
    name: keyof T;
    value: T[keyof T];
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  };
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useForm<T extends FormValues>({
  initialValues,
  validate,
  onSubmit,
  validateOnChange = false,
}: UseFormOptions<T>): UseFormReturn<T> {
  // Form state
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Run validation and return errors
   */
  const runValidation = useCallback(
    (valuesToValidate: T): Partial<Record<keyof T, string>> => {
      if (!validate) return {};
      return validate(valuesToValidate);
    },
    [validate]
  );

  /**
   * Handle input changes
   *
   * LEARNING NOTE: This is a "controlled component" pattern.
   * React controls the input value through state.
   */
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;

      // Handle checkbox differently
      const inputValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

      const newValues = { ...values, [name]: inputValue } as T;
      setValues(newValues);

      // Validate on change if enabled
      if (validateOnChange) {
        const validationErrors = runValidation(newValues);
        setErrors(validationErrors);
      }
    },
    [values, validateOnChange, runValidation]
  );

  /**
   * Handle input blur (marks field as touched and validates)
   *
   * LEARNING NOTE: Marking fields as "touched" allows us to show errors
   * only for fields the user has interacted with.
   */
  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target;

      // Mark as touched
      setTouched((prev) => ({ ...prev, [name]: true }));

      // Validate
      const validationErrors = runValidation(values);
      setErrors(validationErrors);
    },
    [values, runValidation]
  );

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as Partial<Record<keyof T, boolean>>
      );
      setTouched(allTouched);

      // Validate all fields
      const validationErrors = runValidation(values);
      setErrors(validationErrors);

      // If valid, submit
      if (Object.keys(validationErrors).length === 0) {
        setIsSubmitting(true);
        try {
          await onSubmit(values);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [values, runValidation, onSubmit]
  );

  /**
   * Set a specific field value
   */
  const setFieldValue = useCallback((field: keyof T, value: T[keyof T]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  /**
   * Set a specific field error
   */
  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  /**
   * Reset form to initial state
   */
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  /**
   * Get props for a form field
   *
   * LEARNING NOTE: This pattern allows spreading props onto inputs:
   * <input {...getFieldProps('email')} />
   */
  const getFieldProps = useCallback(
    (field: keyof T) => ({
      name: field,
      value: values[field],
      onChange: handleChange,
      onBlur: handleBlur,
    }),
    [values, handleChange, handleBlur]
  );

  // Calculate if form is valid
  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    reset,
    getFieldProps,
  };
}
