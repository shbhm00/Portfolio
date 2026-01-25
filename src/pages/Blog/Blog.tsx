/**
 * Blog Page
 *
 * WHY this structure:
 * - Featured post highlighted at top
 * - Grid of all posts
 * - Tag filtering (scalable for larger blogs)
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout';
import { Button, Badge } from '@/components/ui';
import { BlogCard, FeaturedBlogCard } from './components/BlogCard';
import { getAllBlogPosts, getFeaturedBlogPosts, getAllTags } from '@/services';
import { ANIMATION_VARIANTS, getStaggerDelay } from '@/constants';

export function Blog() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const allPosts = getAllBlogPosts();
  const featuredPosts = getFeaturedBlogPosts();
  const allTags = getAllTags();

  // Filter posts by tag
  const filteredPosts = useMemo(() => {
    if (!selectedTag) return allPosts;
    return allPosts.filter((post) => post.tags.includes(selectedTag));
  }, [selectedTag, allPosts]);

  // Get the first featured post for the hero
  const heroPost = featuredPosts[0];
  const regularPosts = selectedTag
    ? filteredPosts
    : filteredPosts.filter((p) => p.id !== heroPost?.id);

  return (
    <>
      {/* Page Header */}
      <Section noPadding className="pt-16 pb-8">
        <motion.div initial="hidden" animate="visible" variants={ANIMATION_VARIANTS.fadeUp}>
          <h1 className="text-4xl md:text-5xl font-display text-stone-900 dark:text-stone-50 mb-4">
            Blog
          </h1>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl">
            Thoughts on web development, programming, and technology. I write about what I learn and
            share my experiences.
          </p>
        </motion.div>
      </Section>

      {/* Tags Filter */}
      <Section noPadding className="py-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2"
        >
          <Button
            variant={selectedTag === null ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedTag(null)}
          >
            All Posts
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </motion.div>
      </Section>

      {/* Featured Post */}
      {!selectedTag && heroPost && (
        <Section noPadding className="py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FeaturedBlogCard post={heroPost} />
          </motion.div>
        </Section>
      )}

      {/* Blog Posts Grid */}
      <Section noPadding className="pb-16">
        {selectedTag && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex items-center gap-2"
          >
            <span className="text-stone-600 dark:text-stone-400">Showing posts tagged:</span>
            <Badge variant="primary">{selectedTag}</Badge>
            <button
              onClick={() => setSelectedTag(null)}
              className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
            >
              Clear filter
            </button>
          </motion.div>
        )}

        <motion.div
          key={selectedTag ?? 'all'}
          initial="hidden"
          animate="visible"
          variants={ANIMATION_VARIANTS.staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {regularPosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={ANIMATION_VARIANTS.fadeUp}
              transition={{ delay: getStaggerDelay(index) }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {regularPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-stone-600 dark:text-stone-400">
              No posts found with the selected tag.
            </p>
            <Button variant="secondary" className="mt-4" onClick={() => setSelectedTag(null)}>
              Show All Posts
            </Button>
          </motion.div>
        )}
      </Section>
    </>
  );
}
