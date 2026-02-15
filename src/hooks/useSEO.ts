/**
 * useSEO Hook
 *
 * Updates document title and meta tags for each page.
 *
 * WHY this approach:
 * - Each page needs unique title and description for Google
 * - Duplicate titles/descriptions hurt SEO rankings
 * - Google uses title and description in search results
 * - No external dependency needed (direct DOM manipulation)
 */

import { useEffect } from 'react';
import { SITE_CONFIG } from '@/constants';

interface SEOProps {
  /** Page title - will be appended with site name: "Title | Shubham Mishra" */
  title?: string;
  /** Meta description for search engines (keep under 160 characters) */
  description?: string;
  /** Canonical URL path (e.g., "/blog/my-post") */
  path?: string;
  /** Open Graph image URL */
  image?: string;
  /** Page type for Open Graph (default: "website") */
  type?: 'website' | 'article';
}

const SITE_NAME = SITE_CONFIG.author;
const BASE_URL = 'https://codewithshubham.me';
const DEFAULT_DESCRIPTION = SITE_CONFIG.description;
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

/**
 * Sets document title and meta tags for SEO.
 * Restores defaults on unmount.
 *
 * @example
 * useSEO({
 *   title: 'About',
 *   description: 'Learn about my experience and skills.',
 *   path: '/about',
 * });
 */
export function useSEO({ title, description, path, image, type = 'website' }: SEOProps = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | ${SITE_CONFIG.title}`;
    const metaDescription = description ?? DEFAULT_DESCRIPTION;
    const canonicalUrl = path ? `${BASE_URL}${path}` : BASE_URL;
    const ogImage = image ?? DEFAULT_IMAGE;

    // Update document title
    document.title = fullTitle;

    // Helper to update or create a meta tag
    const setMeta = (attribute: string, key: string, value: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    // Primary meta tags
    setMeta('name', 'description', metaDescription);
    setMeta('name', 'title', fullTitle);

    // Open Graph
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', metaDescription);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:type', type);

    // Twitter Card
    setMeta('property', 'twitter:title', fullTitle);
    setMeta('property', 'twitter:description', metaDescription);
    setMeta('property', 'twitter:url', canonicalUrl);
    setMeta('property', 'twitter:image', ogImage);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Cleanup: restore defaults when the component unmounts
    return () => {
      document.title = `${SITE_NAME} | ${SITE_CONFIG.title}`;
    };
  }, [title, description, path, image, type]);
}
