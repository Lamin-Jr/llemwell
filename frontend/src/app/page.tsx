import HeroMedia from '@/components/sections/HeroMedia';
import EditorialText from '@/components/sections/EditorialText';
import ImageShowcase from '@/components/sections/ImageShowcase';
import SplitContent from '@/components/sections/SplitContent';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/lib/data';

export default function Home() {
  return (
    <main>
      {/* 1. Cinematic Hero */}
      <HeroMedia
        imageSrc="/images/herox3.jpg"
        imageAlt="LLEMWELL Luxury Belt"
        // subheading="Uncompromising Craftsmanship"
        heading="Breaking Barriers"
        // ctaText="Discover the Collection"
        ctaLink="/products"
        showScrollIndicator={true}
        overlayOpacity={50}
      />

      {/* 2. Editorial Introduction */}
      <EditorialText
        subheading="The Craft"
        heading="Born From Rebellion"
        body="We did not create LLEMWELL to follow trends. We created it to build armor. A true collision of high-fashion precision and reckless underground energy — handcrafted belts forged from distressed calfskin and heavy metal hardware."
      />

      {/* 3. Full-Bleed Detail Image */}
      <ImageShowcase
        src="/images/herox_A2.jpg"
        alt="LLEMWELL belt close-up detail"
        height="60vh"
      />

      {/* 4. Split Content — Material Story */}
      <SplitContent
        imageSrc="/images/herox5.jpg"
        imageAlt="LLEMWELL distressed calfskin leather"
        subheading="The Material"
        heading="Distressed Calfskin"
        description="We scour the earth to source materials that can survive the mosh pit and the runway alike. Our leather is thick, distressed calfskin, scarred to perfection. The heavy metal hardware oxidizes naturally over time — creating a chaotic patina that only gets better with age."
        ctaText="Explore The Belt"
        ctaLink="/product"
      />

      {/* 5. Product Collection Grid */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="luxury-subheading text-accent-warm mb-4">
              The Collection
            </p>
            <h2 className="luxury-heading text-text-primary text-4xl md:text-5xl lg:text-6xl">
              Explore Our Pieces
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA Hero */}
      <HeroMedia
        imageSrc="/images/herox4.jpg"
        imageAlt="A Statement of Power"
        heading="A Statement of Power"
        subheading="Worn by the few who define the future"
        ctaText="Request Your Allocation"
        ctaLink="/contact"
        overlayOpacity={65}
        align="center"
      />
    </main>
  );
}
