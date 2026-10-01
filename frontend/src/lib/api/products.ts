import { BackendProduct } from '@/src/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function fetchProducts(): Promise<BackendProduct[]> {
  try {
    const res = await fetch(`${API_URL}/api/products`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}

export async function fetchProductById(id: string): Promise<BackendProduct | null> {
  try {
    const res = await fetch(`${API_URL}/api/products/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch product');
    const data = await res.json();
    return data.product || null;
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
}
