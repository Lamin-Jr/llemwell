import HeroMedia from '@/components/sections/HeroMedia';
import EditorialText from '@/components/sections/EditorialText';
import ProductCard, { BackendProduct } from '@/components/ui/ProductCard';
import GhostButton from '@/components/ui/GhostButton';

export const revalidate = 60; // Revalidate the page every 60 seconds

export default async function ProductsPage() {
  let products: BackendProduct[] = [];
  
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    const res = await fetch(`${apiUrl}/api/products`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      products = data.products || [];
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

  return (
    <main>
      {/* 1. Hero */}
      <HeroMedia
        imageSrc="/images/herox8.jpg"
        imageAlt="The LLEMWELL Collection"
        heading="The Collection"
        subheading="Handcrafted Pieces"
        overlayOpacity={60}
        align="center"
      />

      {/* 2. Product Grid */}
      <section className="section-padding">
        <div className="container-luxury">
          {products.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <p>No products available yet. Check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Editorial CTA */}
      <EditorialText
        subheading="Our Heritage"
        heading="Each Piece Tells a Story"
        body="Every LLEMWELL belt is handcrafted from distressed calfskin and heavy metal hardware. No two pieces are alike — each carries the marks of its creation."
      />

      {/* 4. CTA Button */}
      <div className="flex justify-center section-padding pb-0">
        <GhostButton href="/about" size="md">
          Explore Our Heritage
        </GhostButton>
      </div>

      {/* Bottom spacing */}
      <div className="section-padding" />
    </main>
  );
}
