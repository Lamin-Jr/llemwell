import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#BDC2C2] border-t border-black/10 py-16 xl:py-24">
      <div className="max-w-7xl mx-auto px-6 text-center text-black/60">
        <Link href="/" className="font-serif luxury-heading text-brand-primary text-2xl tracking-[0.2em] mb-6 inline-block">
          LLEMWELL
        </Link>
        <p className="text-xs tracking-widest mt-2">
          © {new Date().getFullYear()} LLEMWELL Genève. All rights reserved.
        </p>
        <div className="flex justify-center gap-8 mt-12 text-[10px] tracking-[0.15em] uppercase font-semibold">
          <Link href="/about" className="hover:text-black transition-colors duration-300">
            Heritage
          </Link>
          <Link href="/contact" className="hover:text-black transition-colors duration-300">
            Client Care
          </Link>
          <Link href="/terms" className="hover:text-black transition-colors duration-300">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
}
