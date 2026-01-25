/**
 * Home Page Component
 *
 * WHY this structure:
 * - Hero section for immediate impact
 * - Featured projects to showcase best work
 * - Clear CTA to guide user actions
 * - Optimized for quick loading with lazy-loaded sections
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout';
import { Button, ArrowRightIcon, SparklesIcon } from '@/components/ui';
import { ProjectCard } from '@/pages/Projects/components/ProjectCard';
import { SITE_CONFIG, ANIMATION_VARIANTS, getStaggerDelay } from '@/constants';
import { getFeaturedProjects } from '@/services';

/**
 * Hero Section
 */
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark bg-grid opacity-50" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-50/50 to-stone-50 dark:via-stone-900/50 dark:to-stone-900" />

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '-3s' }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl">
          {/* Greeting Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6"
          >
            <SparklesIcon className="w-4 h-4" />
            <span>Available for new opportunities</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-stone-900 dark:text-stone-50 mb-6"
          >
            Hi, I'm <span className="text-gradient">{SITE_CONFIG.author}</span>
            <br />
            <span className="text-stone-600 dark:text-stone-400">{SITE_CONFIG.title}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-stone-600 dark:text-stone-400 mb-8 max-w-2xl"
          >
            4+ years of experience building scalable mobile applications using React Native and
            React. Delivered consumer-facing products with 1M+ downloads. Expert in performance
            optimization, video streaming, and cross-platform architecture.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              as="a"
              href="/projects"
              variant="primary"
              size="lg"
              rightIcon={<ArrowRightIcon className="w-5 h-5" />}
            >
              View My Work
            </Button>
            <Button as="a" href="/contact" variant="outline" size="lg">
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile, shown on tablet+ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <div className="flex flex-col items-center gap-2 text-stone-400">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border-2 border-stone-400 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-stone-400 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/**
 * Featured Projects Section
 */
function FeaturedProjectsSection() {
  const featuredProjects = getFeaturedProjects();

  return (
    <Section title="Featured Projects" subtitle="A selection of my recent work and side projects">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={ANIMATION_VARIANTS.staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={ANIMATION_VARIANTS.fadeUp}
            transition={{ delay: getStaggerDelay(index) }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>

      {/* View All Link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center"
      >
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:gap-3 transition-all"
        >
          View all projects
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </motion.div>
    </Section>
  );
}

/**
 * CTA Section
 */
function CTASection() {
  return (
    <Section alternate>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={ANIMATION_VARIANTS.fadeUp}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-display text-stone-900 dark:text-stone-50 mb-4">
          Let's Work Together
        </h2>
        <p className="text-lg text-stone-600 dark:text-stone-400 mb-8 max-w-2xl mx-auto">
          I'm always interested in hearing about new projects and opportunities. Whether you have a
          question or just want to say hi, feel free to reach out!
        </p>
        <Button
          as="a"
          href="/contact"
          variant="primary"
          size="lg"
          rightIcon={<ArrowRightIcon className="w-5 h-5" />}
        >
          Start a Conversation
        </Button>
      </motion.div>
    </Section>
  );
}

/**
 * Home Page
 */
export function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProjectsSection />
      <CTASection />
    </>
  );
}
