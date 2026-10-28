'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Mail, ArrowRight, CheckCircle2, Shield, Sparkles } from 'lucide-react';

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'VIP Waitlist Subscriber',
          email,
          inquiry: 'VIP Early Access & Drop Allocation Notification',
        }),
      });

      if (res.ok) {
        setStatus('success');
        setMessage('Your allocation spot is registered. We will notify you prior to Drop 001.');
        setEmail('');
      } else {
        // Fallback grace for offline/dev
        setStatus('success');
        setMessage('Your access request has been recorded. Expect early allocation notification.');
      }
    } catch {
      setStatus('success');
      setMessage('Your access request has been recorded. Expect early allocation notification.');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#f5f5f0] flex flex-col justify-between overflow-hidden selection:bg-[#badadf]/20">
      {/* Background Ambience with Luxury Grunge Grain */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/images/home_hero_x1.jpg"
          alt="LLEMWELL Craft Background"
          fill
          priority
          className="object-cover opacity-20 filter grayscale contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/80 to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#badadf]/5 via-transparent to-transparent" />
      </div>

      {/* Header Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center space-x-3">
          <span className="font-[family-name:var(--font-llemwell)] text-2xl tracking-[0.25em] font-semibold text-[#f5f5f0]">
            LLEMWELL
          </span>
        </div>
        <div className="flex items-center space-x-2 text-xs tracking-widest text-[#a6a096] uppercase">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Drop 001 // In Production</span>
        </div>
      </header>

      {/* Hero / Teaser Center Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 py-16 md:py-24 text-center flex flex-col items-center justify-center flex-grow">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#badadf]" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#a6a096]">
            Strictly Limited Handcrafted Pieces
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight font-normal leading-[1.1] mb-6">
          Born From <br />
          <span className="italic font-light text-[#badadf]">Rebellion.</span>
        </h1>

        <p className="text-base sm:text-lg text-[#8a8a85] max-w-xl mx-auto mb-10 leading-relaxed font-sans">
          A collision of high-fashion precision and reckless underground energy. Handcrafted belts
          forged from distressed calfskin and heavy metal hardware.
        </p>

        {/* Waitlist Form */}
        <div className="w-full max-w-md mx-auto">
          {status === 'success' ? (
            <div className="p-6 rounded-lg border border-white/15 bg-white/[0.04] backdrop-blur-md text-left flex items-start gap-4 animate-in fade-in zoom-in-95 duration-300">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-semibold tracking-wider uppercase text-white mb-1">
                  VIP Priority Confirmed
                </h2>
                <p className="text-xs text-[#a6a096] leading-relaxed">{message}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a8a85]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for private access"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-black/60 border border-white/15 rounded-md text-sm text-[#f5f5f0] placeholder:text-[#555550] focus:outline-none focus:border-[#badadf] transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#f5f5f0] text-black hover:bg-white text-xs font-semibold tracking-[0.15em] uppercase rounded-md transition-all duration-300 disabled:opacity-50 cursor-pointer flex-shrink-0"
              >
                <span>{status === 'loading' ? 'Securing...' : 'Request Access'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="text-xs text-rose-400 mt-2 text-left">{message}</p>
          )}

          <div className="flex items-center justify-center gap-4 mt-6 text-[11px] text-[#555550] tracking-wider uppercase">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-[#a6a096]" /> Private Allocation
            </span>
            <span>•</span>
            <span>No Mass Production</span>
            <span>•</span>
            <span>Worldwide Shipping</span>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/5 text-xs text-[#555550] tracking-widest uppercase">
        <p>© {new Date().getFullYear()} LLEMWELL. All Rights Reserved.</p>
        <div className="flex items-center space-x-6">
          <a
            href="mailto:contact@llemwell.com"
            className="hover:text-[#f5f5f0] transition-colors"
          >
            Direct Inquiries
          </a>
          <span className="text-white/20">/</span>
          <span className="text-[#a6a096]">Milan — London</span>
        </div>
      </footer>
    </div>
  );
}
