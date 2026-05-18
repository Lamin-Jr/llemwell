'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { id: 'discover', label: 'Discover' },
  { id: 'features', label: 'Features' },
  { id: '3d-viewer', label: '3D Viewer' },
  { id: 'specifications', label: 'Specifications' }
];

export default function ProductSubNav() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // The hero is 100vh. When we scroll past it, make it sticky.
      if (window.scrollY > window.innerHeight - 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // offset for the sticky header (main header is ~100px, subnav is ~60px)
      const offset = 160; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div 
      className={`w-full z-40 transition-all duration-300 border-y border-black/5 bg-background ${
        isSticky ? 'fixed top-20 left-0 shadow-sm' : 'relative'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1 }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-center md:justify-start overflow-x-auto hide-scrollbar">
        <ul className="flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-semibold text-foreground/70 whitespace-nowrap">
          {navItems.map((item) => (
            <li key={item.id}>
              <button 
                onClick={() => scrollTo(item.id)}
                className="hover:text-brand-primary transition-colors py-2 focus:outline-none"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
