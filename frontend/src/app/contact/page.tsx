'use client';
import { useState } from 'react';
import { submitContactForm } from '../actions';
import { CheckCircle2, ChevronRight, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || 'An unexpected error occurred.');
    }
    setLoading(false);
  }

  return (
    <div className="bg-[#BDC2C2] min-h-screen text-[#050505] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">

        {/* Left: Contact Info */}
        <div className="flex flex-col justify-center">
          <h2 className="text-brand-primary uppercase tracking-[0.2em] font-semibold text-xs mb-4">Client Care</h2>
          <h1 className="text-5xl luxury-heading mb-8">Boutique Inquiries</h1>
          <p className="text-[#050505]/70 font-serif text-lg leading-relaxed mb-12">
            LLEMWELL provides a dedicated white-glove service for our clients. Whether you wish to request an allocation, inquire about bespoke sizing, or arrange a private viewing in Milano.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="text-brand-primary shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold uppercase tracking-widest text-sm mb-2">Headquarters</h3>
                <p className="text-[#050505]/70 font-serif">Nolo District<br />000 Milano, Italy</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-brand-primary shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold uppercase tracking-widest text-sm mb-2">Concierge</h3>
                <p className="text-[#050505]/70 font-serif">+39 30 000 00 00<br />contact@llemwell.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: The Form */}
        <div className="bg-[#A6A096] border border-black/10 p-8 md:p-12">
          {success ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20">
              <CheckCircle2 size={64} className="text-brand-primary" />
              <h2 className="text-3xl luxury-heading text-[#050505]">Inquiry Received</h2>
              <p className="text-[#050505]/70 font-serif text-lg">
                Our concierge will contact you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="bg-red-900/30 border border-red-500/50 text-red-200 p-4 text-sm font-serif">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="name" className="block text-xs uppercase tracking-widest text-[#050505]/70">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full bg-transparent border-b border-black/20 focus:border-brand-primary outline-none py-2 text-lg font-serif transition-colors text-[#050505]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs uppercase tracking-widest text-[#050505]/70">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-transparent border-b border-black/20 focus:border-brand-primary outline-none py-2 text-lg font-serif transition-colors text-[#050505]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-[#050505]/70">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full bg-transparent border-b border-black/20 focus:border-brand-primary outline-none py-2 text-lg font-serif transition-colors text-[#050505]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="inquiry" className="block text-xs uppercase tracking-widest text-[#050505]/70">Your Inquiry *</label>
                <textarea
                  id="inquiry"
                  name="inquiry"
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-black/20 focus:border-brand-primary outline-none py-2 text-lg font-serif transition-colors resize-none text-[#050505]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-brand-primary text-black uppercase tracking-[0.2em] font-bold text-sm hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Send Inquiry'}
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
