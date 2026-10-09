import React from 'react';
import Image from 'next/image';
import NewsletterForm from '@/components/forms/NewsletterForm';

export const metadata = {
  title: 'Coming Soon | LLEMWELL',
  description: 'The Atelier opens soon. Join the VIP waitlist.',
};

export default function ComingSoonPage() {
  return (
    <main className="bg-surface-primary min-h-screen flex flex-col pt-20">
      
      {/* 1. TOP SECTION (Hero) */}
      <section className="relative w-full h-[60vh] lg:h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/herox8.jpg" 
            alt="LLEMWELL Atelier"
            fill
            className="object-cover opacity-50 scale-105 animate-pulse"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-primary via-transparent to-surface-primary opacity-80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          <p className="text-[10px] uppercase tracking-[0.4em] text-text-tertiary mb-6">
            Phase One
          </p>
          <h1 className="font-brand-alt text-6xl md:text-8xl text-text-primary tracking-widest mb-4">
            llemMELL
          </h1>
          <p className="text-text-primary  md:text-2xl tracking-[0.3em] uppercase">
            Comming Soon
          </p>
        </div>
      </section>

      {/* 2. BOTTOM SECTION (Split Screen) */}
      <section className="w-full flex-grow flex flex-col lg:grid lg:grid-cols-2">
        
        {/* Left Side: Manifesto/Information */}
        <div className="w-full h-full flex flex-col justify-center px-8 py-16 lg:px-24 xl:px-32 border-b lg:border-b-0 lg:border-r border-border-subtle">
          <p className="text-[10px] uppercase tracking-[0.4em] text-text-secondary mb-6 opacity-70">
            Our Philosophy
          </p>
          <h2 className="luxury-heading text-4xl md:text-5xl text-text-primary mb-8 leading-tight">
            Forged in Rebellion. <br/>Crafted to Endure.
          </h2>
          <p className="body-serif text-text-secondary text-lg leading-relaxed max-w-xl mb-8">
            We are currently finalizing the inaugural collection. Every belt is meticulously handcrafted from distressed calfskin and heavy metal hardware. No two pieces are alike—each carries the scars of its creation.
          </p>
          <div className="flex items-center gap-6">
            <span className="h-[1px] w-12 bg-text-tertiary"></span>
            <span className="text-xs uppercase tracking-[0.2em] text-text-primary">Paris / Worldwide</span>
          </div>
        </div>

        {/* Right Side: Newsletter / Waitlist */}
        <div className="w-full h-full flex flex-col justify-center px-8 py-16 lg:px-24 xl:px-32 bg-surface-secondary">
          <h3 className="luxury-heading text-3xl text-text-primary mb-4">
            Request Allocation
          </h3>
          <p className="text-sm text-text-secondary mb-12 max-w-md leading-relaxed">
            Production is strictly limited. Join the private registry to receive early access before the collection opens to the public.
          </p>
          
          <NewsletterForm />
          
          <p className="text-[10px] text-text-tertiary mt-8 max-w-sm">
            By joining, you consent to receive updates regarding drops and exclusive content. We do not compromise your data.
          </p>
        </div>

      </section>
      
    </main>
  );
}
