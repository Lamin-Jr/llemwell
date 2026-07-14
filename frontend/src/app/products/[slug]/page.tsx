'use client';

import { useParams } from 'next/navigation';
import { products } from '@/lib/data';
import { useState } from 'react';
import Image from 'next/image';
import HeroMedia from '@/components/sections/HeroMedia';
import GhostButton from '@/components/ui/GhostButton';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function SingleProduct() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const [currentImage, setCurrentImage] = useState(0);

  if (!product) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="luxury-heading text-text-primary text-4xl mb-8">
          Product not found
        </h1>
        <GhostButton href="/products" size="md">
          Return to Collection
        </GhostButton>
      </main>
    );
  }

  return (
    <main>
      {/* 1. Hero */}
      <HeroMedia
        imageSrc={product.images[0]}
        imageAlt={product.name}
        heading={product.name}
        overlayOpacity={50}
      />

      {/* 2. Product Detail Section */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* LEFT: Gallery — 55% */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="up">
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    key={currentImage}
                    src={product.images[currentImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex gap-3 mt-4">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`flex-1 aspect-video relative overflow-hidden border-2 transition-all duration-300 ${
                        i === currentImage
                          ? 'border-(--border-strong)'
                          : 'border-transparent'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} view ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* RIGHT: Details — 45% */}
            <div className="lg:col-span-5 pt-4">
              <ScrollReveal direction="up" delay={0.2}>
                <h1 className="luxury-heading text-text-primary text-4xl md:text-5xl">
                  {product.name}
                </h1>

                <p className="text-text-secondary text-xl mt-4">
                  €{product.price.toLocaleString()}
                </p>

                <hr
                  className="my-8"
                  style={{ borderColor: 'var(--border-subtle)' }}
                />

                <p className="body-serif text-text-secondary leading-relaxed">
                  {product.description}
                </p>

                {/* Specs */}
                <div className="mt-8 space-y-6">
                  <div>
                    <p className="luxury-caption text-text-tertiary">
                      Material
                    </p>
                    <p className="text-text-primary text-sm mt-1">
                      {product.material}
                    </p>
                  </div>
                  <div>
                    <p className="luxury-caption text-text-tertiary">
                      Hardware
                    </p>
                    <p className="text-text-primary text-sm mt-1">
                      {product.buckle}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <GhostButton href="/contact" size="lg" className="w-full">
                    Request Allocation
                  </GhostButton>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CTA Hero */}
      <HeroMedia
        imageSrc={product.images[1] || product.images[0]}
        imageAlt="Begin Your Commission"
        heading="Begin Your Commission"
        ctaText="Contact Atelier"
        ctaLink="/contact"
        overlayOpacity={65}
      />
    </main>
  );
}
