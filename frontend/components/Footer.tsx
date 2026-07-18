import Link from 'next/link';

const FOOTER_LINKS = [
  { label: 'Heritage', href: '/about' },
  { label: 'Client Care', href: '/contact' },
  { label: 'Terms of Use', href: '/terms' },
];

export default function Footer() {
  return (
    <footer
      className="bg-surface-secondary py-16 xl:py-24"
      style={{ borderTop: '1px solid var(--border-subtle)' }}
    >
      <div className="container-luxury text-center">
        <Link
          href="/"
          className="luxury-heading text-text-primary text-xl tracking-[0.2em] inline-block"
        >
          LLEMWELL
        </Link>

        <p className="luxury-caption text-text-tertiary mt-2">
          © {new Date().getFullYear()} LLEMWELL Genève. All rights reserved.
        </p>

        <div className="flex justify-center gap-8 mt-12">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text-tertiary hover:text-text-primary transition-colors duration-300 uppercase tracking-[0.15em] text-[10px]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
