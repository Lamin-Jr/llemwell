'use client';
import { products } from '@/lib/data';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import Product3DScrubber from '@/components/Product3DScrubber';

export default function ProductPage() {
  const product = products[0]; // Currently just the one
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="bg-[#BDC2C2] min-h-screen text-[#050505]" ref={containerRef}>
      
      {/* 1. Full Bleed Video Hero */}
      <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#242424]">
        <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
          {/* HTML5 Video Element (Placeholder path handled per implementation plan) */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="object-contain w-full h-full opacity-900"
            poster="/images/heroX1.jpg"
          >
            <source src="/videos/belt_showcase.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-linear-to-t from-[#62615f] via-transparent to-transparent" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="relative z-10 text-center px-6"
        >
          <h2 className="text-brand-primary uppercase tracking-[0.3em] font-semibold text-lg mb-6">The Masterpiece</h2>
          <h1 className="text-5xl md:text-8xl luxury-heading mb-6 text-slate-100 drop-shadow-2xl">{product.name}</h1>
          {/* <p className="text-2xl font-serif text-[#BDC2C2] drop-shadow-md">${product.price.toLocaleString()}</p> */}
        </motion.div>
      </div>

      {/* 2. Philosophy & Description */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl w-full mx-auto text-center">
        <motion.p 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="text-2xl md:text-4xl font-serif leading-relaxed text-[#050505]/90 mb-12"
        >
          {product.description}
        </motion.p>
        </div>
      </section>

      {/* 2.5 3D Scroll Visualization Section */}
      <Product3DScrubber />

      {/* 3. Animated Specs Showcase */}
      <div className="w-full">
        {/* Spec 1: Material */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col md:flex-row items-center gap-16 w-full max-w-7xl mx-auto px-6">
            <motion.div 
              className="w-full md:w-1/2 relative aspect-[4/3]"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <Image src={product.images[0]} alt="Material" fill className="object-cover rounded-sm shadow-xl" />
            </motion.div>
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h3 className="text-brand-primary uppercase tracking-[0.2em] font-semibold text-xs mb-4">The Flesh</h3>
              <h2 className="text-4xl luxury-heading mb-6">Distressed Material</h2>
              <p className="text-lg font-serif text-[#050505]/70 leading-relaxed pb-8 border-b border-black/10">
                {product.material}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Spec 2: Buckle */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col md:flex-row-reverse items-center gap-16 w-full max-w-7xl mx-auto px-6">
          <motion.div 
            className="w-full md:w-1/2 relative aspect-[4/3]"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <Image src={product.images[1] || product.images[0]} alt="Buckle" fill className="object-cover rounded-sm shadow-xl grayscale contrast-125" />
          </motion.div>
          <motion.div 
            className="w-full md:w-1/2 text-right"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h3 className="text-brand-primary uppercase tracking-[0.2em] font-semibold text-xs mb-4">The Metal</h3>
            <h2 className="text-4xl luxury-heading mb-6">Custom Hardware</h2>
            <p className="text-lg font-serif text-[#050505]/70 leading-relaxed pb-8 border-b border-black/10">
              {product.buckle}
            </p>
            </motion.div>
          </div>
        </section>
      </div>

      {/* 4. Checkout / CTA */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-[#242424] text-[#BDC2C2] border-t border-black/20 text-center px-6">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
        >
          <h2 className="text-4xl luxury-heading mb-12 text-slate-100">Reserve Your Allocation</h2>
          <a href="/contact" className="inline-block px-16 py-6 border border-[#BADADF] bg-[#BADADF]/10 text-[#BADADF] text-sm uppercase font-semibold tracking-widest hover:bg-[#BADADF] hover:text-[#242424] transition-all duration-500 backdrop-blur-sm">
            Acquire Now
          </a>
          <p className="mt-8 text-xs text-[#A6A096] tracking-widest uppercase">
            Complimentary global shipping & returns.
          </p>
        </motion.div>
      </section>

    </div>
  );
}
