/**
 * App Component - Root of the Application
 *
 * WHY this structure:
 * - Single responsibility: Sets up routing and global providers
 * - Lazy loading: Routes are code-split for better performance
 * - Error boundaries: Graceful error handling at route level
 *
 * LEARNING NOTE: This demonstrates several important patterns:
 * - React.lazy() for code splitting
 * - Suspense for loading states
 * - Router configuration with error boundaries
 * - Provider composition
 */

import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { Layout } from '@/components/layout';
import { ErrorBoundary, RouteErrorBoundary } from '@/components/common';
import { PageLoading } from '@/components/ui';

// ============================================================================
// Lazy-loaded Pages
// ============================================================================

/**
 * LEARNING NOTE: React.lazy() enables code splitting.
 * Each page is bundled separately and only loaded when needed.
 * This significantly reduces initial bundle size.
 *
 * The Suspense component shows a fallback while the lazy component loads.
 */
const Home = lazy(() => import('@/pages/Home').then((m) => ({ default: m.Home })));
const About = lazy(() => import('@/pages/About').then((m) => ({ default: m.About })));
const Projects = lazy(() => import('@/pages/Projects').then((m) => ({ default: m.Projects })));
const ProjectDetail = lazy(() =>
  import('@/pages/Projects').then((m) => ({ default: m.ProjectDetail }))
);
const Blog = lazy(() => import('@/pages/Blog').then((m) => ({ default: m.Blog })));
const BlogPost = lazy(() => import('@/pages/Blog').then((m) => ({ default: m.BlogPost })));
const Contact = lazy(() => import('@/pages/Contact').then((m) => ({ default: m.Contact })));
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })));

// ============================================================================
// Router Configuration
// ============================================================================

/**
 * Router setup using React Router v6+ data API
 *
 * LEARNING NOTE: The new data router API provides:
 * - Better error handling with errorElement
 * - Data loading with loaders (not used here but available)
 * - Nested layouts with <Outlet />
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<PageLoading />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: 'projects',
        element: (
          <Suspense fallback={<PageLoading />}>
            <Projects />
          </Suspense>
        ),
      },
      {
        path: 'projects/:slug',
        element: (
          <Suspense fallback={<PageLoading />}>
            <ProjectDetail />
          </Suspense>
        ),
      },
      {
        path: 'blog',
        element: (
          <Suspense fallback={<PageLoading />}>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: 'blog/:slug',
        element: (
          <Suspense fallback={<PageLoading />}>
            <BlogPost />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<PageLoading />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: '404',
        element: (
          <Suspense fallback={<PageLoading />}>
            <NotFound />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<PageLoading />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

// ============================================================================
// App Component
// ============================================================================

/**
 * Root App Component
 *
 * Sets up global providers and routing.
 * Error boundary wraps everything for top-level error catching.
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
