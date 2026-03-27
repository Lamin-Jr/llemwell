import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative overflow-hidden bg-black aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="mt-6">
        <h3 className="text-xl luxury-heading">{product.name}</h3>
        <p className="text-lg mt-1">€{product.price}</p>
      </div>
    </Link>
  );
}
