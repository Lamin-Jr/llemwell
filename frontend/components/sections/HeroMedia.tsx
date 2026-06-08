'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import GhostButton from '@/components/ui/GhostButton';
import ScrollIndicator from '@/components/ui/ScrollIndicator';

interface HeroMediaProps {
  imageSrc: string;
  imageAlt: string;
  subheading?: string;
  heading: string;
  ctaText?: string;
  ctaLink?: string;
  overlayOpacity?: number; // 0 to 100
  align?: 'center' | 'bottom' | 'bottom-left';
  showScrollIndicator?: boolean;
}

export default function HeroMedia({
  imageSrc,
  imageAlt,
  subheading,
  heading,
  ctaText,
  ctaLink,
  align = 'center',
  showScrollIndicator = false,
}: HeroMediaProps) {
  const getAlignmentClasses = () => {
    switch (align) {
      case 'bottom':
        return 'flex-col justify-end items-center pb-24 text-center';
      case 'bottom-left':
        return 'flex-col justify-end items-start pb-24 text-left';
      case 'center':
      default:
        return 'flex-col justify-center items-center text-center';
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-center"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

      {/* Content */}
      <div
        className={`relative z-10 flex h-full w-full container-luxury ${getAlignmentClasses()}`}
      >
        {subheading && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="luxury-subheading text-accent-primary mb-6"
          >
            {subheading}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="luxury-heading text-text-primary mb-8"
          style={{ fontSize: 'var(--text-hero)' }}
        >
          {heading}
        </motion.h1>

        {ctaText && ctaLink && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <GhostButton href={ctaLink} size="lg">
              {ctaText}
            </GhostButton>
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && <ScrollIndicator />}
    </section>
  );
}
