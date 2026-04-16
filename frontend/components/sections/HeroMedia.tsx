'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface HeroMediaProps {
  imageSrc: string;
  imageAlt: string;
  subheading?: string;
  heading: string;
  ctaText?: string;
  ctaLink?: string;
  overlayOpacity?: number; // 0 to 100
  align?: 'center' | 'bottom' | 'bottom-left';
}

export default function HeroMedia({
  imageSrc,
  imageAlt,
  subheading,
  heading,
  ctaText,
  ctaLink,
  overlayOpacity = 60,
  align = 'center',
}: HeroMediaProps) {
  
  const getAlignmentClasses = () => {
    switch (align) {
      case 'bottom':
        return 'flex-col justify-end items-center pb-24 text-center';
      case 'bottom-left':
        return 'flex-col justify-end items-start pb-24 px-12 md:px-24 text-left';
      case 'center':
      default:
        return 'flex-col justify-center items-center text-center';
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-center"
        />
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black pointer-events-none" 
          style={{ opacity: overlayOpacity / 100 }} 
        />
      </div>

      <div className={`relative z-10 flex h-full w-full max-w-7xl mx-auto px-6 ${getAlignmentClasses()}`}>
        {subheading && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="uppercase tracking-[0.2em] text-brand-primary text-xs md:text-sm font-semibold mb-6"
          >
            {subheading}
          </motion.p>
        )}
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-5xl md:text-8xl luxury-heading text-slate-100 mb-8 tracking-wide drop-shadow-2xl"
        >
          {heading}
        </motion.h1>

        {ctaText && ctaLink && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Link
              href={ctaLink}
              className="inline-block px-12 py-4 text-xs font-semibold uppercase tracking-[0.2em] bg-white text-black hover:bg-gray-200 transition-colors duration-500"
            >
              {ctaText}
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
