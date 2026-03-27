'use client';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-[#BDC2C2] min-h-screen text-[#050505]">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center">
        <Image 
          src="/images/belt_detail.png" 
          alt="LLEMWELL Heritage" 
          fill 
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#BDC2C2] via-[#242424]/70 to-[#242424]/90 pointer-events-none" />
        <div className="relative z-10 text-center max-w-3xl px-6 pt-20">
          <h1 className="text-5xl md:text-7xl luxury-heading mb-6 tracking-wide drop-shadow-2xl text-slate-100">
            OUR REBELLION
          </h1>
          <p className="text-[#BDC2C2] font-serif text-lg md:text-xl leading-relaxed tracking-wider drop-shadow-lg">
            A relentless pursuit of anti-fashion, defining the intersection of raw grunge energy and traditional underground leathercraft.
          </p>
        </div>
      </div>

      {/* Story Content */}
      <div className="max-w-4xl mx-auto px-6 py-24 xl:py-40">
        <div className="space-y-16">
          <div>
            <h2 className="text-brand-primary uppercase tracking-[0.2em] font-semibold text-sm mb-4">
              The Genesis
            </h2>
            <h3 className="text-3xl md:text-4xl luxury-heading mb-8">
              Born from the Underground
            </h3>
            <p className="font-serif leading-loose text-lg text-black/70">
              LLEMWELL was founded on a singular vision: to create not merely an accessory, but a weapon of self-expression. We observed that while high fashion had evolved, the raw, unfiltered energy of the punk scene was being diluted. Our founders sought to reclaim this space, bringing the rugged, visceral aesthetics of Opium culture to heavy-duty leather goods.
            </p>
          </div>

          <div className="border-l border-black/10 pl-8">
            <h2 className="text-brand-primary uppercase tracking-[0.2em] font-semibold text-sm mb-4">
              The Material
            </h2>
            <h3 className="text-3xl md:text-4xl luxury-heading mb-8">
              Heavy Metal & Raw Leather
            </h3>
            <p className="font-serif leading-loose text-lg text-black/70">
              We scour the earth to source materials that can survive the mosh pit and the runway alike. Our leather is thick, distressed calfskin, scarred to perfection. The heavy metal spikes and custom silver buckles are forged to take a beating, oxidizing naturally over time to create a unique, chaotic patina that only gets better with age.
            </p>
          </div>

          <div className="text-center pt-20 border-t border-black/10 mt-20">
             <Image src="/images/belt_lifestyle.png" alt="Lifestyle" width={800} height={400} className="w-full h-auto mb-12 opacity-80 rounded-sm" />
             <h2 className="text-4xl luxury-heading text-brand-primary mb-6">Explore the Collection</h2>
             <a href="/product" className="inline-block px-12 py-4 bg-[#050505] text-[#BDC2C2] text-sm uppercase font-semibold tracking-widest hover:bg-brand-primary hover:text-[#050505] transition-colors duration-300">
               Discover The Belt
             </a>
          </div>
        </div>
      </div>
    </div>
  );
}
