import Hero from '@/components/Hero';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Hero />

      <section className="bg-white text-black py-32 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative h-[600px]">
            <Image
              src="/images/belt_detail.png"
              alt="LLEMWELL Craftsmanship"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="luxury-subheading text-brand-secondary mb-4 text-sm font-bold">The Art of Rebellion</h3>
            <h2 className="text-4xl md:text-6xl luxury-heading mb-8">Raw Opium Aesthetic</h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-8 font-serif">
              Every LLEMWELL studded belt is a riot of craftsmanship. Forged from distressed calfskin leather and weaponized with heavy metal eyelets, silver spikes, and chunky vintage hardware. It is a pure embodiment of high-fashion grunge, designed for those who reject the ordinary.
            </p>
            <Link href="/product" className="inline-block border-b-2 border-brand-secondary pb-1 text-sm uppercase tracking-widest font-semibold hover:text-brand-secondary transition-colors">
              Explore the Details
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-40 px-6 bg-[#BDC2C2] text-[#050505]">
        <div className="absolute inset-0 opacity-70">
           <Image src="/images/belt_lifestyle.png" alt="Lifestyle" fill className="object-cover object-top" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#BDC2C2] via-[#242424]/80 to-[#BDC2C2]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl luxury-heading mb-8 text-slate-100 drop-shadow-xl">A Statement of Power</h2>
            <p className="text-xl md:text-2xl font-serif text-slate-100 mb-12 drop-shadow-md">
              Worn by the few who define the future.
            </p>
            <Link href="/contact" className="px-12 py-4 bg-brand-primary text-black uppercase tracking-[0.2em] font-semibold text-sm hover:bg-white transition-colors duration-300">
              Request an Allocation
            </Link>
        </div>
      </section>
    </>
  );
}
