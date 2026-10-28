'use client';

import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { subscribeNewsletter } from '@/actions';

export default function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Call the server action
    const formData = new FormData(e.target as HTMLFormElement);
    const res = await subscribeNewsletter(formData);
    
    if (res.success) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="h-14 flex items-center border border-text-tertiary px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-text-primary">
          You have been added to the waitlist.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md group">
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="w-full h-14 bg-transparent border-b border-border-strong text-text-primary placeholder:text-text-tertiary placeholder:uppercase placeholder:tracking-[0.2em] focus:outline-none focus:border-text-primary transition-colors pr-14 rounded-none"
      />
      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="absolute right-0 top-0 h-14 w-14 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <ArrowRight size={20} />
        )}
      </button>
    </form>
  );
}
