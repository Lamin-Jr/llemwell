'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';

const NAV_LEFT = [
  { label: 'The Brand', href: '/' },
  { label: 'The Belt', href: '/product' },
];

const NAV_RIGHT = [
  { label: 'Heritage', href: '/about' },
  { label: 'Boutique', href: '/contact' },
];

const ALL_NAV = [...NAV_LEFT, ...NAV_RIGHT];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-header' : 'bg-transparent'
        }`}
      >
        <div
          className={`container-luxury flex items-center justify-between relative transition-all duration-500 ${
            scrolled ? 'h-18' : 'h-24'
          }`}
        >
          {/* Left Navigation */}
          <nav className="hidden md:flex flex-1 gap-8">
            {NAV_LEFT.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11px] uppercase tracking-[0.2em] font-normal transition-opacity duration-300"
                style={{ color: 'var(--foreground)', opacity: 0.7 }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.opacity = '1')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.opacity = '0.7')
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Center Logo */}
          <Link
            href="/"
            className="flex items-center justify-center shrink-0 absolute left-1/2 -translate-x-1/2"
          >
            <div
              className={`relative transition-all duration-500 ${
                scrolled ? 'w-14 h-14' : 'w-20 h-20'
              }`}
            >
              <Image
                src="/images/logollemwell.png"
                alt="LLEMWELL"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Right Navigation */}
          <nav className="hidden md:flex flex-1 justify-end gap-8">
            {NAV_RIGHT.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11px] uppercase tracking-[0.2em] font-normal transition-opacity duration-300"
                style={{ color: 'var(--foreground)', opacity: 0.7 }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.opacity = '1')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.opacity = '0.7')
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden ml-auto focus:outline-none relative z-10"
            style={{ color: 'var(--foreground)' }}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-surface-primary flex flex-col items-center justify-center"
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 focus:outline-none"
              style={{ color: 'var(--foreground)' }}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            {/* Navigation Links */}
            <nav className="flex flex-col items-center gap-8">
              {ALL_NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-2xl luxury-heading text-text-primary hover:text-accent-primary transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
