'use client';

import { products } from '@/lib/data';
import HeroMedia from '@/components/sections/HeroMedia';
import EditorialText from '@/components/sections/EditorialText';
import ImageShowcase from '@/components/sections/ImageShowcase';
import SplitContent from '@/components/sections/SplitContent';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GhostButton from '@/components/ui/GhostButton';

export default function ProductPage() {
  const product = products[0];

  return (
    <main>
      {/* 1. Hero */}
      <HeroMedia
        imageSrc="/images/belt_hero.png"
        imageAlt={product.name}
        subheading="The Masterpiece"
        heading={product.name}
        overlayOpacity={55}
        showScrollIndicator={true}
      />

      {/* 2. Philosophy & Description */}
      <EditorialText
        subheading="The Philosophy"
        heading="Crafted to Endure"
        body={product.description}
      />

      {/* 3. Full-Bleed Detail Image */}
      <ImageShowcase
        src="/images/belt_detail.png"
        alt="LLEMWELL belt detail"
        height="60vh"
      />

      {/* 4. Split: Material */}
      <SplitContent
        imageSrc={product.images[0]}
        imageAlt="Material Detail"
        subheading="The Flesh"
        heading="Distressed Material"
        description={`${product.material}\n\nEvery hide is hand-selected for its unique grain pattern. Natural scars and imperfections are embraced — they are the signature of authenticity.`}
        reverse={false}
      />

      {/* 5. Split: Hardware */}
      <SplitContent
        imageSrc={product.images[1] || product.images[0]}
        imageAlt="Hardware Detail"
        subheading="The Metal"
        heading="Custom Hardware"
        description={`${product.buckle}\n\nForged in small batches, each piece of hardware is individually finished. The oxidation process begins from the moment of creation — a living material that evolves with its owner.`}
        reverse={true}
      />

      {/* 6. CTA Section */}
      <section className="bg-surface-tertiary min-h-[60vh] flex items-center justify-center">
        <ScrollReveal direction="up">
          <div className="text-center px-6">
            <h2 className="luxury-heading text-text-primary text-4xl md:text-5xl lg:text-6xl">
              Reserve Your Allocation
            </h2>
            <div className="mt-10">
              <GhostButton href="/contact" size="lg">
                Acquire Now
              </GhostButton>
            </div>
            <p className="luxury-caption text-text-secondary mt-8">
              Complimentary global shipping &amp; returns.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
