import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="bg-[#BDC2C2] min-h-screen text-[#050505] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-brand-primary uppercase tracking-[0.2em] font-semibold text-xs mb-4">Legal</h2>
        <h1 className="text-5xl luxury-heading mb-12">Terms of Use</h1>
        
        <div className="space-y-12 font-serif text-[#050505]/80 leading-relaxed text-lg">
          <section>
            <h3 className="uppercase font-sans tracking-widest text-[#050505] font-semibold text-sm mb-4">1. Acceptance of Terms</h3>
            <p>
              By accessing and using the LLEMWELL digital boutique, you accept and agree to be bound by the terms and provision of this agreement. 
              The platform is reserved for clients seeking our exclusive, high-fashion artisan leather goods.
            </p>
          </section>

          <section>
            <h3 className="uppercase font-sans tracking-widest text-[#050505] font-semibold text-sm mb-4">2. Product Allocations</h3>
            <p>
              Due to the highly limited nature of our raw distressed materials and custom silver hardware, all products are sold via allocation. 
              Submitting an inquiry does not guarantee an acquisition. LLEMWELL reserves the right to refuse service to anyone at our sole discretion.
            </p>
          </section>

          <section>
            <h3 className="uppercase font-sans tracking-widest text-[#050505] font-semibold text-sm mb-4">3. Intellectual Property</h3>
            <p>
              All content included on this site, such as text, graphics, logos, images, and video clips, is the property of LLEMWELL or its content suppliers and protected by international copyright laws.
              Unauthorized reproduction of our Opium aesthetic marks and product designs will result in immediate legal action.
            </p>
          </section>

          <section>
            <h3 className="uppercase font-sans tracking-widest text-[#050505] font-semibold text-sm mb-4">4. Variations in Distressed Leather</h3>
            <p>
              Every LLEMWELL belt is crafted by hand using distressed calfskin and heavy metal hardware. As a result of our brutalist manufacturing process, scarring, patinas, and slight hardware oxidation are intentional. 
              These are not defects, but the very essence of our underground aesthetic. Returns based on natural material variations will not be accepted.
            </p>
          </section>
        </div>

        <div className="mt-20 border-t border-black/10 pt-12">
           <Link href="/" className="inline-block px-12 py-4 bg-[#242424] text-[#BDC2C2] text-sm uppercase font-semibold tracking-widest hover:bg-brand-primary hover:text-[#050505] transition-colors duration-300">
             Return to The Brand
           </Link>
        </div>
      </div>
    </div>
  );
}
