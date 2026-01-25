/** @type {import('tailwindcss').Config} */

/**
 * Tailwind CSS Configuration
 *
 * WHY these choices:
 * - Custom color palette: Provides semantic naming (primary, secondary) for consistent theming
 * - Dark mode 'class': Allows programmatic control of dark mode (vs 'media' which follows OS)
 * - Extended animations: Custom animations for unique micro-interactions
 * - Font families: Distinctive typography that avoids generic AI aesthetics
 */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable class-based dark mode for programmatic toggle
  theme: {
    extend: {
      // Custom color palette with semantic naming
      colors: {
        // Primary colors - Deep teal for a sophisticated, professional look
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        // Accent colors - Warm coral for CTAs and highlights
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        // Surface colors for cards and containers
        surface: {
          light: '#fafaf9',
          dark: '#1c1917',
        },
      },
      // Typography - Using distinctive fonts
      fontFamily: {
        // Display font for headings - DM Serif Display for elegance
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        // Body font - Plus Jakarta Sans for modern readability
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        // Monospace for code snippets
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      // Custom animations for micro-interactions
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      // Spacing for consistent layouts
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      // Border radius for consistent rounded corners
      borderRadius: {
        '4xl': '2rem',
      },
      // Box shadow for depth
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(0, 0, 0, 0.1)',
        soft: '0 4px 16px -4px rgba(0, 0, 0, 0.1)',
        'soft-lg': '0 8px 32px -8px rgba(0, 0, 0, 0.15)',
        'soft-xl': '0 16px 48px -12px rgba(0, 0, 0, 0.2)',
        glow: '0 0 20px rgba(20, 184, 166, 0.3)',
        'glow-accent': '0 0 20px rgba(249, 115, 22, 0.3)',
      },
      // Background images for patterns
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern':
          'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
        'grid-pattern-dark':
          'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
    },
  },
  plugins: [],
};

