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
    name: 'Languages & Frameworks',
    skills: [
      { name: 'React Native', level: 'expert', yearsOfExperience: 4 },
      { name: 'React', level: 'expert', yearsOfExperience: 4 },
      { name: 'TypeScript', level: 'expert', yearsOfExperience: 4 },
      { name: 'JavaScript (ES6+)', level: 'expert', yearsOfExperience: 4 },
      { name: 'Redux Toolkit', level: 'advanced', yearsOfExperience: 3 },
      { name: 'React Query', level: 'advanced', yearsOfExperience: 2 },
    ],
  },
  {
    name: 'Mobile Engineering',
    skills: [
      { name: 'Performance Optimization', level: 'expert', yearsOfExperience: 4 },
      { name: 'Native Bridging', level: 'advanced', yearsOfExperience: 3 },
      { name: 'Turbo Modules', level: 'advanced', yearsOfExperience: 2 },
      { name: 'React Navigation', level: 'expert', yearsOfExperience: 4 },
      { name: 'Reanimated', level: 'advanced', yearsOfExperience: 3 },
      { name: 'Secure Storage', level: 'advanced', yearsOfExperience: 3 },
    ],
  },
  {
    name: 'Video & Media',
    skills: [
      { name: 'HLS/DASH Streaming', level: 'advanced', yearsOfExperience: 2 },
      { name: 'DRM Integration', level: 'advanced', yearsOfExperience: 2 },
      { name: 'SSAI/CSAI', level: 'advanced', yearsOfExperience: 2 },
      { name: 'Adaptive Bitrate', level: 'advanced', yearsOfExperience: 2 },
      { name: 'PIP / AirPlay / Chromecast', level: 'intermediate', yearsOfExperience: 2 },
    ],
  },
  {
    name: 'Tools & Platforms',
    skills: [
      { name: 'Android Studio', level: 'advanced', yearsOfExperience: 4 },
      { name: 'Xcode', level: 'advanced', yearsOfExperience: 4 },
      { name: 'Git', level: 'expert', yearsOfExperience: 4 },
      { name: 'Firebase', level: 'advanced', yearsOfExperience: 3 },
      { name: 'Fastlane', level: 'advanced', yearsOfExperience: 2 },
      { name: 'CI/CD', level: 'advanced', yearsOfExperience: 3 },
    ],
  },
  {
    name: 'Soft Skills',
    skills: [
      { name: 'Technical Leadership', level: 'advanced' },
      { name: 'Mentoring', level: 'advanced' },
      { name: 'System Thinking', level: 'advanced' },
      { name: 'Code Reviews', level: 'expert' },
      { name: 'Ownership', level: 'expert' },
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
