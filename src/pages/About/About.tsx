/**
 * About Page
 *
 * WHY this structure:
 * - Personal introduction for connection
 * - Skills organized by category
 * - Experience timeline for credibility
 * - Visual interest with progress bars
 */

import { motion } from 'framer-motion';
import { Section } from '@/components/layout';
import { Badge, BriefcaseIcon, AcademicCapIcon, LocationIcon, CheckIcon } from '@/components/ui';
import { getAllExperiences, getAllSkillCategories } from '@/services';
import { SITE_CONFIG, ANIMATION_VARIANTS, getStaggerDelay } from '@/constants';
import { formatDateRange } from '@/utils';
import type { SkillLevel } from '@/types';

// Skill level to percentage mapping
const skillLevelPercent: Record<SkillLevel, number> = {
  beginner: 25,
  intermediate: 50,
  advanced: 75,
  expert: 95,
};

export function About() {
  const experiences = getAllExperiences();
  const skillCategories = getAllSkillCategories();

  return (
    <>
      {/* Hero Section */}
      <Section noPadding className="pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={ANIMATION_VARIANTS.staggerContainer}
          >
            <motion.h1
              variants={ANIMATION_VARIANTS.fadeUp}
              className="text-4xl md:text-5xl font-display text-stone-900 dark:text-stone-50 mb-6"
            >
              About Me
            </motion.h1>

            <motion.p
              variants={ANIMATION_VARIANTS.fadeUp}
              className="text-lg text-stone-600 dark:text-stone-400 mb-4"
            >
              I'm a{' '}
              <span className="text-primary-600 dark:text-primary-400 font-semibold">
                Senior Software Engineer
              </span>{' '}
              with{' '}
              <span className="text-primary-600 dark:text-primary-400 font-semibold">4+ years</span>{' '}
              of experience specializing in{' '}
              <span className="text-primary-600 dark:text-primary-400 font-semibold">
                React Native
              </span>{' '}
              and{' '}
              <span className="text-primary-600 dark:text-primary-400 font-semibold">React</span>. I
              build scalable, high-performance mobile and web applications that serve millions of
              users.
            </motion.p>

            <motion.p
              variants={ANIMATION_VARIANTS.fadeUp}
              className="text-lg text-stone-600 dark:text-stone-400 mb-4"
            >
              My expertise spans the entire mobile development lifecycle—from architecting complex
              features like video streaming with DRM, adaptive bitrate, and live content, to
              optimizing app performance and reducing startup times. I've delivered consumer-facing
              products with <span className="font-semibold">1M+ downloads</span> and handled{' '}
              <span className="font-semibold">35K+ concurrent users</span>.
            </motion.p>

            <motion.p
              variants={ANIMATION_VARIANTS.fadeUp}
              className="text-lg text-stone-600 dark:text-stone-400 mb-6"
            >
              Beyond coding, I'm passionate about modernizing legacy codebases, mentoring fellow
              engineers, and building reusable component libraries. I believe in writing clean,
              type-safe code and continuously improving development workflows through automation and
              best practices.
            </motion.p>

            <motion.div
              variants={ANIMATION_VARIANTS.fadeUp}
              className="flex items-center gap-2 text-stone-600 dark:text-stone-400"
            >
              <LocationIcon className="w-5 h-5 text-primary-500" />
              <span>{SITE_CONFIG.location}</span>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-soft-xl bg-gradient-to-br from-primary-500 to-primary-700">
              {/* Placeholder for profile image */}
              <div className="w-full h-full flex items-center justify-center text-white text-8xl font-display">
                {SITE_CONFIG.author.charAt(0)}
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-500 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary-300 dark:bg-primary-800 rounded-xl -z-10" />
          </motion.div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section
        title="Skills & Technologies"
        subtitle="Technologies I work with regularly"
        alternate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={ANIMATION_VARIANTS.fadeUp}
              transition={{ delay: getStaggerDelay(catIndex, 0.15) }}
              className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-soft"
            >
              <h3 className="text-xl font-display text-stone-900 dark:text-stone-50 mb-6">
                {category.name}
              </h3>
              <ul className="space-y-4">
                {category.skills.map((skill) => (
                  <li key={skill.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-stone-700 dark:text-stone-300 font-medium">
                        {skill.name}
                      </span>
                      <Badge variant="secondary" size="sm">
                        {skill.level}
                      </Badge>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skillLevelPercent[skill.level]}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Experience Timeline */}
      <Section title="Experience" subtitle="My professional journey and education">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-stone-200 dark:bg-stone-700 -translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEducation = exp.position.includes('B.S.');
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={
                    isEven ? ANIMATION_VARIANTS.slideInLeft : ANIMATION_VARIANTS.slideInRight
                  }
                  transition={{ delay: getStaggerDelay(index, 0.15) }}
                  className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Icon */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center shadow-glow">
                    {isEducation ? (
                      <AcademicCapIcon className="w-4 h-4 text-white" />
                    ) : (
                      <BriefcaseIcon className="w-4 h-4 text-white" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`pl-12 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-white dark:bg-stone-800 rounded-2xl p-6 shadow-soft">
                      {/* Header */}
                      <div className="mb-4">
                        <h3 className="text-xl font-display text-stone-900 dark:text-stone-50">
                          {exp.position}
                        </h3>
                        <p className="text-primary-600 dark:text-primary-400 font-medium">
                          {exp.company}
                        </p>
                        <p className="text-sm text-stone-500 dark:text-stone-500">
                          {formatDateRange(exp.startDate, exp.endDate)} • {exp.location}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-stone-600 dark:text-stone-400 mb-4">{exp.description}</p>

                      {/* Achievements */}
                      <ul className="space-y-2 mb-4">
                        {exp.achievements.slice(0, 3).map((achievement, achIndex) => (
                          <li
                            key={achIndex}
                            className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-400"
                          >
                            <CheckIcon className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                            {achievement}
                          </li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" size="sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Empty space for timeline alignment */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
