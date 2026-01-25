/**
 * Application Entry Point
 *
 * WHY React.StrictMode:
 * - Helps identify potential problems in the application
 * - Runs extra checks and warnings during development
 * - Does not impact production builds
 * - Intentionally double-invokes certain functions to detect side effects
 *
 * LEARNING NOTE: StrictMode may cause useEffect to run twice in development.
 * This is intentional and helps catch bugs related to cleanup functions.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';

// Get the root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    'Root element not found. Make sure there is a <div id="root"></div> in your index.html'
  );
}

// Create and render the React root
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
