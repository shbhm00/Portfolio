/**
 * Projects Page
 *
 * WHY this structure:
 * - Grid layout for project cards
 * - Filter/sort options for larger collections
 * - Responsive design with mobile-first approach
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout';
import { Button } from '@/components/ui';
import { ProjectCard } from './components/ProjectCard';
import { getAllProjects } from '@/services';
import { ANIMATION_VARIANTS, getStaggerDelay } from '@/constants';
import type { ProjectStatus } from '@/types';

type FilterOption = 'all' | ProjectStatus;

const filterOptions: { value: FilterOption; label: string }[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'completed', label: 'Completed' },
  { value: 'in-progress', label: 'In Progress' },
];

export function Projects() {
  const [filter, setFilter] = useState<FilterOption>('all');
  const allProjects = getAllProjects();

  /**
   * Filter projects based on selected filter
   *
   * LEARNING NOTE: useMemo prevents recalculating the filtered list
   * on every render - only recalculates when filter or projects change.
   */
  const filteredProjects = useMemo(() => {
    if (filter === 'all') return allProjects;
    return allProjects.filter((project) => project.status === filter);
  }, [filter, allProjects]);

  return (
    <>
      {/* Page Header */}
      <Section noPadding className="pt-16 pb-8">
        <motion.div initial="hidden" animate="visible" variants={ANIMATION_VARIANTS.fadeUp}>
          <h1 className="text-4xl md:text-5xl font-display text-stone-900 dark:text-stone-50 mb-4">
            Projects
          </h1>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl">
            A collection of my work including personal projects, client work, and open source
            contributions.
          </p>
        </motion.div>
      </Section>

      {/* Filter Bar */}
      <Section noPadding className="py-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2"
        >
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={filter === option.value ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilter(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </motion.div>
      </Section>

      {/* Projects Grid */}
      <Section noPadding className="pb-16">
        <motion.div
          key={filter} // Re-animate when filter changes
          initial="hidden"
          animate="visible"
          variants={ANIMATION_VARIANTS.staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={ANIMATION_VARIANTS.fadeUp}
              transition={{ delay: getStaggerDelay(index) }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-stone-600 dark:text-stone-400">
              No projects found with the current filter.
            </p>
            <Button variant="secondary" className="mt-4" onClick={() => setFilter('all')}>
              Show All Projects
            </Button>
          </motion.div>
        )}
      </Section>
    </>
  );
}
