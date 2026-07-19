'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState, useCallback } from 'react';
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';
import { products } from '@/lib/data';

/* ═══════════════════════════════════════════════════════
   NAVIGATION DATA
   ═══════════════════════════════════════════════════════ */

interface NavItem {
  label: string;
  href: string;
  hasSubmenu?: boolean;
}

const MENU_ITEMS: NavItem[] = [
  { label: 'The Collection', href: '/products', hasSubmenu: true },
  { label: 'The Belt', href: '/product' },
  { label: 'Heritage', href: '/about' },
  { label: 'Client Care', href: '/contact' },
  { label: 'Terms of Use', href: '/terms' },
];

/* ═══════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════ */

const LUXURY_EASE = [0.77, 0, 0.175, 1] as const;
const MENU_EASE = [0.16, 1, 0.3, 1] as const;
const PANEL_DURATION = 0.5;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants = {
  hidden: { x: '-100%' },
  visible: {
    x: 0,
    transition: { duration: PANEL_DURATION, ease: LUXURY_EASE },
  },
  exit: {
    x: '-100%',
    transition: { duration: 0.4, ease: LUXURY_EASE },
  },
};

/* Desktop submenu — slides in from the left of its positioned container (left: 50vw) */
const submenuDesktopVariants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: LUXURY_EASE, delay: 0.05 },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: { duration: 0.3, ease: LUXURY_EASE },
  },
};

/* Mobile submenu — slides in from right, replacing the primary panel */
const submenuMobileVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { duration: 0.4, ease: LUXURY_EASE },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.35, ease: LUXURY_EASE },
  },
};

/* Mobile primary panel — slides out left when submenu opens */
const panelMobileHideVariants = {
  visible: { x: 0 },
  hidden: {
    x: '-30%',
    transition: { duration: 0.35, ease: LUXURY_EASE },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.15 + i * 0.06,
      ease: MENU_EASE,
    },
  }),
};

const submenuItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.1 + i * 0.08,
      ease: MENU_EASE,
    },
  }),
};

/* ═══════════════════════════════════════════════════════
   SUBMENU CONTENT (shared between mobile & desktop)
   ═══════════════════════════════════════════════════════ */

function SubmenuContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex-1 overflow-y-auto px-6 md:px-8 py-4 hide-scrollbar">
      <ul className="space-y-6">
        {products.map((product, i) => (
          <motion.li
            key={product.id}
            custom={i}
            variants={submenuItemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="group block"
            >
              {/* Product Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden mb-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Product Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h3
                    className="text-sm md:text-base luxury-heading tracking-wide opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-[11px] mt-1 uppercase tracking-[0.15em]"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >
                    €{product.price.toLocaleString()}
                    
                  </p>
                </div>
                <span
                  className="text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                  style={{ color: 'var(--foreground)' }}
                >
                  Discover
                </span>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* View All Link */}
      <motion.div
        custom={products.length}
        variants={submenuItemVariants}
        initial="hidden"
        animate="visible"
        className="mt-8 pt-6"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        <Link
          href="/products"
          onClick={onClose}
          className="flex items-center gap-3 group"
          style={{ color: 'var(--foreground)' }}
        >
          <span className="text-[11px] uppercase tracking-[0.2em] opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            View Entire Collection
          </span>
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
          />
        </Link>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   HEADER COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  const handleMenuOpen = useCallback(() => {
    setMenuOpen(true);
    setSubmenuOpen(false);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleMenuClose = useCallback(() => {
    setMenuOpen(false);
    setSubmenuOpen(false);
    document.body.style.overflow = '';
  }, []);

  const handleNavClick = useCallback(
    (item: NavItem) => {
      if (item.hasSubmenu) {
        setSubmenuOpen((prev) => !prev);
      } else {
        handleMenuClose();
      }
    },
    [handleMenuClose]
  );

  const handleSubmenuBack = useCallback(() => {
    setSubmenuOpen(false);
  }, []);

  return (
    <>
      {/* ═══ FIXED HEADER BAR ═══ */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'glass-header' : 'bg-transparent'
        }`}
      >
        <div
          className={`flex items-center justify-between px-6 md:px-10 transition-all duration-500 ${
            scrolled ? 'h-16 md:h-18' : 'h-20 md:h-24'
          }`}
        >
          {/* LEFT — Menu Trigger */}
          <button
            onClick={handleMenuOpen}
            className="flex items-center gap-3 z-10 group"
            style={{ color: 'var(--foreground)' }}
            aria-label="Open navigation menu"
          >
            <Menu
              size={30}
              strokeWidth={1.5}
              className="transition-opacity duration-300 group-hover:opacity-100 opacity-80"
            />
            <span className="hidden md:inline text-[11px] uppercase tracking-[0.2em] font-normal opacity-70 group-hover:opacity-100 transition-opacity duration-300">
              Menu
            </span>
          </button>

          {/* CENTER — Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
          >
            <div
              className={`relative transition-all duration-500 ${
                scrolled ? 'w-12 h-12 md:w-14 md:h-14' : 'w-16 h-16 md:w-20 md:h-20'
              }`}
            >
              <Image
                src="/images/logollemwell.png"
                alt="LLEMWELL"
                fill
                className="object-contain"
                sizes="80px"
                priority
              />
            </div>
          </Link>

          {/* RIGHT — Boutique Link */}
          <Link
            href="/contact"
            className="flex items-center gap-2 z-10 group"
            style={{ color: 'var(--foreground)' }}
          >
            <span className="text-[11px] uppercase tracking-[0.2em] font-normal opacity-70 group-hover:opacity-100 transition-opacity duration-300">
              Boutique
            </span>
          </Link>
        </div>
      </motion.header>

      {/* ═══ MENU OVERLAY & DRAWER ═══ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dark Overlay */}
            <motion.div
              key="menu-overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-50"
              style={{ background: 'rgba(0, 0, 0, 0.6)' }}
              onClick={handleMenuClose}
              aria-hidden="true"
            />

            {/* ═══ PRIMARY MENU PANEL ═══ */}
            <motion.nav
              key="menu-panel"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 left-0 h-full z-50 flex flex-col w-[100vw] md:w-[50vw]"
              style={{
                background: 'var(--background)',
                borderRight: '1px solid var(--border-subtle)',
              }}
              aria-label="Main navigation"
            >
              {/* 
                On mobile: when submenu opens, slide the primary content out 
                by animating opacity to hide it visually 
              */}
              <motion.div
                className="flex flex-col h-full md:!transform-none md:!opacity-100"
                animate={submenuOpen ? { x: '-30%', opacity: 0 } : { x: 0, opacity: 1 }}
                transition={{ duration: 0.35, ease: LUXURY_EASE }}
              >
                {/* Panel Header — Close Button */}
                <div className="flex items-center justify-between px-6 md:px-8 h-20 md:h-24 shrink-0">
                  <button
                    onClick={handleMenuClose}
                    className="flex items-center gap-3 group"
                    style={{ color: 'var(--foreground)' }}
                    aria-label="Close menu"
                  >
                    <X
                      size={20}
                      strokeWidth={1.5}
                      className="opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <span className="text-[11px] uppercase tracking-[0.2em] font-normal opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      Close
                    </span>
                  </button>
                </div>

                {/* Menu Items — right-aligned within panel to appear centered on screen */}
                <div className="flex-1 flex flex-col justify-center items-center md:items-end px-8 md:px-16 lg:px-20">
                  <ul className="space-y-1 w-full max-w-[320px]">
                    {MENU_ITEMS.map((item, i) => (
                      <motion.li
                        key={item.label}
                        custom={i}
                        variants={menuItemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {item.hasSubmenu ? (
                          <button
                            onClick={() => handleNavClick(item)}
                            className={`w-full flex items-center justify-between py-4 group transition-opacity duration-300 ${
                              submenuOpen
                                ? 'opacity-100'
                                : 'opacity-70 hover:opacity-100'
                            }`}
                            style={{ color: 'var(--foreground)' }}
                          >
                            <span className="text-xl md:text-2xl luxury-heading tracking-wide">
                              {item.label}
                            </span>
                            <ArrowRight
                              size={18}
                              strokeWidth={1.5}
                              className={`transition-transform duration-500 ${
                                submenuOpen ? 'rotate-180' : 'group-hover:translate-x-1'
                              }`}
                            />
                          </button>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => handleNavClick(item)}
                            className="block py-4 opacity-70 hover:opacity-100 transition-opacity duration-300"
                            style={{ color: 'var(--foreground)' }}
                          >
                            <span className="text-xl md:text-2xl luxury-heading tracking-wide">
                              {item.label}
                            </span>
                          </Link>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Panel Footer */}
                <div
                  className="px-6 md:px-12 py-8 shrink-0"
                  style={{ borderTop: '1px solid var(--border-subtle)' }}
                >
                  <p className="luxury-caption" style={{ color: 'var(--color-text-tertiary)' }}>
                    © {new Date().getFullYear()} LLEMWELL
                  </p>
                </div>
              </motion.div>

              {/* ═══ MOBILE SUBMENU — slides over primary panel ═══ */}
              <AnimatePresence>
                {submenuOpen && (
                  <motion.div
                    key="mobile-submenu"
                    variants={submenuMobileVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="md:hidden absolute inset-0 z-10 flex flex-col"
                    style={{ background: '#111111' }}
                  >
                    {/* Submenu Header — Back Button */}
                    <div className="flex items-center justify-between px-6 h-20 shrink-0">
                      <button
                        onClick={handleSubmenuBack}
                        className="flex items-center gap-3 group"
                        style={{ color: 'var(--foreground)' }}
                        aria-label="Back to menu"
                      >
                        <ArrowLeft
                          size={18}
                          strokeWidth={1.5}
                          className="opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <span className="text-[11px] uppercase tracking-[0.2em] font-normal opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                          Menu
                        </span>
                      </button>

                      <button
                        onClick={handleMenuClose}
                        className="flex items-center gap-3 group"
                        style={{ color: 'var(--foreground)' }}
                        aria-label="Close menu"
                      >
                        <X
                          size={18}
                          strokeWidth={1.5}
                          className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </button>
                    </div>

                    {/* Title */}
                    <div className="px-6 pb-4">
                      <p
                        className="text-[11px] uppercase tracking-[0.25em] font-normal"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        Our Pieces
                      </p>
                    </div>

                    {/* Shared product content */}
                    <SubmenuContent onClose={handleMenuClose} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.nav>

            {/* ═══ DESKTOP SUBMENU PANEL — extends right, fills remaining 50vw ═══ */}
            <AnimatePresence>
              {submenuOpen && (
                <motion.div
                  key="desktop-submenu-panel"
                  variants={submenuDesktopVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="hidden md:flex fixed top-0 left-[50vw] w-[50vw] h-full z-50 flex-col"
                  style={{ background: '#111111' }}
                >
                  {/* Submenu Header */}
                  <div className="flex items-center px-8 h-24 shrink-0">
                    <p
                      className="text-[11px] uppercase tracking-[0.25em] font-normal"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      Our Pieces
                    </p>
                  </div>

                  {/* Shared product content */}
                  <SubmenuContent onClose={handleMenuClose} />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
