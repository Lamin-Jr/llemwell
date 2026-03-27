'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#242424] border-b border-[#A6A096]/10 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between relative">

        {/* Left Navigation */}
        <nav className="hidden md:flex flex-1 gap-8 text-[11px] font-semibold uppercase tracking-widest text-[#BDC2C2]">
          <Link href="/" className="hover:text-[#BADADF] transition-colors duration-300">
            The Brand
          </Link>
          <Link href="/product" className="hover:text-[#050505] transition-colors duration-300">
            The Belt
          </Link>
        </nav>

        {/* Center Logo */}
        <Link href="/" className="flex flex-col items-center justify-center shrink-0 absolute left-1/2 -translate-x-1/2">
          <div className="relative w-12 h-12 mb-1">
            <Image
              src='/images/logollemwell.png'
              alt="LLEMWELLLogo"
              fill
              className="object-contain"
            />
          </div>
          {/* <span className="text-xl tracking-[0.25em] font-serif luxury-heading text-[#BADADF]">LLEMWELL</span> */}
        </Link>

        {/* Right Navigation */}
        <nav className="hidden md:flex flex-1 justify-end gap-8 text-[11px] font-semibold uppercase tracking-widest text-[#BDC2C2]">
          <Link href="/about" className="hover:text-[#BADADF] transition-colors duration-300">
            Heritage
          </Link>
          <Link href="/contact" className="hover:text-[#BADADF] transition-colors duration-300">
            Boutique
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-[#BADADF] focus:outline-none relative z-10 ml-auto pt-4">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#242424] border-t border-[#A6A096]/10 py-8 px-8 flex flex-col gap-6 text-sm tracking-widest uppercase font-semibold text-[#BDC2C2]">
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
    </header>
  );
}
