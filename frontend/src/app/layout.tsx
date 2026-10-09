import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';


/* ═══════════════════════════════════════════════════════
   FONT LOADING — LLEMWELL Brand Fonts
   ═══════════════════════════════════════════════════════ */

const llemwellFont = localFont({
  src: '../assets/fonts/llemwell_2.otf',
  variable: '--font-llemwell',
  display: 'swap',
});

const llemwell2Font = localFont({
  src: '../assets/fonts/llemwell_2.otf',
  variable: '--font-llemwell-2',
  display: 'swap',
});

const llemwellSmallFont = localFont({
  src: '../assets/fonts/llemwell_small.otf',
  variable: '--font-llemwell-small',
  display: 'auto',
});

/* ── Google Fonts ── */

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

/* ═══════════════════════════════════════════════════════
   METADATA
   ═══════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: 'LLEMWELL | Handcrafted Belts',
  description:
    'Discover LLEMWELL — handcrafted luxury belts forged from distressed calfskin and heavy metal hardware. Uncompromising craftsmanship for the bold.',
  keywords: ['LLEMWELL', 'luxury belts', 'handcrafted leather', 'designer belts', 'studded belt'],
  openGraph: {
    title: 'LLEMWELL | Handcrafted Italian Made Belts',
    description:
      'Handcrafted luxury belts forged from distressed calfskin and heavy metal hardware.',
    type: 'website',
  },
};

/* ═══════════════════════════════════════════════════════
   ROOT LAYOUT
   ═══════════════════════════════════════════════════════ */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`
          ${inter.variable} 
          ${playfair.variable} 
          ${llemwellFont.variable} 
          ${llemwell2Font.variable} 
          ${llemwellSmallFont.variable} 
          antialiased 
          min-h-screen 
          flex 
          flex-col
        `}
      >
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
