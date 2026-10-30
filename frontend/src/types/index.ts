export type BackendProduct = {
  id: string;
  categoryId?: string | null;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  image?: string | null;
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  // Fallbacks for UI compatibility with old hardcoded data
  slug?: string;
  material?: string;
  buckle?: string;
};
