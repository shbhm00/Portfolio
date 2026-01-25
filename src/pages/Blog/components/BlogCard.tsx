/**
 * BlogCard Component
 *
 * WHY this design:
 * - Clear hierarchy with image, title, excerpt
 * - Shows reading time and date for context
 * - Tags for topic discovery
 * - Responsive image handling
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, Badge, CalendarIcon, ClockIcon } from '@/components/ui';
import { getBlogPostPath } from '@/constants';
import { formatDate } from '@/utils';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      to={getBlogPostPath(post.slug)}
      className="group block h-full"
      aria-label={`Read ${post.title}`}
    >
      <Card hover clickable noPadding className="h-full flex flex-col">
        {/* Cover Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={post.coverImage}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {post.featured && (
            <div className="absolute top-4 left-4">
              <Badge variant="primary" size="sm">
                Featured
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="flex-1 flex flex-col p-6">
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-stone-500 dark:text-stone-400 mb-3">
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              {formatDate(post.publishedAt, { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              {post.readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-display text-stone-900 dark:text-stone-50 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-stone-600 dark:text-stone-400 text-sm mb-4 flex-1 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

/**
 * Featured Blog Card - Larger variant for homepage/featured section
 */
export function FeaturedBlogCard({ post }: BlogCardProps) {
  return (
    <Link to={getBlogPostPath(post.slug)} className="group block" aria-label={`Read ${post.title}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-stone-800 rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-shadow"
      >
        {/* Image */}
        <div className="relative aspect-video md:aspect-auto overflow-hidden">
          <img
            src={post.coverImage}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col justify-center">
          <Badge variant="primary" className="mb-4 w-fit">
            Featured
          </Badge>

          <h2 className="text-2xl md:text-3xl font-display text-stone-900 dark:text-stone-50 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {post.title}
          </h2>

          <p className="text-stone-600 dark:text-stone-400 mb-4 line-clamp-3">{post.excerpt}</p>

          <div className="flex items-center gap-4 text-sm text-stone-500 dark:text-stone-400">
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              {post.readingTime} min read
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
