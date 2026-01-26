# Portfolio Architecture Documentation

A comprehensive guide explaining the technologies, architecture, and rendering flow of this React portfolio application.

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Application Architecture](#application-architecture)
3. [Rendering Flow](#rendering-flow)
4. [Component Hierarchy](#component-hierarchy)
5. [Data Flow](#data-flow)
6. [Key Patterns & Concepts](#key-patterns--concepts)
7. [File Structure Explained](#file-structure-explained)
8. [Screen/Page Details](#screenpage-details)

---

## Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI library for building component-based interfaces |
| **TypeScript** | 5.7.3 | Static type checking for JavaScript |
| **Vite** | 6.0.7 | Build tool and development server |
| **React Router** | 7.1.1 | Client-side routing and navigation |
| **Tailwind CSS** | 3.4.17 | Utility-first CSS framework |
| **Framer Motion** | 11.15.0 | Animation library for React |

### Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting and error detection |
| **Prettier** | Code formatting |
| **Husky** | Git hooks for pre-commit checks |
| **lint-staged** | Run linters on staged files only |
| **PostCSS** | CSS processing (required by Tailwind) |
| **Autoprefixer** | Auto-add vendor prefixes to CSS |

### How Each Technology Works Together

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐     │
│   │    React     │───▶│ React Router │───▶│   Framer     │     │
│   │  Components  │    │  (Routing)   │    │   Motion     │     │
│   └──────────────┘    └──────────────┘    │ (Animations) │     │
│          │                                 └──────────────┘     │
│          ▼                                                       │
│   ┌──────────────┐    ┌──────────────┐                          │
│   │  TypeScript  │───▶│ Tailwind CSS │                          │
│   │ (Type Safety)│    │  (Styling)   │                          │
│   └──────────────┘    └──────────────┘                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      VITE (Build Tool)                          │
│  • Hot Module Replacement (HMR) for fast development            │
│  • Code splitting and lazy loading                              │
│  • Production optimization (minification, tree-shaking)         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Application Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        index.html                                │
│                    <div id="root"></div>                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        main.tsx                                  │
│              Entry point - mounts React app                      │
│                                                                  │
│   createRoot(document.getElementById('root'))                   │
│   └── StrictMode                                                 │
│       └── App                                                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         App.tsx                                  │
│           Root component - sets up providers & routing           │
│                                                                  │
│   ErrorBoundary (catches errors)                                │
│   └── ThemeProvider (dark/light mode)                           │
│       └── RouterProvider (routing)                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Layout.tsx                                 │
│              Shared layout for all pages                         │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ Header (navigation)                                      │   │
│   ├─────────────────────────────────────────────────────────┤   │
│   │ <Outlet /> ← Page content renders here                   │   │
│   ├─────────────────────────────────────────────────────────┤   │
│   │ Footer                                                   │   │
│   │ ScrollToTop Button                                       │   │
│   └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Provider Composition Pattern

The app uses a **provider composition pattern** where each provider wraps its children:

```tsx
// How providers are nested (App.tsx)
<ErrorBoundary>           ← Level 1: Catch all errors
  <ThemeProvider>         ← Level 2: Provide theme context
    <RouterProvider />    ← Level 3: Handle routing
  </ThemeProvider>
</ErrorBoundary>
```

**Why this order?**
1. `ErrorBoundary` is outermost to catch ANY error in the app
2. `ThemeProvider` provides global theme state to all components
3. `RouterProvider` handles all routing logic

---

## Rendering Flow

### Initial Page Load

```
User visits https://yoursite.com/projects
                    │
                    ▼
┌─────────────────────────────────────────────────────────────────┐
│ 1. Browser loads index.html                                      │
│    └── Contains <div id="root"></div>                           │
│    └── Loads bundled JavaScript                                 │
└─────────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. main.tsx executes                                             │
│    └── createRoot() creates React root                          │
│    └── Renders <StrictMode><App /></StrictMode>                 │
└─────────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. App.tsx renders                                               │
│    └── ErrorBoundary initializes                                │
│    └── ThemeProvider reads localStorage, sets theme             │
│    └── RouterProvider parses URL: /projects                     │
└─────────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. Router matches route                                          │
│    └── Path: /projects → matches route config                   │
│    └── Parent: Layout.tsx                                       │
│    └── Child: Projects.tsx (lazy loaded)                        │
└─────────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. Lazy Loading                                                  │
│    └── Suspense shows <PageLoading /> spinner                   │
│    └── Projects chunk is fetched from server                    │
│    └── Once loaded, <Projects /> replaces spinner               │
└─────────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. Final Render                                                  │
│    ┌─────────────────────────────────────┐                      │
│    │ Header                              │                      │
│    ├─────────────────────────────────────┤                      │
│    │ Projects Page Content               │                      │
│    │ (with Framer Motion animations)     │                      │
│    ├─────────────────────────────────────┤                      │
│    │ Footer                              │                      │
│    └─────────────────────────────────────┘                      │
└─────────────────────────────────────────────────────────────────┘
```

### Navigation Between Pages

```
User clicks "Blog" link
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 1. React Router intercepts click (no page reload)               │
│    └── <Link to="/blog"> prevents default anchor behavior       │
│    └── History API updates URL to /blog                         │
└─────────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. Router re-matches routes                                      │
│    └── Layout stays mounted (no re-render)                      │
│    └── Only <Outlet /> content changes                          │
└─────────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. New page loads (if not cached)                               │
│    └── Suspense shows loading state                             │
│    └── Blog chunk fetched                                       │
│    └── Blog component renders in <Outlet />                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Hierarchy

### Complete Component Tree

```
<StrictMode>
└── <App>
    └── <ErrorBoundary>
        └── <ThemeProvider>
            └── <RouterProvider>
                └── <Layout>
                    ├── <a> (Skip link)
                    ├── <Header>
                    │   ├── <Logo>
                    │   ├── <nav>
                    │   │   └── <Link> (multiple)
                    │   ├── <ThemeToggle>
                    │   └── <MobileMenu>
                    │
                    ├── <main>
                    │   └── <Outlet> ← Current page renders here
                    │       │
                    │       ├── <Home>
                    │       │   ├── <Section> (Hero)
                    │       │   ├── <Section> (Skills)
                    │       │   ├── <Section> (Experience)
                    │       │   └── <Section> (CTA)
                    │       │
                    │       ├── <About>
                    │       │   ├── <Section> (Bio)
                    │       │   ├── <Section> (Skills Grid)
                    │       │   └── <Section> (Timeline)
                    │       │
                    │       ├── <Projects>
                    │       │   └── <ProjectCard> (multiple)
                    │       │
                    │       ├── <ProjectDetail>
                    │       │   ├── <Badge> (technologies)
                    │       │   └── <Button> (links)
                    │       │
                    │       ├── <Blog>
                    │       │   └── <BlogCard> (multiple)
                    │       │
                    │       ├── <BlogPost>
                    │       │   └── <Badge> (tags)
                    │       │
                    │       ├── <Contact>
                    │       │   ├── <Input> (multiple)
                    │       │   └── <Button>
                    │       │
                    │       └── <NotFound>
                    │           └── <Button>
                    │
                    ├── <Footer>
                    │   ├── <SocialLinks>
                    │   └── <nav>
                    │
                    └── <ScrollToTop>
```

### Component Categories

```
┌─────────────────────────────────────────────────────────────────┐
│                        COMPONENTS                                │
├──────────────────┬──────────────────┬───────────────────────────┤
│      UI          │     Layout       │        Common             │
├──────────────────┼──────────────────┼───────────────────────────┤
│ • Button         │ • Header         │ • ErrorBoundary           │
│ • Card           │ • Footer         │                           │
│ • Input          │ • Layout         │                           │
│ • Badge          │ • Section        │                           │
│ • Loading        │ • ScrollToTop    │                           │
│ • Icons          │                  │                           │
└──────────────────┴──────────────────┴───────────────────────────┘
        │                  │                      │
        ▼                  ▼                      ▼
   Reusable           Structural            Error handling
   building           components            and recovery
   blocks             for layout
```

---

## Data Flow

### State Management Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     STATE MANAGEMENT                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    GLOBAL STATE                             │ │
│  │                                                              │ │
│  │   ThemeContext ─────────────────────────────────────────┐   │ │
│  │   • theme: 'light' | 'dark'                             │   │ │
│  │   • toggleTheme()                                       │   │ │
│  │   • Synced with localStorage                            │   │ │
│  │                                                          │   │ │
│  │                         │                                │   │ │
│  │                         ▼                                │   │ │
│  │   ┌─────────────────────────────────────────────────┐   │   │ │
│  │   │            ALL COMPONENTS                        │   │   │ │
│  │   │   (can access via useTheme() hook)              │   │   │ │
│  │   └─────────────────────────────────────────────────┘   │   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    LOCAL STATE                              │ │
│  │                                                              │ │
│  │   Component-specific state (useState, useReducer)           │ │
│  │                                                              │ │
│  │   • Form inputs (Contact page)                              │ │
│  │   • UI toggles (mobile menu open/close)                     │ │
│  │   • Loading states                                          │ │
│  │   • Filter selections (Blog, Projects)                      │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    URL STATE                                │ │
│  │                                                              │ │
│  │   React Router manages URL-based state:                     │ │
│  │   • Current route (/projects, /blog, etc.)                  │ │
│  │   • Route params (/projects/:slug)                          │ │
│  │   • Query params (?category=tech)                           │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Data Sources

```
┌─────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                 │
│                    (src/services/)                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│   │   projects.ts   │  │   experience.ts │  │     blog.ts     │ │
│   │                 │  │                 │  │                 │ │
│   │  Project[]      │  │  Experience[]   │  │  BlogPost[]     │ │
│   │  - id           │  │  - company      │  │  - id           │ │
│   │  - title        │  │  - role         │  │  - title        │ │
│   │  - description  │  │  - period       │  │  - content      │ │
│   │  - technologies │  │  - highlights   │  │  - tags         │ │
│   │  - links        │  │                 │  │  - publishDate  │ │
│   └────────┬────────┘  └────────┬────────┘  └────────┬────────┘ │
│            │                    │                    │           │
│            └────────────────────┼────────────────────┘           │
│                                 │                                │
│                                 ▼                                │
│                    ┌────────────────────────┐                   │
│                    │     index.ts           │                   │
│                    │   (Service exports)    │                   │
│                    │                        │                   │
│                    │  getAllProjects()      │                   │
│                    │  getProjectBySlug()    │                   │
│                    │  getAllBlogPosts()     │                   │
│                    │  getBlogPostBySlug()   │                   │
│                    │  getAllExperience()    │                   │
│                    └────────────────────────┘                   │
│                                                                  │
│   NOTE: Currently using static data. Can be replaced with       │
│   API calls without changing component code.                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Patterns & Concepts

### 1. Code Splitting with React.lazy()

```tsx
// In App.tsx - pages are loaded on-demand
const Projects = lazy(() => 
  import('@/pages/Projects').then((m) => ({ default: m.Projects }))
);

// When user navigates to /projects:
// 1. Suspense shows <PageLoading />
// 2. Projects chunk is fetched (separate JS file)
// 3. Component renders
```

**Benefits:**
- Smaller initial bundle size
- Faster initial page load
- Resources loaded only when needed

### 2. Custom Hooks

```tsx
// useTheme - Access theme anywhere
const { theme, toggleTheme } = useTheme();

// useMediaQuery - Responsive logic
const isMobile = useMediaQuery('(max-width: 768px)');

// useLocalStorage - Persist state
const [savedData, setSavedData] = useLocalStorage('key', defaultValue);

// useScrollPosition - Track scroll
const scrollY = useScrollPosition();

// useForm - Form management
const { values, errors, handleChange, handleSubmit } = useForm(
  initialValues,
  validationRules,
  onSubmit
);
```

### 3. Error Boundaries

```tsx
// Class component that catches rendering errors
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;  // Graceful error UI
    }
    return this.props.children;
  }
}
```

### 4. Context API Pattern

```tsx
// 1. Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. Create provider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Create custom hook for consumption
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
```

### 5. Controlled Components (Forms)

```tsx
// Input value controlled by React state
function ContactForm() {
  const [email, setEmail] = useState('');
  
  return (
    <input
      value={email}                           // Controlled value
      onChange={(e) => setEmail(e.target.value)}  // State update
    />
  );
}
```

---

## File Structure Explained

```
src/
│
├── App.tsx                 # Root component, routing setup
├── main.tsx                # Entry point, renders App
├── vite-env.d.ts           # Vite TypeScript declarations
│
├── components/
│   ├── common/             # App-wide shared components
│   │   ├── ErrorBoundary.tsx   # Error catching component
│   │   └── index.ts            # Barrel export
│   │
│   ├── layout/             # Structural components
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Footer.tsx          # Page footer
│   │   ├── Layout.tsx          # Page wrapper with Header/Footer
│   │   ├── Section.tsx         # Reusable section wrapper
│   │   ├── ScrollToTop.tsx     # Scroll-to-top button
│   │   └── index.ts
│   │
│   └── ui/                 # Reusable UI primitives
│       ├── Button.tsx          # Button with variants
│       ├── Card.tsx            # Card container
│       ├── Input.tsx           # Form input
│       ├── Badge.tsx           # Tag/badge component
│       ├── Loading.tsx         # Loading spinners
│       ├── Icons.tsx           # SVG icon components
│       └── index.ts
│
├── constants/
│   └── index.ts            # App configuration, nav links, site info
│
├── context/
│   └── ThemeContext.tsx    # Theme provider and hook
│
├── hooks/                  # Custom React hooks
│   ├── useForm.ts              # Form state management
│   ├── useLocalStorage.ts      # localStorage sync
│   ├── useMediaQuery.ts        # CSS media query hook
│   ├── useScrollPosition.ts    # Scroll position tracker
│   └── index.ts
│
├── pages/                  # Feature-based page components
│   ├── Home/
│   │   ├── Home.tsx            # Home page component
│   │   └── index.ts
│   ├── About/
│   │   ├── About.tsx
│   │   └── index.ts
│   ├── Projects/
│   │   ├── Projects.tsx        # Projects listing
│   │   ├── ProjectDetail.tsx   # Single project view
│   │   ├── components/
│   │   │   └── ProjectCard.tsx # Project card component
│   │   └── index.ts
│   ├── Blog/
│   │   ├── Blog.tsx            # Blog listing
│   │   ├── BlogPost.tsx        # Single post view
│   │   ├── components/
│   │   │   └── BlogCard.tsx
│   │   └── index.ts
│   ├── Contact/
│   │   ├── Contact.tsx         # Contact form
│   │   └── index.ts
│   ├── NotFound/
│   │   ├── NotFound.tsx        # 404 page
│   │   └── index.ts
│   └── index.ts            # Barrel export for all pages
│
├── services/               # Data layer
│   ├── data/
│   │   ├── projects.ts         # Project data
│   │   ├── experience.ts       # Work experience data
│   │   └── blog.ts             # Blog post data
│   └── index.ts            # Service functions (getters)
│
├── styles/
│   └── index.css           # Global styles, Tailwind directives
│
├── types/
│   └── index.ts            # TypeScript interfaces and types
│
└── utils/
    └── index.ts            # Utility functions (cn, formatDate, etc.)
```

---

## Screen/Page Details

### 1. Home Page (`/`)

**Purpose:** Landing page showcasing professional summary

**Sections:**
- Hero with animated intro
- Skills showcase
- Experience timeline
- Call-to-action

```
┌──────────────────────────────────────┐
│           HERO SECTION               │
│  ┌─────────────────────────────────┐ │
│  │  "Hello, I'm Shubham"           │ │
│  │  Senior Software Engineer       │ │
│  │                                 │ │
│  │  [View My Work] [Get in Touch]  │ │
│  └─────────────────────────────────┘ │
├──────────────────────────────────────┤
│          SKILLS SECTION              │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │React │ │TS    │ │RN    │  ...   │
│  └──────┘ └──────┘ └──────┘        │
├──────────────────────────────────────┤
│        EXPERIENCE SECTION            │
│  ○ To The New (2022-Present)        │
│  │  Senior Software Engineer        │
│  ○ GreenHonchos (2022)              │
│  │  Mobile Developer                │
│  ○ ...                              │
├──────────────────────────────────────┤
│          CTA SECTION                 │
│  "Let's work together"              │
│  [Start a Conversation]             │
└──────────────────────────────────────┘
```

---

### 2. About Page (`/about`)

**Purpose:** Detailed professional background

**Sections:**
- Bio and introduction
- Skills grid with categories
- Experience timeline

---

### 3. Projects Page (`/projects`)

**Purpose:** Portfolio of work

**Components:**
- Filter by technology (optional)
- Project cards grid
- Links to project details

```
┌──────────────────────────────────────┐
│           PROJECTS                   │
│                                      │
│  ┌─────────────┐  ┌─────────────┐   │
│  │   Sooka     │  │  Damensch   │   │
│  │   [image]   │  │   [image]   │   │
│  │   OTT App   │  │  E-commerce │   │
│  │   React/DRM │  │   GraphQL   │   │
│  └─────────────┘  └─────────────┘   │
│                                      │
│  ┌─────────────┐                    │
│  │   Ketch     │                    │
│  │   [image]   │                    │
│  │  E-commerce │                    │
│  └─────────────┘                    │
└──────────────────────────────────────┘
```

---

### 4. Project Detail (`/projects/:slug`)

**Purpose:** In-depth project information

**Dynamic routing:** URL slug fetches correct project

```tsx
// Uses useParams() to get slug
const { slug } = useParams();
const project = getProjectBySlug(slug);
```

---

### 5. Blog Page (`/blog`)

**Purpose:** Technical articles and insights

**Features:**
- Category filter
- Search functionality
- Sorted by date

---

### 6. Blog Post (`/blog/:slug`)

**Purpose:** Individual article view

**Dynamic routing:** Similar to project detail

---

### 7. Contact Page (`/contact`)

**Purpose:** Contact form

**Features:**
- Form validation with useForm hook
- Controlled inputs
- Success/error states

```
┌──────────────────────────────────────┐
│           CONTACT ME                 │
│                                      │
│  Name:     [________________]        │
│  Email:    [________________]        │
│  Subject:  [________________]        │
│  Message:  [                ]        │
│            [                ]        │
│            [________________]        │
│                                      │
│            [Send Message]            │
│                                      │
│  📧 shbhm00@gmail.com               │
│  📱 +91-9695919216                  │
│  🔗 linkedin.com/in/shbhm00         │
└──────────────────────────────────────┘
```

---

### 8. 404 Page (`/*`)

**Purpose:** Handle invalid routes

**Features:**
- Friendly error message
- Link back to home

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      DEPLOYMENT FLOW                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Developer pushes to GitHub                                    │
│            │                                                     │
│            ▼                                                     │
│   ┌─────────────────┐                                           │
│   │    GitHub       │                                           │
│   │   Repository    │                                           │
│   └────────┬────────┘                                           │
│            │                                                     │
│            ▼                                                     │
│   ┌─────────────────┐    ┌─────────────────────────────────┐   │
│   │    Vercel       │───▶│  1. Clones repo                 │   │
│   │   (Hosting)     │    │  2. Runs npm install            │   │
│   └────────┬────────┘    │  3. Runs npm run build          │   │
│            │             │  4. Deploys dist/ folder        │   │
│            │             └─────────────────────────────────┘   │
│            ▼                                                     │
│   ┌─────────────────┐                                           │
│   │   Production    │                                           │
│   │   Website       │                                           │
│   │                 │                                           │
│   │  vercel.json    │  ← Handles SPA routing                   │
│   │  rewrites all   │    (all paths → index.html)              │
│   │  routes to      │                                           │
│   │  index.html     │                                           │
│   └─────────────────┘                                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Performance Optimizations

| Optimization | Implementation |
|-------------|----------------|
| **Code Splitting** | `React.lazy()` for route-based splitting |
| **Tree Shaking** | Vite removes unused code in production |
| **CSS Purging** | Tailwind removes unused CSS classes |
| **Lazy Loading** | Images load as they enter viewport |
| **Memoization** | React.memo for expensive components |
| **Minification** | JS/CSS minified in production |

---

## Summary

This portfolio demonstrates modern React development practices:

- **Type Safety** with TypeScript
- **Performance** with code splitting and lazy loading
- **Maintainability** with feature-based architecture
- **Accessibility** with semantic HTML and ARIA
- **User Experience** with smooth animations
- **Developer Experience** with linting, formatting, and hooks

The codebase is designed to be both **educational** (with comments explaining patterns) and **production-ready** (with proper error handling and optimization).

---

*Documentation last updated: January 2026*

