'use client';

import { type ReactNode } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface EditorialTextProps {
  subheading?: string;
  heading: string;
  body: string | ReactNode;
  className?: string;
}

export default function EditorialText({
  subheading,
  heading,
  body,
  className = '',
}: EditorialTextProps) {
  return (
    <section className={`section-padding ${className}`}>
      <ScrollReveal>
        <div className="container-narrow text-center">
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

          <div className="body-serif text-text-secondary">
            {typeof body === 'string' ? <p>{body}</p> : body}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
