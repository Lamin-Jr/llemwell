'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ProductSlide {
  id: string | number;
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  link?: string;
}

interface HorizontalProductSliderProps {
  slides: ProductSlide[];
  heading: string;
  subheading?: string;
  backgroundColor?: string;
  textColor?: string;
}

export default function HorizontalProductSlider({
  slides,
  heading,
  subheading,
  backgroundColor = 'bg-transparent',
  textColor = 'text-white'
}: HorizontalProductSliderProps) {
  return (
    <section className={`snap-start relative h-screen w-full flex flex-col overflow-hidden ${backgroundColor} ${textColor} pt-12 md:pt-0`}>
      
      {/* Title Overlay (Stays fixed while scrolling horizontally) */}
      <div className="absolute top-24 md:top-32 left-6 md:left-24 z-10 w-full max-w-sm pointer-events-none">
        {subheading && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="uppercase tracking-[0.2em] text-brand-primary text-[10px] md:text-xs font-semibold mb-2"
          >
            {subheading}
          </motion.p>
        )}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-6xl luxury-heading drop-shadow-xl"
        >
          {heading}
        </motion.h2>
      </div>

      {/* Horizontal Scroll Track */}
      <div className="flex w-full h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar items-center md:pl-0">
        {/* Spacer to push first item inwards so it aligns with title on desktop */}
        <div className="hidden md:block w-[10vw] shrink-0 pointer-events-none"></div>

        {slides.map((slide) => (
          <div 
            key={slide.id} 
            className="w-[90vw] md:w-[60vw] max-w-[500px] h-full shrink-0 flex items-center justify-center relative px-4 md:px-8 snap-center pt-24 md:pt-0"
          > 
            <div className="relative w-full aspect-[3/4] group overflow-hidden shadow-2xl">
              <Image
                src={slide.imageSrc}
                alt={slide.imageAlt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute bottom-[-20px] left-0 w-full p-6 md:p-8 opacity-0 group-hover:bottom-0 group-hover:opacity-100 transition-all duration-500 text-center pointer-events-none">
                {slide.subtitle && (
                  <p className="text-white/80 tracking-[0.2em] text-[10px] md:text-xs font-semibold uppercase mb-2">
                     {slide.subtitle}
                  </p>
                )}
                <h3 className="text-xl md:text-2xl luxury-heading text-white mb-4">
                  {slide.title}
                </h3>
                {slide.link && (
                  <span className="inline-block border-b border-white/50 pb-1 text-[10px] uppercase tracking-widest pointer-events-auto">
                    Discover
                  </span>
                )}
              </div>
              
              {slide.link && (
                 <Link href={slide.link} className="absolute inset-0 z-20">
                    <span className="sr-only">View {slide.title}</span>
                 </Link>
              )}
            </div>
          </div>
        ))}
        {/* End Spacer for padding at the end of scroll */}
        <div className="w-[10vw] shrink-0 pointer-events-none"></div>
      </div>
    </section>
  );
}
