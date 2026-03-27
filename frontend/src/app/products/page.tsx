import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/lib/data';

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <h1 className="text-6xl luxury-heading text-center mb-16">Collezioni</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
