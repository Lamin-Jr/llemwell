import { Product } from './types/types';

export const products: Product[] = [
  {
    id: 1,
    slug: 'mirror_v1',
    name: 'DRAGONFLY-V1 Mirror',
    price: 850,
    image: '/product-images/mirror/mirror_1.jpg',
    images: [
      '/product-images/mirror/mirror_1.jpg',
      '/product-images/mirror/mirror_2.jpg',
      '/product-images/mirror/mirror_3.jpg',
    ],
    description:
      'A true piece of high-fashion grunge. Crafted from distressed black calfskin leather, fortified with heavy metal eyelets, silver spikes, and chunky vintage hardware. Designed for the raw, unapologetic aesthetic.',
    material: 'Distressed Black Calfskin',
    buckle: 'Heavy Silver-toned Metal',
    imageId: 'GB-1',
  },
  {
    id: 3,
    slug: 'hairline',
    name: 'hairline v1',
    price: 220,
    image: '/product-images/hairline/hairline_1.jpg',
    images: [
      '/product-images/hairline/hairline_1.jpg',
      '/product-images/hairline/hairline_2.jpg',
      '/product-images/hairline/hairline_3.jpg',
    ],
    description:
      'Minimalist brutalism. Clean lines of distressed leather punctuated by rows of gunmetal eyelets. A quieter rebellion — no less dangerous.',
    material: 'Distressed Charcoal Calfskin',
    buckle: 'Gunmetal Square Buckle',
    imageId: 'GB-3',
  },
  {
    id: 2,
    slug: 'dlc_black',
    name: 'DLC Black',
    price: 650,
    image: '/product-images/dlc_black/dlc_black_4.jpg',
    images: [
      '/product-images/dlc_black/dlc_black_4.jpg',
      '/product-images/dlc_black/dlc_black_2.jpg',
      '/product-images/dlc_black/dlc_black_3.jpg',
    ],
    description:
      'Industrial elegance redefined. Hand-stitched from aged calfskin with oxidized chain links and a vintage clasp mechanism. Each belt develops its own unique patina over time.',
    material: 'Aged Black Calfskin',
    buckle: 'Oxidized Chain-link Metal',
    imageId: 'GB-2',
  },
  {
    id: 4,
    slug: '925',
    name: '925',
    price: 220,
    image: '/product-images/925/925.jpg',
    images: ['/product-images/925/925.jpg', '/images/hero_a5.jpg', '/images/hero_a3.jpg'],
    description:
      'Minimalist brutalism. Clean lines of distressed leather punctuated by rows of gunmetal eyelets. A quieter rebellion — no less dangerous.',
    material: 'Distressed Charcoal Calfskin',
    buckle: 'Gunmetal Square Buckle',
    imageId: 'GB-4',
  },
];
