/**
 * Blog Post Page
 *
 * WHY this structure:
 * - Reading progress bar for visual feedback on long articles
 * - Table of contents sidebar (desktop) / collapsible (mobile) for navigation
 * - Proper markdown rendering with code blocks, formatting, and copy buttons
 * - Author info for credibility
 * - Share buttons for engagement
 * - Related posts for continued reading
 */

import { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout';
import { Badge, ChevronLeftIcon, CalendarIcon, ClockIcon } from '@/components/ui';
import { BlogCard } from './components/BlogCard';
import { MarkdownContent, extractHeadings } from './components/MarkdownContent';
import { ReadingProgress, useReadingProgress } from './components/ReadingProgress';
import { TableOfContents, MobileTableOfContents } from './components/TableOfContents';
import { ShareButtons } from './components/ShareButtons';
import { getBlogPostBySlug, getRelatedPosts } from '@/services';
import { ANIMATION_VARIANTS, getStaggerDelay } from '@/constants';
import { useSEO } from '@/hooks';
import { formatDate } from '@/utils';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const relatedPosts = slug ? getRelatedPosts(slug, 3) : [];

  // Extract headings for table of contents
  const headings = useMemo(() => {
    return post ? extractHeadings(post.content) : [];
  }, [post]);

  // SEO meta tags for individual blog posts
  useSEO({
    title: post?.title,
    description: post?.excerpt,
    path: slug ? `/blog/${slug}` : '/blog',
    image: post?.coverImage,
    type: 'article',
  });

  // Reading progress tracking
  const { minutesLeft, progress } = useReadingProgress(post?.readingTime ?? 0);

  // Redirect to 404 if post not found
  if (!post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* Back Link + Reading Progress Info */}
      <Section noPadding className="pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Estimated reading time remaining */}
          {progress > 0.05 && progress < 0.95 && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-stone-500 dark:text-stone-400"
            >
              {minutesLeft} min left
            </motion.span>
          )}
        </motion.div>
      </Section>

      {/* Article Header */}
      <Section noPadding className="py-8">
        <motion.header
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
            className="text-3xl md:text-4xl lg:text-5xl font-display text-stone-900 dark:text-stone-50 mb-6 text-balance"
          >
            {post.title}
          </motion.h1>

          {/* Meta Info + Share */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeUp}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
          >
            <div className="flex flex-wrap items-center gap-6 text-stone-600 dark:text-stone-400">
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
            </div>

            {/* Share Buttons */}
            <ShareButtons title={post.title} />
          </motion.div>

          {/* Cover Image */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeUp}
            className="relative aspect-video rounded-2xl overflow-hidden shadow-soft-lg"
          >
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
            {/* Subtle gradient overlay at bottom for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </motion.div>
        </motion.header>
      </Section>

      {/* Article Content + TOC Sidebar */}
      <Section noPadding className="py-8">
        <div className="flex gap-10">
          {/* Main Content */}
          <motion.article
            initial="hidden"
            animate="visible"
            variants={ANIMATION_VARIANTS.fadeUp}
            className="max-w-3xl mx-auto flex-1 min-w-0"
          >
            {/* Mobile Table of Contents */}
            <MobileTableOfContents headings={headings} />

            {/* Markdown Content */}
            <MarkdownContent content={post.content} />
          </motion.article>

          {/* Desktop Table of Contents Sidebar */}
          <div className="hidden xl:block w-64 flex-shrink-0">
            <TableOfContents headings={headings} />
          </div>
        </div>
      </Section>

      {/* Author Bio */}
      <Section noPadding className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-stone-100 dark:bg-stone-800 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-4 items-center sm:items-start">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-2xl font-bold shrink-0">
              {post.author.name.charAt(0)}
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-1">Written by</p>
              <h3 className="text-lg font-display text-stone-900 dark:text-stone-50 mb-2">
                {post.author.name}
              </h3>
              <p className="text-stone-600 dark:text-stone-400">{post.author.bio}</p>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Bottom Share Bar */}
      <Section noPadding className="pb-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700"
        >
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Enjoyed this article? Share it with your network.
          </p>
          <ShareButtons title={post.title} />
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
