'use client';
import { useParams } from 'next/navigation';
import { products } from '@/lib/data';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SingleProduct() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  const [currentImage, setCurrentImage] = useState(0);

  console.log(currentImage);

  if (!product) {
    return <div className="text-center py-32 text-3xl">Prodotto non trovato</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid md:grid-cols-2 gap-16">
        {/* Gallery */}
        <div>
          <motion.img
            key={currentImage}
            src={product.images[currentImage]}
            alt={product.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full aspect-square object-cover"
          />
          <div className="flex gap-4 mt-6">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`flex-1 aspect-video overflow-hidden border-2 ${i === currentImage ? 'border-[var(--gold)]' : 'border-transparent'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="pt-8">
          <h1 className="text-5xl luxury-heading">{product.name}</h1>
          <p className="text-4xl mt-4">€{product.price}</p>

          <div className="my-12 space-y-8 text-lg">
            <p>{product.description}</p>
            <div>
              <strong>Materiale:</strong> {product.material}
              <br />
              <strong>Fibbia:</strong> {product.buckle}
            </div>
          </div>

          <button
            onClick={() => alert('✓ Aggiunto al carrello (MVP)')}
            className="gold-button w-full py-6 text-xl uppercase tracking-widest"
          >
            Aggiungi al Carrello
          </button>
        </div>
      </div>
    </div>
  );
}
