import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import localFont from 'next/font/local'; 
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const llemwellFont = localFont({
  src: './fonts/llemwell.otf', // Point at the main
  variable: '--font-llemwell',
  display: 'swap',
});

//Second font
const llemwell_2_Font = localFont({
  src: './fonts/llemwell.otf', // Point this at second font
  variable: '--font-llemwell-2',
  display: 'swap',
});

const llemwell_Small_Font = localFont({
  src: './fonts/llemwell.otf', // Point at small font
  variable: '--font-llemwell-small',
  display: 'swap',
});

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

export const metadata: Metadata = {
  title: 'LLEMWELL | The Pinnacle of your fav Accesories',
  description: 'Discover the LLEMWELL Belt. A masterpiece of modern craftsmanship forged from solid gold and aerospace-grade steel.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.variable} ${playfair.variable} ${llemwellFont.variable} ${llemwell_2_Font.variable} ${llemwell_Small_Font.variable} antialiased bg-[#BDC2C2] text-[#050505] min-h-screen selection:bg-brand-primary selection:text-black flex flex-col`}>
        <Header />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

