import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchProducts } from '@/lib/api/products';
import { ProductProvider } from '@/context/ProductContext';

export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialProducts = await fetchProducts();

  return (
    <ProductProvider initialProducts={initialProducts}>
      {/* Skip Navigation — Accessibility */}
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>

      <Header />

      <div id="main-content" className="flex-grow">
        {children}
      </div>

      <Footer />
    </ProductProvider>
  );
}
