'use client';

import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface ImageShowcaseProps {
  src: string;
  alt: string;
  height?: string;
  caption?: string;
  priority?: boolean;
  className?: string;
}

export default function ImageShowcase({
  src,
  alt,
  height = '70vh',
  caption,
  priority = false,
  className = '',
}: ImageShowcaseProps) {
  return (
    <ScrollReveal duration={1.2}>
      <section className={className}>
        <div className="relative w-full overflow-hidden" style={{ height }}>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className="object-cover"
          />
        </div>

        {caption && (
          <p className="luxury-caption text-center mt-4 px-6">{caption}</p>
        )}
      </section>
    </ScrollReveal>
  );
}
