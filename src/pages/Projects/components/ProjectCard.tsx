/**
 * ProjectCard Component
 *
 * WHY this design:
 * - Reusable card component for project listings
 * - Shows key information at a glance
 * - Hover effects for interactivity
 * - Accessible with proper link behavior
 *
 * LEARNING NOTE: This component demonstrates the "compound" pattern
 * where we use the Card components we created earlier for composition.
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, Badge, ArrowUpRightIcon } from '@/components/ui';
import { getProjectPath } from '@/constants';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={getProjectPath(project.slug)}
      className="group block h-full"
      aria-label={`View ${project.title} project details`}
    >
      <Card hover clickable noPadding className="h-full flex flex-col overflow-hidden">
        {/* Project Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.imageUrl}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />

          {/* Status Badge */}
          {project.status === 'in-progress' && (
            <div className="absolute top-4 right-4">
              <Badge variant="warning" size="sm">
                In Progress
              </Badge>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* View Project Text */}
          <motion.div
            className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          >
            <span className="text-sm font-medium">View Project</span>
            <ArrowUpRightIcon className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Content */}
        <CardContent className="flex-1 flex flex-col p-6">
          {/* Title */}
          <h3 className="text-xl font-display text-stone-900 dark:text-stone-50 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-stone-600 dark:text-stone-400 text-sm mb-4 flex-1">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech.name} variant="secondary" size="sm">
                {tech.name}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="secondary" size="sm">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
