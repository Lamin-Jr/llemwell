export type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  material: string;
  buckle: string;
  imageId: string;
  status?: "draft" | "pending" | "live";
  collectionId?: number | null;
};

export type Collection = {
  id: number;
  title: string;
  slug: string;
  description: string;
  productIds: number[];
  image: string;
};
