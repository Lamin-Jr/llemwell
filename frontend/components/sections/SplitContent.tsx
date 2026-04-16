'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface SplitContentProps {
  imageSrc: string;
  imageAlt: string;
  subheading?: string;
  heading: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  reverse?: boolean; // If true, image is on the right
  backgroundColor?: string;
  textColor?: string;
}

export default function SplitContent({
  imageSrc,
  imageAlt,
  imageClass,
  subheading,
  heading,
  description,
  ctaText,
  ctaLink,
  reverse = false,
  backgroundColor = 'bg-white',
  textColor = 'text-black',
}: SplitContentProps) {
  return (
    <div className={`w-full h-full flex items-center justify-center ${backgroundColor} ${textColor} px-6 py-20`}>
      <div className={`max-w-7xl w-full mx-auto flex flex-col items-center gap-16 h-full ${
        reverse ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}>
        
        {/* Image Container */}
        <motion.div 
          className="w-full md:w-1/2 relative h-[50vh] md:h-[80%] overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className={`object-cover ${imageClass}`} // Use object-cover depending on aspect ratio needs
            />
          </div>
        </motion.div>
        
        {/* Text Container */}
        <motion.div 
          className="w-full md:w-1/2 flex flex-col justify-center"
          initial={{ opacity: 0, x: reverse ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {subheading && (
            <h3 className="uppercase tracking-[0.2em] text-brand-secondary text-sm font-bold mb-4">
              {subheading}
            </h3>
          )}
          
          <h2 className="text-4xl md:text-6xl luxury-heading mb-8 uppercase">
            {heading}
          </h2>
          
          <p className="text-lg leading-relaxed opacity-80 mb-8 font-serif whitespace-pre-line">
            {description}
          </p>
          
          {ctaText && ctaLink && (
            <div>
              <Link href={ctaLink} className="inline-block border-b-2 border-brand-secondary pb-1 text-sm uppercase tracking-widest font-semibold hover:opacity-70 transition-opacity">
                {ctaText}
              </Link>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
