'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-[#BDC2C2]">
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y: y1, opacity }}
      >
        <Image
          src="/images/belt_hero.png"
          alt="LLEMWELL Luxury Belt"
          fill
          priority
          className="object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#BDC2C2] via-[#242424]/60 to-[#242424]/80 pointer-events-none" />
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-4xl mt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="luxury-subheading text-brand-primary mb-6 text-xs md:text-sm"
        >
          Uncompromising Craftsmanship
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-5xl md:text-8xl luxury-heading text-slate-100 mb-8 tracking-wide drop-shadow-2xl"
        >
          RAW OPIUM <br/> AESTHETIC
        </motion.h1>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 1 }}
        >
          <Link
            href="/product"
            className="inline-block px-12 py-4 text-xs font-semibold uppercase tracking-[0.2em] border border-[#BADADF] bg-[#BADADF]/10 text-[#BADADF] hover:bg-[#BADADF] hover:text-[#242424] transition-all duration-500 backdrop-blur-sm"
          >
            Discover the Belt
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
