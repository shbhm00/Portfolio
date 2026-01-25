/**
 * Footer Component
 *
 * WHY this design:
 * - Consistent footer across all pages
 * - Quick links for navigation
 * - Social links for professional presence
 * - Copyright information
 */

import { Link } from 'react-router-dom';
import { NAV_LINKS, SOCIAL_LINKS, SITE_CONFIG } from '@/constants';
import { GitHubIcon, LinkedInIcon, TwitterIcon, EmailIcon } from '@/components/ui';

/**
 * Map social platform to icon component
 */
const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Twitter: TwitterIcon,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-display text-stone-900 dark:text-stone-50"
            >
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm">
                P
              </span>
              {SITE_CONFIG.author}
            </Link>
            <p className="mt-3 text-stone-600 dark:text-stone-400 text-sm max-w-xs">
              {SITE_CONFIG.title}. Building beautiful, accessible, and performant web experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-stone-900 dark:text-stone-50 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-stone-600 dark:text-stone-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-display text-stone-900 dark:text-stone-50 mb-4">Get in Touch</h3>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm transition-colors mb-4"
            >
              <EmailIcon className="w-4 h-4" />
              {SITE_CONFIG.email}
            </a>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIcons[social.platform];
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-600 dark:text-stone-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    aria-label={social.label}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-stone-200 dark:border-stone-800">
          <p className="text-center text-stone-500 dark:text-stone-500 text-sm">
            © {currentYear} {SITE_CONFIG.author}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
