/**
 * Projects Data
 *
 * Shubham Mishra's professional projects
 */

import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Sooka OTT Platform',
    slug: 'sooka-ott-platform',
    description:
      'A high-performance OTT streaming platform with 1M+ downloads and 35K+ concurrent users, featuring DRM, live streaming, and short-video feeds.',
    longDescription: `
Built and optimized a complete OTT streaming platform serving millions of users with high concurrent traffic.

## Key Features
- **Video Playback**: End-to-end video playback with DRM protection, SSAI ad integration, and adaptive bitrate streaming
- **Live Streaming**: Real-time live content delivery with low latency
- **Short-Video Feeds**: TikTok-style reels with viewability tracking and auto-play logic
- **Performance**: Optimized video startup time to under 2 seconds

## Technical Highlights
- Implemented buffering strategies, retry mechanisms, and fallback handling for seamless playback
- Developed high-performance short-video and reel feeds with viewability tracking
- Integrated comprehensive analytics to track playback failures, startup latency, stalls, and engagement metrics
- Handled 35K+ concurrent users with optimized performance

## Results
- 1M+ app downloads
- Video startup time reduced to < 2 seconds
- 35K+ peak concurrent users handled smoothly
    `,
    technologies: [
      { name: 'React Native', color: '#61DAFB' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'DRM', color: '#FF6B6B' },
      { name: 'HLS/DASH', color: '#4ECDC4' },
      { name: 'Redux Toolkit', color: '#764ABC' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=600&fit=crop',
    status: 'completed',
    featured: true,
    startDate: '2022-11',
  },
  {
    id: '2',
    title: 'Damensch E-commerce App',
    slug: 'damensch-ecommerce',
    description:
      'A feature-rich e-commerce mobile app with 500K+ downloads, featuring product discovery, variant selection, and analytics integration.',
    longDescription: `
Developed a comprehensive e-commerce mobile application for a leading D2C fashion brand.

## Key Features
- **Product Discovery**: Intuitive browsing with category filters and search
- **Product Detail Pages**: Rich PDP with variant selection, inventory checks, and pricing logic
- **Performance**: Lazy loading, skeleton screens, and virtualized lists for smooth scrolling
- **Analytics**: Comprehensive tracking of impressions, clicks, carts, and conversions

## Technical Highlights
- Implemented performant home feeds using lazy loading and virtualization
- Built variant selection with real-time inventory validation
- Integrated analytics pipeline for tracking user behavior
- Optimized app performance for smooth 60fps scrolling

## Results
- 500K+ app downloads
- Improved conversion rates through optimized UX
- Smooth performance even with large product catalogs
    `,
    technologies: [
      { name: 'React Native', color: '#61DAFB' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'Redux', color: '#764ABC' },
      { name: 'Analytics', color: '#4285F4' },
      { name: 'REST APIs', color: '#FF6B6B' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    status: 'completed',
    featured: true,
    startDate: '2022-11',
  },
  {
    id: '3',
    title: 'Ketch E-commerce App',
    slug: 'ketch-ecommerce',
    description:
      'A GraphQL-driven e-commerce app with 1M+ downloads, featuring efficient caching, OTP authentication, and smooth animations.',
    longDescription: `
Built a high-performance e-commerce mobile application using modern GraphQL architecture.

## Key Features
- **GraphQL Integration**: Efficient data fetching with smart caching and pagination
- **Authentication**: OTP-based login with token refresh and secure storage
- **Smooth UX**: Reanimated-powered animations for delightful interactions
- **Stability**: Hermes engine integration for improved performance

## Technical Highlights
- Implemented GraphQL-driven browsing, filtering, and pagination with efficient cache updates
- Built secure OTP-based authentication with token refresh mechanisms
- Improved app stability using Hermes JavaScript engine
- Created smooth animations with React Native Reanimated

## Results
- 1M+ app downloads
- Significantly improved app stability and UI smoothness
- Fast data loading with smart caching
    `,
    technologies: [
      { name: 'React Native', color: '#61DAFB' },
      { name: 'GraphQL', color: '#E10098' },
      { name: 'Reanimated', color: '#FF4785' },
      { name: 'Hermes', color: '#4A90D9' },
      { name: 'TypeScript', color: '#3178C6' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop',
    status: 'completed',
    featured: true,
    startDate: '2021-03',
    endDate: '2022-03',
  },
  {
    id: '4',
    title: 'Internal Component Library',
    slug: 'component-library',
    description:
      'A reusable React Native component library built to improve development velocity across multiple teams.',
    longDescription: `
Created an internal component library to standardize UI development across projects.

## Key Features
- **Reusable Components**: Buttons, inputs, cards, modals, and more
- **Theming Support**: Consistent styling with theme customization
- **Documentation**: Comprehensive usage docs and examples
- **TypeScript**: Full type safety with extensive type definitions

## Technical Highlights
- Built modular, composable components following atomic design principles
- Implemented comprehensive TypeScript types for better DX
- Created Storybook documentation for component showcase
- Reduced development time significantly across teams
    `,
    technologies: [
      { name: 'React Native', color: '#61DAFB' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'Storybook', color: '#FF4785' },
      { name: 'Reanimated', color: '#FF4785' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    status: 'completed',
    featured: false,
    startDate: '2023-01',
  },
  {
    id: '5',
    title: 'CI/CD Pipeline Automation',
    slug: 'cicd-automation',
    description:
      'Automated build and release pipelines for React Native apps using Fastlane and GitHub Actions.',
    longDescription: `
Designed and implemented automated CI/CD pipelines for mobile app releases.

## Key Features
- **Automated Builds**: One-click builds for both Android and iOS
- **Testing**: Automated unit and integration test runs
- **Deployment**: Automated deployment to TestFlight and Play Store
- **Code Quality**: Linting and type checking in CI

## Technical Highlights
- Set up Fastlane for iOS and Android build automation
- Configured GitHub Actions for CI workflows
- Implemented automated versioning and changelog generation
- Reduced release time from hours to minutes
    `,
    technologies: [
      { name: 'Fastlane', color: '#00F200' },
      { name: 'GitHub Actions', color: '#2088FF' },
      { name: 'React Native', color: '#61DAFB' },
      { name: 'Firebase', color: '#FFCA28' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop',
    status: 'completed',
    featured: false,
    startDate: '2023-06',
  },
];

/**
 * Get all projects
 */
export function getAllProjects(): Project[] {
  return projects;
}

/**
 * Get featured projects
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

/**
 * Get a project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * Get related projects (same technologies)
 */
export function getRelatedProjects(currentSlug: string, limit = 3): Project[] {
  const current = getProjectBySlug(currentSlug);
  if (!current) return [];

  const currentTechNames = current.technologies.map((t) => t.name);

  return projects
    .filter((p) => p.slug !== currentSlug)
    .map((project) => ({
      project,
      matchCount: project.technologies.filter((t) => currentTechNames.includes(t.name)).length,
    }))
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, limit)
    .map((item) => item.project);
}
