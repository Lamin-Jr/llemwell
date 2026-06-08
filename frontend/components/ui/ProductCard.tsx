'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group block bg-surface-secondary">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      {/* Text Content */}
      <div className="p-6">
        <h3 className="luxury-heading text-lg text-text-primary">
          {product.name}
        </h3>
        <p className="text-text-secondary text-sm mt-1">
          €{product.price}
        </p>
        <span className="luxury-caption text-text-tertiary hover:text-text-primary underline underline-offset-4 transition-colors duration-300 inline-block mt-4">
          Discover
        </span>
      </div>
    </Link>
  );
}
