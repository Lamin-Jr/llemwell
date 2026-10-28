import InteractiveProductCatalog from '@/components/sections/InteractiveProductCatalog';
import { fetchProducts } from '@/lib/api/products';

export const revalidate = 60; // Revalidate the page every 60 seconds

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <main className="bg-background">
      <InteractiveProductCatalog products={products} />
    </main>
  );
}
