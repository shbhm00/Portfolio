/**
 * Contact Page
 *
 * WHY this structure:
 * - Clear form with validation
 * - Multiple contact options
 * - Accessible form implementation
 * - Success/error feedback
 *
 * LEARNING NOTE: This page demonstrates:
 * - Controlled form components with custom useForm hook
 * - Client-side validation
 * - Accessible form patterns (labels, error messages, ARIA)
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/layout';
import { Button, Input, Textarea, EmailIcon, LocationIcon, CheckIcon } from '@/components/ui';
import { useForm } from '@/hooks';
import { SITE_CONFIG, ANIMATION_VARIANTS, VALIDATION_MESSAGES } from '@/constants';
import { isValidEmail, isEmpty } from '@/utils';
import type { ContactFormData } from '@/types';

/**
 * Form validation function
 *
 * LEARNING NOTE: Validation is extracted to a pure function for:
 * - Easy testing
 * - Reusability
 * - Clear separation of concerns
 */
function validateContactForm(
  values: ContactFormData
): Partial<Record<keyof ContactFormData, string>> {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  // Name validation
  if (isEmpty(values.name)) {
    errors.name = VALIDATION_MESSAGES.required('Name');
  } else if (values.name.length < 2) {
    errors.name = VALIDATION_MESSAGES.minLength('Name', 2);
  }

  // Email validation
  if (isEmpty(values.email)) {
    errors.email = VALIDATION_MESSAGES.required('Email');
  } else if (!isValidEmail(values.email)) {
    errors.email = VALIDATION_MESSAGES.email;
  }

  // Subject validation
  if (isEmpty(values.subject)) {
    errors.subject = VALIDATION_MESSAGES.required('Subject');
  } else if (values.subject.length < 5) {
    errors.subject = VALIDATION_MESSAGES.minLength('Subject', 5);
  }

  // Message validation
  if (isEmpty(values.message)) {
    errors.message = VALIDATION_MESSAGES.required('Message');
  } else if (values.message.length < 10) {
    errors.message = VALIDATION_MESSAGES.minLength('Message', 10);
  }

  return errors;
}

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Handle form submission
   *
   * LEARNING NOTE: In a real app, this would send data to a backend
   * or third-party service like Formspree, EmailJS, or your own API.
   */
  const handleSubmit = useCallback(async (values: ContactFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Log for demo purposes (remove in production)
    // eslint-disable-next-line no-console
    console.log('Form submitted:', values);

    setIsSubmitted(true);
  }, []);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit: onSubmit,
    reset,
  } = useForm<ContactFormData>({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: validateContactForm,
    onSubmit: handleSubmit,
  });

  /**
   * Reset form and success state
   */
  const handleSendAnother = useCallback(() => {
    reset();
    setIsSubmitted(false);
  }, [reset]);

  return (
    <>
      {/* Page Header */}
      <Section noPadding className="pt-16 pb-8">
        <motion.div initial="hidden" animate="visible" variants={ANIMATION_VARIANTS.fadeUp}>
          <h1 className="text-4xl md:text-5xl font-display text-stone-900 dark:text-stone-50 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl">
            Have a project in mind or just want to say hello? I'd love to hear from you. Fill out
            the form below or reach out through other channels.
          </p>
        </motion.div>
      </Section>

      {/* Contact Content */}
      <Section noPadding className="pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                /* Success Message */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white dark:bg-stone-800 rounded-2xl p-8 shadow-soft text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
                    <CheckIcon className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h2 className="text-2xl font-display text-stone-900 dark:text-stone-50 mb-2">
                    Message Sent!
                  </h2>
                  <p className="text-stone-600 dark:text-stone-400 mb-6">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <Button variant="secondary" onClick={handleSendAnother}>
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                /* Contact Form */
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={(e) => void onSubmit(e)}
                  className="bg-white dark:bg-stone-800 rounded-2xl p-6 md:p-8 shadow-soft"
                  noValidate
                >
                  <div className="space-y-6">
                    {/* Name Field */}
                    <Input
                      label="Name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name ? errors.name : undefined}
                      placeholder="Your name"
                      required
                      autoComplete="name"
                    />

                    {/* Email Field */}
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email ? errors.email : undefined}
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                    />

                    {/* Subject Field */}
                    <Input
                      label="Subject"
                      name="subject"
                      type="text"
                      value={values.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.subject ? errors.subject : undefined}
                      placeholder="What's this about?"
                      required
                    />

                    {/* Message Field */}
                    <Textarea
                      label="Message"
                      name="message"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.message ? errors.message : undefined}
                      placeholder="Your message..."
                      rows={5}
                      required
                    />

                    {/* Submit Button */}
                    <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Other Ways to Connect */}
            <div>
              <h2 className="text-2xl font-display text-stone-900 dark:text-stone-50 mb-6">
                Other Ways to Connect
              </h2>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-stone-800 shadow-soft hover:shadow-soft-lg transition-shadow group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
                    <EmailIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-900 dark:text-stone-50 mb-1">Email</h3>
                    <p className="text-primary-600 dark:text-primary-400">{SITE_CONFIG.email}</p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-stone-800 shadow-soft">
                  <div className="w-12 h-12 rounded-xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center shrink-0">
                    <LocationIcon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-900 dark:text-stone-50 mb-1">Location</h3>
                    <p className="text-stone-600 dark:text-stone-400">{SITE_CONFIG.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-6">
              <h3 className="font-display text-stone-900 dark:text-stone-50 mb-2">Response Time</h3>
              <p className="text-stone-600 dark:text-stone-400">
                I typically respond to emails within 24-48 hours. For urgent matters, please mention
                it in the subject line.
              </p>
            </div>

            {/* What I'm Looking For */}
            <div>
              <h3 className="font-display text-stone-900 dark:text-stone-50 mb-4">
                What I'm Looking For
              </h3>
              <ul className="space-y-2 text-stone-600 dark:text-stone-400">
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                  <span>Interesting projects with modern tech stacks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                  <span>Teams that value code quality and user experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                  <span>Remote-first or hybrid opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                  <span>Open source collaboration</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
