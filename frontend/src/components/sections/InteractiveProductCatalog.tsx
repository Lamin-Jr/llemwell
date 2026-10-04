'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BackendProduct } from '@/types';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface InteractiveProductCatalogProps {
  products: BackendProduct[];
}

export default function InteractiveProductCatalog({ products }: InteractiveProductCatalogProps) {
  if (!products || products.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <p className="text-text-secondary luxury-caption">No pieces available.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-background flex flex-col pt-24">
      {/* Intro Header */}
      <section className="container-luxury mx-auto px-6 mb-16 text-center">
        <h1 className="luxury-heading text-5xl md:text-7xl text-text-primary mb-4">
          THE COLLECTION
        </h1>
        <p className="luxury-caption text-text-secondary tracking-[0.2em] uppercase">
          Handcrafted Pieces • Forged in rebellion
        </p>
      </section>

      {/* Product Sections */}
      <div className="flex flex-col pb-0">
        {products.map((product, index) => (
          <ProductSection key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
}

function ProductSection({ product, index }: { product: BackendProduct; index: number }) {
  const allImages = product.images?.length ? product.images : (product.image ? [product.image] : ['/images/placeholder.jpg']);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  const isEven = index % 2 === 0;

  return (
    <section className="w-full relative border-t border-border-subtle">
      <div className={`flex flex-col lg:grid lg:grid-cols-2 min-h-screen items-stretch`}>
        
        {/* Interactive Image Carousel (Full width of its grid cell) */}
        <div className={`w-full relative min-h-[60vh] lg:min-h-full overflow-hidden group ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={allImages[currentImageIndex]}
                alt={`${product.name} view ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          {allImages.length > 1 && (
            <div className="absolute inset-x-0 bottom-8 px-8 flex justify-between items-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                onClick={prevImage}
                className="w-12 h-12 rounded-full bg-surface-primary/80 backdrop-blur border border-border-subtle flex items-center justify-center text-text-primary hover:bg-surface-elevated transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              
              {/* Pagination Dots */}
              <div className="flex gap-3 bg-surface-primary/50 backdrop-blur px-4 py-3 rounded-full">
                {allImages.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentImageIndex(i)}
                    className={`h-1.5 transition-all duration-300 rounded-full ${i === currentImageIndex ? 'w-8 bg-text-primary' : 'w-2 bg-text-tertiary'}`}
                  />
                ))}
              </div>

              <button 
                onClick={nextImage}
                className="w-12 h-12 rounded-full bg-surface-primary/80 backdrop-blur border border-border-subtle flex items-center justify-center text-text-primary hover:bg-surface-elevated transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className={`w-full flex flex-col justify-center px-8 py-16 lg:px-24 xl:px-32 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          <p className="text-[10px] uppercase tracking-[0.4em] text-text-secondary mb-6 opacity-70">
            Piece No. {String(index + 1).padStart(2, '0')}
          </p>
          
          <h2 className="luxury-heading text-4xl md:text-5xl lg:text-7xl text-text-primary mb-8 leading-tight">
            {product.name}
          </h2>
          
          <p className="body-serif text-text-secondary text-lg lg:text-xl mb-12 leading-relaxed max-w-xl">
            {product.description}
          </p>
          
          {/* Hardware & Material Specs */}
          <div className="grid grid-cols-2 gap-8 mb-12 border-t border-border-subtle pt-10 max-w-xl">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-2">Material</p>
              <p className="text-base text-text-primary font-medium">{product.material || 'Distressed Calfskin'}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary mb-2">Hardware</p>
              <p className="text-base text-text-primary font-medium">{product.buckle || 'Custom Heavy Metal'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8 mb-12">
            <div className={`px-4 py-2 text-xs uppercase tracking-[0.2em] border ${product.stock > 0 ? 'border-text-tertiary text-text-secondary' : 'border-red-900 text-red-500'}`}>
              {product.stock > 0 ? 'In Stock' : 'Sold Out'}
            </div>
          </div>
          
          <Link 
            href={`/products/${product.slug || product.id}`}
            className="group/btn relative inline-flex items-center justify-center w-full sm:w-max h-14 px-10 border border-text-primary text-text-primary hover:bg-text-primary hover:text-surface-primary transition-all duration-300"
          >
            <span className="text-xs uppercase tracking-[0.25em] mr-4">
              Explore Piece
            </span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>
        
      </div>
    </section>
  );
}
