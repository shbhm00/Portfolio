/**
 * Services Index
 *
 * Barrel export for all data services.
 * In a real app, these would typically be API calls.
 */

// Project services
export {
  getAllProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getRelatedProjects,
} from './data/projects';

// Blog services
export {
  getAllBlogPosts,
  getFeaturedBlogPosts,
  getBlogPostBySlug,
  getBlogPostsByTag,
  getAllTags,
  getRelatedPosts,
} from './data/blog';

// Experience services
export { getAllExperiences, getAllSkillCategories } from './data/experience';
