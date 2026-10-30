'use client';

import React, { createContext, useContext, useState } from 'react';
import { BackendProduct } from '@/types';

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
  const [prevInitialProducts, setPrevInitialProducts] = useState<BackendProduct[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(!initialProducts.length);

  // Synchronize state when initialProducts from SSR changes without cascading effect
  if (initialProducts !== prevInitialProducts) {
    setPrevInitialProducts(initialProducts);
    setProducts(initialProducts);
    if (initialProducts.length > 0) {
      setIsLoading(false);
    }
  }

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
