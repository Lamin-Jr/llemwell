'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import GhostButton from '@/components/ui/GhostButton';

interface SplitContentProps {
  imageSrc: string;
  imageAlt: string;
  imageClass?: string;
  subheading?: string;
  heading: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  reverse?: boolean;
  className?: string;
}

export default function SplitContent({
  imageSrc,
  imageAlt,
  imageClass = '',
  subheading,
  heading,
  description,
  ctaText,
  ctaLink,
  reverse = false,
  className = '',
}: SplitContentProps) {
  return (
    <section className={`w-full ${className}`}>
      <div
        className={`flex flex-col ${
          reverse ? 'md:flex-row-reverse' : 'md:flex-row'
        } min-h-[70vh]`}
      >
        {/* Image — 55% */}
        <motion.div
          className="w-full md:w-[55%] relative overflow-hidden"
          initial={{ opacity: 0, x: reverse ? 100 : -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-full h-[50vh] md:h-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className={`object-cover ${imageClass}`}
            />
          </div>
        </motion.div>

        {/* Text — 45% */}
        <motion.div
          className="w-full md:w-[45%] flex items-center justify-center px-8 py-16 md:px-16 md:py-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="max-w-[480px]">
            {subheading && (
              <p className="luxury-subheading text-accent-warm mb-6">
                {subheading}
              </p>
            )}

            <h2
              className="luxury-heading text-text-primary mb-8"
              style={{ fontSize: 'var(--text-display)' }}
            >
              {heading}
            </h2>

            <p className="body-serif text-text-secondary whitespace-pre-line mb-8">
              {description}
            </p>

            {ctaText && ctaLink && (
              <GhostButton href={ctaLink} size="md">
                {ctaText}
              </GhostButton>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
