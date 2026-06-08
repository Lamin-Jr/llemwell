import GhostButton from '@/components/ui/GhostButton';

export default function TermsPage() {
  return (
    <main>
      {/* 1. Page Header */}
      <div className="pt-40 pb-16">
        <div className="container-narrow">
          <p className="luxury-subheading text-accent-warm">Legal</p>
          <h1 className="luxury-heading text-text-primary text-4xl md:text-5xl lg:text-6xl mt-4">
            Terms of Use
          </h1>
        </div>
      </div>

      {/* 2. Content Sections */}
      <div className="container-narrow pb-[var(--section-gap)]">
        <section className="mb-16">
          <h3 className="luxury-caption text-text-primary mb-4">
            1. Acceptance of Terms
          </h3>
          <p className="body-serif text-text-secondary leading-relaxed">
            By accessing and using the LLEMWELL digital boutique, you accept and
            agree to be bound by the terms and provision of this agreement. The
            platform is reserved for clients seeking our exclusive, high-fashion
            artisan leather goods.
          </p>
        </section>

        <section className="mb-16">
          <h3 className="luxury-caption text-text-primary mb-4">
            2. Product Allocations
          </h3>
          <p className="body-serif text-text-secondary leading-relaxed">
            Due to the highly limited nature of our raw distressed materials and
            custom silver hardware, all products are sold via allocation.
            Submitting an inquiry does not guarantee an acquisition. LLEMWELL
            reserves the right to refuse service to anyone at our sole
            discretion.
          </p>
        </section>

        <section className="mb-16">
          <h3 className="luxury-caption text-text-primary mb-4">
            3. Intellectual Property
          </h3>
          <p className="body-serif text-text-secondary leading-relaxed">
            All content included on this site, such as text, graphics, logos,
            images, and video clips, is the property of LLEMWELL or its content
            suppliers and protected by international copyright laws.
            Unauthorized reproduction of our aesthetic marks and product designs
            will result in immediate legal action.
          </p>
        </section>

        <section className="mb-16">
          <h3 className="luxury-caption text-text-primary mb-4">
            4. Variations in Distressed Leather
          </h3>
          <p className="body-serif text-text-secondary leading-relaxed">
            Every LLEMWELL belt is crafted by hand using distressed calfskin and
            heavy metal hardware. As a result of our brutalist manufacturing
            process, scarring, patinas, and slight hardware oxidation are
            intentional. These are not defects, but the very essence of our
            underground aesthetic. Returns based on natural material variations
            will not be accepted.
          </p>
        </section>

        {/* 3. Bottom CTA */}
        <div className="divider" />
        <div className="pt-12 flex justify-center pb-8">
          <GhostButton href="/" size="md">
            Return to The Brand
          </GhostButton>
        </div>
      </div>
    </main>
  );
}
