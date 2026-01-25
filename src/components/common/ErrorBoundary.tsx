/**
 * Error Boundary Component
 *
 * WHY Error Boundaries:
 * - Catch JavaScript errors anywhere in the child component tree
 * - Log errors for debugging
 * - Display a fallback UI instead of crashing the whole app
 *
 * LEARNING NOTE: Error boundaries are one of the few places where
 * class components are still necessary in React. This is because
 * the componentDidCatch and getDerivedStateFromError lifecycle
 * methods don't have hook equivalents yet.
 *
 * Error boundaries:
 * - DO catch: Rendering errors, lifecycle methods, constructors
 * - DON'T catch: Event handlers, async code, server-side rendering, boundary itself
 *
 * @example
 * <ErrorBoundary fallback={<ErrorPage />}>
 *   <MyComponent />
 * </ErrorBoundary>
 */

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@/components/ui';

// ============================================================================
// Types
// ============================================================================

interface ErrorBoundaryProps {
  /** Child components to wrap */
  children: ReactNode;
  /** Custom fallback component */
  fallback?: ReactNode;
  /** Callback when error is caught (for logging/reporting) */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// ============================================================================
// Error Boundary Class Component
// ============================================================================

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /**
   * Update state when an error is thrown
   *
   * LEARNING NOTE: This is a static lifecycle method that receives the error
   * and returns a state update. It's called during the "render" phase.
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Log error details
   *
   * LEARNING NOTE: This is called during the "commit" phase, so side effects
   * like logging are allowed here. Use this for error reporting services.
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log to console in development
    console.error('ErrorBoundary caught an error:', error);
    console.error('Component stack:', errorInfo.componentStack);

    // Call optional error handler (e.g., for error reporting service)
    this.props.onError?.(error, errorInfo);
  }

  /**
   * Reset error state (allows retrying)
   */
  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  /**
   * Reload the page
   */
  handleReload = (): void => {
    window.location.reload();
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Custom fallback provided
      if (fallback) {
        return fallback;
      }

      // Default fallback UI
      return (
        <ErrorFallback error={error} onReset={this.handleReset} onReload={this.handleReload} />
      );
    }

    return children;
  }
}

// ============================================================================
// Default Error Fallback UI
// ============================================================================

interface ErrorFallbackProps {
  error: Error | null;
  onReset: () => void;
  onReload: () => void;
}

function ErrorFallback({ error, onReset, onReload }: ErrorFallbackProps) {
  return (
    <div
      className="min-h-[400px] flex items-center justify-center p-8"
      role="alert"
      aria-live="assertive"
    >
      <div className="max-w-md text-center">
        {/* Error Icon */}
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h2 className="text-2xl font-display text-stone-900 dark:text-stone-50 mb-2">
          Oops! Something went wrong
        </h2>
        <p className="text-stone-600 dark:text-stone-400 mb-6">
          We're sorry, but something unexpected happened. Please try again.
        </p>

        {/* Error Details (development only) */}
        {process.env.NODE_ENV === 'development' && error && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-stone-500 hover:text-stone-700 dark:hover:text-stone-300">
              Error details
            </summary>
            <pre className="mt-2 p-4 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs text-red-600 dark:text-red-400 overflow-auto">
              {error.message}
              {'\n\n'}
              {error.stack}
            </pre>
          </details>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" onClick={onReset}>
            Try Again
          </Button>
          <Button variant="secondary" onClick={onReload}>
            Reload Page
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Route Error Boundary (for React Router)
// ============================================================================

/**
 * Simpler error component for route-level errors
 * Used with React Router's errorElement
 */
export function RouteErrorBoundary() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-900 p-8">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-display text-stone-900 dark:text-stone-50 mb-4">
          Something went wrong
        </h1>
        <p className="text-stone-600 dark:text-stone-400 mb-8">
          An unexpected error occurred while loading this page.
        </p>
        <Button variant="primary" onClick={handleGoHome}>
          Go to Homepage
        </Button>
      </div>
    </div>
  );
}
