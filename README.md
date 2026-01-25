# Portfolio - Modern React Portfolio Application

A production-ready personal portfolio web application built with React, TypeScript, and Tailwind CSS. This project follows modern best practices and is structured for both learning and scalability.

## 🌟 Features

- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Feature-based Architecture**: Organized, scalable folder structure
- **Dark/Light Theme**: System preference detection with manual toggle
- **Responsive Design**: Mobile-first approach with fluid layouts
- **Accessible**: WCAG compliant with proper ARIA attributes
- **Animations**: Smooth animations with Framer Motion
- **Code Quality**: ESLint, Prettier, Husky pre-commit hooks
- **Lazy Loading**: Route-based code splitting for performance

## 📚 Key React Concepts Demonstrated

### 1. Custom Hooks
Located in `src/hooks/`:
- `useTheme` - Theme management with localStorage sync
- `useMediaQuery` - Responsive behavior in JavaScript
- `useLocalStorage` - State persistence with localStorage
- `useScrollPosition` - Track scroll for sticky headers
- `useForm` - Form state and validation management

### 2. Context API
Located in `src/context/`:
- `ThemeContext` - Global theme state avoiding prop drilling

### 3. Error Boundaries
Located in `src/components/common/ErrorBoundary.tsx`:
- Class component for catching render errors
- Graceful fallback UI

### 4. Code Splitting & Lazy Loading
Implemented in `src/App.tsx`:
- React.lazy() for route-based code splitting
- Suspense for loading states

### 5. Controlled Components
Demonstrated in `src/pages/Contact/Contact.tsx`:
- Form inputs managed by React state
- Custom useForm hook for validation

### 6. TypeScript Best Practices
Throughout the codebase:
- Interfaces for data structures
- Generic types for reusability
- Strict type checking enabled

## 🗂 Project Structure

```
src/
├── assets/               # Static assets (images, fonts)
├── components/
│   ├── common/          # Shared components (ErrorBoundary)
│   ├── layout/          # Layout components (Header, Footer)
│   └── ui/              # Reusable UI components (Button, Card, Input)
├── constants/           # Application constants and configuration
├── context/             # React Context providers
├── hooks/               # Custom React hooks
├── pages/               # Page components (feature-based)
│   ├── Home/
│   ├── About/
│   ├── Projects/
│   ├── Blog/
│   ├── Contact/
│   └── NotFound/
├── services/            # Data services and API layer
│   └── data/           # Mock data (would be API calls in production)
├── styles/             # Global styles and Tailwind configuration
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── App.tsx             # Root component with routing
└── main.tsx           # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run format:check # Check formatting
npm run type-check   # TypeScript type checking
```

## 🎨 Customization

### Site Configuration
Edit `src/constants/index.ts`:
```typescript
export const SITE_CONFIG = {
  name: 'Portfolio',
  title: 'Full Stack Developer',
  author: 'Your Name',
  email: 'your@email.com',
  location: 'Your Location',
};
```

### Theme Colors
Edit `tailwind.config.js` to customize the color palette:
```javascript
colors: {
  primary: { /* your primary colors */ },
  accent: { /* your accent colors */ },
}
```

### Adding Projects
Add entries to `src/services/data/projects.ts`:
```typescript
{
  id: 'unique-id',
  title: 'Project Title',
  slug: 'project-slug',
  description: 'Short description',
  technologies: [{ name: 'React' }],
  // ... other fields
}
```

### Adding Blog Posts
Add entries to `src/services/data/blog.ts`:
```typescript
{
  id: 'unique-id',
  slug: 'post-slug',
  title: 'Post Title',
  content: 'Your content here...',
  // ... other fields
}
```

## 📖 Extending the Project

### Adding a New Page

1. Create a new folder in `src/pages/`:
```
src/pages/NewPage/
├── NewPage.tsx
├── index.ts
└── components/     # Page-specific components
```

2. Add the route in `src/App.tsx`:
```typescript
const NewPage = lazy(() => 
  import('@/pages/NewPage').then((m) => ({ default: m.NewPage }))
);

// In router configuration:
{
  path: 'new-page',
  element: (
    <Suspense fallback={<PageLoading />}>
      <NewPage />
    </Suspense>
  ),
}
```

3. Add navigation link in `src/constants/index.ts`:
```typescript
export const NAV_LINKS = [
  // ... existing links
  { label: 'New Page', path: '/new-page' },
];
```

### Adding a Custom Hook

1. Create the hook in `src/hooks/`:
```typescript
// src/hooks/useMyHook.ts
export function useMyHook() {
  // Hook implementation
}
```

2. Export from `src/hooks/index.ts`:
```typescript
export { useMyHook } from './useMyHook';
```

### Connecting to a Backend

Replace mock data in `src/services/` with actual API calls:

```typescript
// src/services/api/projects.ts
export async function getAllProjects(): Promise<Project[]> {
  const response = await fetch('/api/projects');
  return response.json();
}
```

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 |
| Build Tool | Vite |
| Language | TypeScript |
| Routing | React Router 7 |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Linting | ESLint |
| Formatting | Prettier |
| Git Hooks | Husky + lint-staged |

## 📱 Responsive Breakpoints

Following Tailwind CSS defaults:
- `sm`: 640px
- `md`: 768px  
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## ♿ Accessibility

This project follows WCAG 2.1 guidelines:
- Semantic HTML structure
- Proper heading hierarchy
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Color contrast ratios
- Skip to main content link
- Reduced motion support

## 🔧 Environment Variables

Create a `.env` file for environment-specific configuration:

```env
# API Configuration (when connecting to backend)
VITE_API_URL=http://localhost:3000/api

# Analytics (optional)
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X
```

## 📝 Code Style

- **Components**: PascalCase (`Button.tsx`)
- **Hooks**: camelCase with `use` prefix (`useTheme.ts`)
- **Utils**: camelCase (`formatDate.ts`)
- **Constants**: SCREAMING_SNAKE_CASE for values
- **Types**: PascalCase interfaces/types

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using React, TypeScript, and Tailwind CSS

