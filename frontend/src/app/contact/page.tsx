'use client';

import { useState } from 'react';
import { submitContactForm } from '../actions';
import HeroMedia from '@/components/sections/HeroMedia';
import ScrollReveal from '@/components/ui/ScrollReveal';
import GhostButton from '@/components/ui/GhostButton';

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
    <main>
      {/* 1. Hero */}
      <HeroMedia
        imageSrc="/images/client_hero.jpg"
        imageAlt="LLEMWELL Client Care"
        heading="Client Care"
        subheading="Boutique Inquiries"
        overlayOpacity={60}
        align="center"
      />

      {/* 2. Contact Content */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* LEFT: Contact Info */}
            <div className="flex flex-col justify-center">
              <ScrollReveal direction="up">
                <p className="luxury-subheading text-accent-warm mb-4">
                  Get in Touch
                </p>
                <h2 className="luxury-heading text-text-primary text-3xl md:text-4xl mt-4">
                  We are Here for You
                </h2>
                <p className="body-serif text-text-secondary mt-6 leading-relaxed">
                  LLEMWELL provides a dedicated white-glove service for our
                  clients. Whether you wish to request an allocation, inquire
                  about bespoke sizing, or arrange a private viewing.
                </p>

                {/* Contact Details */}
                <div className="mt-12 space-y-8">
                  <div>
                    <p className="luxury-caption text-text-tertiary">
                      Headquarters
                    </p>
                    <p className="text-text-primary text-sm mt-2">
                      Nolo District, Milano, Italy
                    </p>
                  </div>

                  <div>
                    <p className="luxury-caption text-text-tertiary">
                      Concierge
                    </p>
                    <p className="text-text-primary text-sm mt-2">
                      +39 30 000 00 00
                    </p>
                    <p className="text-text-primary text-sm mt-1">
                      contact@llemwell.com
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* RIGHT: Form */}
            <div
              className="p-8 md:p-12"
              style={{
                backgroundColor: 'var(--color-surface-secondary)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {success ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20">
                  <h2 className="luxury-heading text-text-primary text-3xl">
                    Inquiry Received
                  </h2>
                  <p className="body-serif text-text-secondary">
                    Our concierge will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {error && (
                    <div className="text-red-400 text-sm mt-2">{error}</div>
                  )}

                  <div>
                    <label
                      htmlFor="name"
                      className="luxury-caption text-text-tertiary block mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full bg-transparent border-b py-3 text-base font-sans text-text-primary outline-none transition-colors duration-300"
                      style={{
                        borderColor: 'var(--border-subtle)',
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor =
                          'var(--border-strong)')
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor =
                          'var(--border-subtle)')
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="luxury-caption text-text-tertiary block mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full bg-transparent border-b py-3 text-base font-sans text-text-primary outline-none transition-colors duration-300"
                      style={{
                        borderColor: 'var(--border-subtle)',
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor =
                          'var(--border-strong)')
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor =
                          'var(--border-subtle)')
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="luxury-caption text-text-tertiary block mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full bg-transparent border-b py-3 text-base font-sans text-text-primary outline-none transition-colors duration-300"
                      style={{
                        borderColor: 'var(--border-subtle)',
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor =
                          'var(--border-strong)')
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor =
                          'var(--border-subtle)')
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry"
                      className="luxury-caption text-text-tertiary block mb-2"
                    >
                      Your Inquiry *
                    </label>
                    <textarea
                      id="inquiry"
                      name="inquiry"
                      required
                      rows={4}
                      className="w-full bg-transparent border-b py-3 text-base font-sans text-text-primary outline-none transition-colors duration-300 resize-none"
                      style={{
                        borderColor: 'var(--border-subtle)',
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor =
                          'var(--border-strong)')
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor =
                          'var(--border-subtle)')
                      }
                    />
                  </div>

                  <GhostButton
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                    loading={loading}
                  >
                    {loading ? 'Submitting...' : 'Send Inquiry'}
                  </GhostButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
