/**
 * Section Component
 *
 * WHY this design:
 * - Consistent section styling with proper padding
 * - Support for section headings with animations
 * - Reusable across different pages
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';
import { ANIMATION_VARIANTS } from '@/constants';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Section heading */
  title?: string;
  /** Section subtitle/description */
  subtitle?: string;
  /** Remove top/bottom padding */
  noPadding?: boolean;
  /** Use alternative background */
  alternate?: boolean;
  /** Children elements */
  children: ReactNode;
}

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { title, subtitle, noPadding = false, alternate = false, className, children, ...props },
  ref
) {
  return (
    <section
      ref={ref}
      className={cn(
        !noPadding && 'py-16 md:py-24',
        alternate && 'bg-stone-100 dark:bg-stone-800/50',
        className ?? undefined
      )}
      {...props}
    >
      <div className="container-custom">
        {/* Section Header */}
        {(title ?? subtitle) && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={ANIMATION_VARIANTS.fadeUp}
            className="text-center mb-12 md:mb-16"
          >
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-stone-900 dark:text-stone-50 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {children}
      </div>
    </section>
  );
});
