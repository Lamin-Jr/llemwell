'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { BackendProduct } from '@/src/types';

interface ProductContextType {
  products: BackendProduct[];
  setProducts: React.Dispatch<React.SetStateAction<BackendProduct[]>>;
  isLoading: boolean;
  getProductBySlugOrId: (slugOrId: string) => BackendProduct | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ 
  children, 
  initialProducts = [] 
}: { 
  children: React.ReactNode, 
  initialProducts?: BackendProduct[] 
}) {
  const [products, setProducts] = useState<BackendProduct[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(!initialProducts.length);

  // If initialProducts weren't provided or we want to re-fetch on the client, we could do it here.
  // But relying on SSR initialProducts is the most scalable Next.js architecture.
  useEffect(() => {
    if (initialProducts.length > 0) {
      setProducts(initialProducts);
      setIsLoading(false);
    }
  }, [initialProducts]);

  const getProductBySlugOrId = (slugOrId: string) => {
    return products.find(p => p.slug === slugOrId || p.id === slugOrId);
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, isLoading, getProductBySlugOrId }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
