'use client';
import { products } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductPage() {
  const product = products[0]; // Currently just the one

  return (
    <div className="bg-[#BDC2C2] min-h-screen text-[#050505] pt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 py-12 relative">
        
        {/* Left: Sticky Gallery */}
        <div className="w-full lg:w-3/5 space-y-8">
          {product.images.map((img, i) => (
            <div key={i} className="relative aspect-[4/3] w-full">
              <Image 
                src={img} 
                alt={`${product.name} View ${i + 1}`}
                fill
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Right: Sticky Details */}
        <div className="w-full lg:w-2/5">
          <div className="sticky top-32">
            <h1 className="text-4xl lg:text-5xl luxury-heading mb-4">{product.name}</h1>
            <p className="text-2xl font-serif text-brand-primary mb-8">${product.price.toLocaleString()}</p>
            
            <p className="text-[#050505]/70 leading-relaxed mb-10 font-sans tracking-wide">
              {product.description}
            </p>

            <div className="space-y-4 mb-12 text-sm">
              <div className="flex justify-between border-b border-black/10 pb-4">
                <span className="text-[#050505] uppercase tracking-widest font-semibold">Material</span>
                <span className="font-serif">{product.material}</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-4">
                <span className="text-[#050505] uppercase tracking-widest font-semibold">Buckle</span>
                <span className="font-serif">{product.buckle}</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-4">
                <span className="text-[#050505] uppercase tracking-widest font-semibold">Origin</span>
                <span className="font-serif">Geneva, Switzerland</span>
              </div>
            </div>

            <button className="w-full py-5 bg-brand-primary text-black uppercase tracking-[0.2em] font-bold text-sm hover:bg-white transition-all duration-300 mb-6">
              Acquire Allocation
            </button>
            <p className="text-center text-xs text-[#a8a8a8] tracking-widest">
              Complimentary global shipping & returns.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
