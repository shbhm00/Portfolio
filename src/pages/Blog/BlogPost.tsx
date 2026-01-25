/**
 * Blog Post Page
 *
 * WHY this structure:
 * - Clear reading experience
 * - Author info for credibility
 * - Related posts for engagement
 * - Share functionality
 */

import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout';
import { Badge, ChevronLeftIcon, CalendarIcon, ClockIcon } from '@/components/ui';
import { BlogCard } from './components/BlogCard';
import { getBlogPostBySlug, getRelatedPosts } from '@/services';
import { ANIMATION_VARIANTS, getStaggerDelay } from '@/constants';
import { formatDate } from '@/utils';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const relatedPosts = slug ? getRelatedPosts(slug, 3) : [];

  // Redirect to 404 if post not found
  if (!post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      {/* Back Link */}
      <Section noPadding className="pt-8 pb-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            Back to Blog
          </Link>
        </motion.div>
      </Section>

      {/* Article Header */}
      <Section noPadding className="py-8">
        <motion.article
          initial="hidden"
          animate="visible"
          variants={ANIMATION_VARIANTS.staggerContainer}
          className="max-w-3xl mx-auto"
        >
          {/* Tags */}
          <motion.div variants={ANIMATION_VARIANTS.fadeUp} className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="primary">
                {tag}
              </Badge>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={ANIMATION_VARIANTS.fadeUp}
            className="text-3xl md:text-4xl lg:text-5xl font-display text-stone-900 dark:text-stone-50 mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Meta Info */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeUp}
            className="flex flex-wrap items-center gap-6 text-stone-600 dark:text-stone-400 mb-8"
          >
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold">
                {post.author.name.charAt(0)}
              </div>
              <span className="font-medium">{post.author.name}</span>
            </div>

            {/* Date */}
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </span>

            {/* Reading Time */}
            <span className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              {post.readingTime} min read
            </span>
          </motion.div>

          {/* Cover Image */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeUp}
            className="relative aspect-video rounded-2xl overflow-hidden shadow-soft-lg mb-8"
          >
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </motion.div>

          {/* Content */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeUp}
            className="prose prose-stone dark:prose-invert prose-lg max-w-none"
          >
            {/* Simple markdown rendering */}
            {post.content.split('\n').map((line, idx) => {
              // Headers
              if (line.startsWith('# ')) {
                return (
                  <h2 key={idx} className="text-2xl font-display mt-8 mb-4">
                    {line.replace('# ', '')}
                  </h2>
                );
              }
              if (line.startsWith('## ')) {
                return (
                  <h3 key={idx} className="text-xl font-display mt-6 mb-3">
                    {line.replace('## ', '')}
                  </h3>
                );
              }
              if (line.startsWith('### ')) {
                return (
                  <h4 key={idx} className="text-lg font-display mt-4 mb-2">
                    {line.replace('### ', '')}
                  </h4>
                );
              }
              // Code blocks (simplified)
              if (line.startsWith('```')) {
                return null; // Skip code fence markers
              }
              // List items
              if (line.startsWith('- ')) {
                return (
                  <li key={idx} className="ml-4">
                    {line.replace('- ', '')}
                  </li>
                );
              }
              if (line.startsWith('- [ ] ')) {
                return (
                  <li key={idx} className="ml-4 flex items-center gap-2">
                    <input type="checkbox" disabled className="rounded" />
                    {line.replace('- [ ] ', '')}
                  </li>
                );
              }
              // Regular paragraphs
              if (line.trim()) {
                return (
                  <p key={idx} className="mb-4">
                    {line}
                  </p>
                );
              }
              return null;
            })}
          </motion.div>
        </motion.article>
      </Section>

      {/* Author Bio */}
      <Section noPadding className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-stone-100 dark:bg-stone-800 rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-center sm:items-start">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-2xl font-bold shrink-0">
              {post.author.name.charAt(0)}
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-display text-stone-900 dark:text-stone-50 mb-1">
                Written by {post.author.name}
              </h3>
              <p className="text-stone-600 dark:text-stone-400">{post.author.bio}</p>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section title="Related Posts" subtitle="More articles you might enjoy" alternate>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={ANIMATION_VARIANTS.staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {relatedPosts.map((relatedPost, index) => (
              <motion.div
                key={relatedPost.id}
                variants={ANIMATION_VARIANTS.fadeUp}
                transition={{ delay: getStaggerDelay(index) }}
              >
                <BlogCard post={relatedPost} />
              </motion.div>
            ))}
          </motion.div>
        </Section>
      )}
    </>
  );
}
