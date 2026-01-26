/**
 * Experience & Skills Data
 *
 * Shubham Mishra's professional experience and skill set
 */

import type { Experience, SkillCategory } from '@/types';

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'To The New',
    position: 'Senior Software Engineer',
    location: 'Noida, India',
    startDate: '2022-11',
    description:
      'Leading development of high-traffic mobile features serving 1M+ users, focusing on performance, stability, and scalability.',
    achievements: [
      'Led development of high-traffic mobile features serving 1M+ users with focus on performance and scalability',
      'Modernized large React Native codebases by migrating to TypeScript and improving Redux architecture',
      'Built reusable UI components and internal libraries, improving development velocity across teams',
      'Mentored engineers through code reviews and architectural guidance; improved CI/CD pipelines and release automation',
    ],
    technologies: ['React Native', 'TypeScript', 'Redux Toolkit', 'React Query', 'CI/CD'],
  },
  {
    id: '2',
    company: 'GreenHonchos',
    position: 'Mobile Application Developer',
    location: 'Noida, India',
    startDate: '2022-04',
    endDate: '2022-10',
    description:
      'Developed core E-commerce flows and integrated GraphQL APIs with efficient caching and state management.',
    achievements: [
      'Developed core E-commerce flows including product listing, PDP, cart, checkout, and user profiles',
      'Integrated GraphQL APIs with efficient caching and state management to reduce unnecessary re-renders',
      'Collaborated with backend and design teams to ship stable Android and iOS releases',
      'Resolved production issues quickly and maintained app stability',
    ],
    technologies: ['React Native', 'GraphQL', 'Redux', 'TypeScript', 'Android', 'iOS'],
  },
  {
    id: '3',
    company: 'Appinventiv',
    position: 'Software Engineer',
    location: 'Noida, India',
    startDate: '2021-03',
    endDate: '2022-03',
    description:
      'Built cross-platform features and modular UI components using React Native for multiple client applications.',
    achievements: [
      'Built cross-platform features and modular UI components using React Native',
      'Worked on API integrations and navigation flows for multiple client applications',
      'Implemented debugging strategies and platform-specific optimizations',
      'Collaborated with cross-functional teams to deliver quality mobile apps',
    ],
    technologies: ['React Native', 'JavaScript', 'Redux', 'REST APIs', 'Android', 'iOS'],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: 'Mobile Development',
    skills: [
      { name: 'React Native', level: 'expert', yearsOfExperience: 4 },
      { name: 'Android (Java/Kotlin)', level: 'advanced', yearsOfExperience: 4 },
      { name: 'iOS (Swift/Obj-C)', level: 'advanced', yearsOfExperience: 4 },
      { name: 'React Navigation', level: 'expert', yearsOfExperience: 4 },
      { name: 'Reanimated', level: 'advanced', yearsOfExperience: 3 },
      { name: 'Native Bridging / Turbo Modules', level: 'advanced', yearsOfExperience: 3 },
    ],
  },
  {
    name: 'Web Development',
    skills: [
      { name: 'React', level: 'expert', yearsOfExperience: 4 },
      { name: 'TypeScript', level: 'expert', yearsOfExperience: 4 },
      { name: 'JavaScript (ES6+)', level: 'expert', yearsOfExperience: 4 },
      { name: 'Tailwind CSS', level: 'advanced', yearsOfExperience: 2 },
      { name: 'HTML5 / CSS3', level: 'expert', yearsOfExperience: 4 },
      { name: 'Responsive Design', level: 'expert', yearsOfExperience: 4 },
    ],
  },
  {
    name: 'State & Data Management',
    skills: [
      { name: 'Redux Toolkit', level: 'expert', yearsOfExperience: 4 },
      { name: 'React Query / TanStack', level: 'advanced', yearsOfExperience: 2 },
      { name: 'Zustand', level: 'advanced', yearsOfExperience: 2 },
      { name: 'GraphQL', level: 'advanced', yearsOfExperience: 2 },
      { name: 'REST APIs', level: 'expert', yearsOfExperience: 4 },
      { name: 'Context API', level: 'expert', yearsOfExperience: 4 },
    ],
  },
  {
    name: 'Video & Streaming',
    skills: [
      { name: 'HLS/DASH Streaming', level: 'advanced', yearsOfExperience: 2 },
      { name: 'DRM Integration', level: 'advanced', yearsOfExperience: 2 },
      { name: 'SSAI / CSAI (Ad Insertion)', level: 'advanced', yearsOfExperience: 2 },
      { name: 'Adaptive Bitrate', level: 'advanced', yearsOfExperience: 2 },
      { name: 'PIP / AirPlay / Chromecast', level: 'intermediate', yearsOfExperience: 2 },
    ],
  },
  {
    name: 'Tools & DevOps',
    skills: [
      { name: 'Git / GitHub', level: 'expert', yearsOfExperience: 4 },
      { name: 'Android Studio', level: 'advanced', yearsOfExperience: 4 },
      { name: 'Xcode', level: 'advanced', yearsOfExperience: 4 },
      { name: 'Firebase', level: 'advanced', yearsOfExperience: 3 },
      { name: 'CI/CD (Fastlane, GitHub Actions)', level: 'advanced', yearsOfExperience: 3 },
      { name: 'Vite / Webpack', level: 'advanced', yearsOfExperience: 2 },
    ],
  },
  {
    name: 'Soft Skills & Leadership',
    skills: [
      { name: 'Technical Leadership', level: 'advanced' },
      { name: 'Team Mentoring', level: 'advanced' },
      { name: 'Code Reviews', level: 'expert' },
      { name: 'System Architecture', level: 'advanced' },
      { name: 'Performance Optimization', level: 'expert' },
      { name: 'Agile / Scrum', level: 'advanced' },
    ],
  },
];

/**
 * Get all experiences sorted by date (most recent first)
 */
export function getAllExperiences(): Experience[] {
  return [...experiences].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
}

/**
 * Get all skill categories
 */
export function getAllSkillCategories(): SkillCategory[] {
  return skillCategories;
}
