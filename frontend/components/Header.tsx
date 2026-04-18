'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      console.log(latest);
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-[#121212]/95 backdrop-blur-md shadow-sm border-b border-[#A6A096]/10' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between relative transition-all duration-500 ${scrolled ? 'h-20' : 'h-28'}`}>

        {/* Left Navigation */}
        <nav className="hidden md:flex flex-1 gap-8 text-[11px] font-semibold uppercase tracking-widest text-[#BDC2C2]">
          <Link href="/" className="hover:text-white transition-colors duration-300 drop-shadow-md">
            The Brand
          </Link>
          <Link href="/product" className="hover:text-white transition-colors duration-300 drop-shadow-md">
            The Belt
          </Link>
        </nav>

        {/* Center Logo */}
        <Link href="/" className="flex flex-col items-center justify-center shrink-0 absolute left-1/2 -translate-x-1/2">
          <div className={`relative transition-all duration-500 ${scrolled ? 'w-16 h-16' : 'w-24 h-24'} mb-1`}>
            <Image
              src='/images/logollemwell.png'
              alt="LLEMWELLLogo"
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* Right Navigation */}
        <nav className="hidden md:flex flex-1 justify-end gap-8 text-[11px] font-semibold uppercase tracking-widest text-[#BDC2C2]">
          <Link href="/about" className="hover:text-white transition-colors duration-300 drop-shadow-md">
            Heritage
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors duration-300 drop-shadow-md">
            Boutique
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white drop-shadow-md focus:outline-none relative z-10 ml-auto pt-4">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#121212] border-t border-[#A6A096]/10 py-8 px-8 flex flex-col gap-6 text-sm tracking-widest uppercase font-semibold text-[#BDC2C2] h-screen">
          <Link href="/" onClick={() => setOpen(false)} className="hover:text-[#BADADF] transition-colors">
            The Brand
          </Link>
          <Link href="/product" onClick={() => setOpen(false)} className="hover:text-[#BADADF] transition-colors">
            The Belt
          </Link>
          <Link href="/about" onClick={() => setOpen(false)} className="hover:text-[#BADADF] transition-colors">
            Heritage
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="hover:text-[#BADADF] transition-colors">
            Boutique
          </Link>
        </div>
      )}
    </motion.header>
  );
}
