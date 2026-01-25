/**
 * Project Detail Page
 *
 * WHY this structure:
 * - Detailed view of individual projects
 * - Shows technologies, links, and full description
 * - Related projects for continued engagement
 * - SEO-friendly with proper heading hierarchy
 */

import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout';
import {
  Button,
  Badge,
  GitHubIcon,
  ExternalLinkIcon,
  ChevronLeftIcon,
  CalendarIcon,
} from '@/components/ui';
import { ProjectCard } from './components/ProjectCard';
import { getProjectBySlug, getRelatedProjects } from '@/services';
import { ANIMATION_VARIANTS, getStaggerDelay } from '@/constants';
import { formatDateRange } from '@/utils';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const relatedProjects = slug ? getRelatedProjects(slug, 3) : [];

  // Redirect to 404 if project not found
  if (!project) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      {/* Back Link */}
      <Section noPadding className="pt-8 pb-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            Back to Projects
          </Link>
        </motion.div>
      </Section>

      {/* Hero Section */}
      <Section noPadding className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Project Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-video rounded-2xl overflow-hidden shadow-soft-lg"
          >
            <img
              src={project.imageUrl}
              alt={`${project.title} screenshot`}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Project Info */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={ANIMATION_VARIANTS.staggerContainer}
          >
            {/* Status */}
            <motion.div variants={ANIMATION_VARIANTS.fadeUp}>
              <Badge
                variant={project.status === 'completed' ? 'success' : 'warning'}
                className="mb-4"
              >
                {project.status === 'completed' ? 'Completed' : 'In Progress'}
              </Badge>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={ANIMATION_VARIANTS.fadeUp}
              className="text-3xl md:text-4xl lg:text-5xl font-display text-stone-900 dark:text-stone-50 mb-4"
            >
              {project.title}
            </motion.h1>

            {/* Date */}
            <motion.div
              variants={ANIMATION_VARIANTS.fadeUp}
              className="flex items-center gap-2 text-stone-600 dark:text-stone-400 mb-4"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>{formatDateRange(project.startDate, project.endDate)}</span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={ANIMATION_VARIANTS.fadeUp}
              className="text-lg text-stone-600 dark:text-stone-400 mb-6"
            >
              {project.description}
            </motion.p>

            {/* Technologies */}
            <motion.div variants={ANIMATION_VARIANTS.fadeUp} className="mb-8">
              <h3 className="text-sm font-medium text-stone-500 dark:text-stone-500 uppercase tracking-wider mb-3">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech.name} variant="primary">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Links */}
            <motion.div variants={ANIMATION_VARIANTS.fadeUp} className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <Button
                  as="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  rightIcon={<ExternalLinkIcon className="w-4 h-4" />}
                >
                  View Live Site
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  as="a"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  leftIcon={<GitHubIcon className="w-4 h-4" />}
                >
                  View Source
                </Button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Long Description */}
      {project.longDescription && (
        <Section alternate>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-display text-stone-900 dark:text-stone-50 mb-6">
              About This Project
            </h2>
            <div className="prose prose-stone dark:prose-invert max-w-none">
              {/* Simple markdown rendering - in production, use a proper markdown parser */}
              {project.longDescription.split('\n').map((paragraph, idx) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h3
                      key={idx}
                      className="text-xl font-display mt-8 mb-4 text-stone-900 dark:text-stone-50"
                    >
                      {paragraph.replace('## ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  return (
                    <li key={idx} className="text-stone-600 dark:text-stone-400 ml-4">
                      {paragraph.replace('- ', '')}
                    </li>
                  );
                }
                if (paragraph.trim()) {
                  return (
                    <p key={idx} className="text-stone-600 dark:text-stone-400 mb-4">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </motion.div>
        </Section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <Section title="Related Projects" subtitle="More projects you might be interested in">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={ANIMATION_VARIANTS.staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {relatedProjects.map((relatedProject, index) => (
              <motion.div
                key={relatedProject.id}
                variants={ANIMATION_VARIANTS.fadeUp}
                transition={{ delay: getStaggerDelay(index) }}
              >
                <ProjectCard project={relatedProject} />
              </motion.div>
            ))}
          </motion.div>
        </Section>
      )}
    </>
  );
}
