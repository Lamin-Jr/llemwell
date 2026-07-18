import { Product } from './types';

export const products: Product[] = [
  {
    id: 1,
    slug: 'DRAGONFLY-V1',
    name: 'DRAGONFLY-V1 LEATHER BELT',
    price: 850,
    image: '/product-images/dragon-fly-model-x2.png',
    images: ['/product-images/dragon-fly-model-x4.png', '/images/belt_detail.png', '/images/belt_lifestyle.png'],
    description:
      'A true piece of high-fashion grunge. Crafted from distressed black calfskin leather, fortified with heavy metal eyelets, silver spikes, and chunky vintage hardware. Designed for the raw, unapologetic aesthetic.',
    material: 'Distressed Black Calfskin',
    buckle: 'Heavy Silver-toned Metal',
    imageId: 'GB-1',
  },
  {
    id: 2,
    slug: 'phantom-chain-belt',
    name: 'Phantom Chain Leather Belt',
    price: 650,
    image: '/images/belt_lifestyle.png',
    images: ['/images/belt_lifestyle.png', '/images/belt_detail.png', '/images/belt_hero.png'],
    description:
      'Industrial elegance redefined. Hand-stitched from aged calfskin with oxidized chain links and a vintage clasp mechanism. Each belt develops its own unique patina over time.',
    material: 'Aged Black Calfskin',
    buckle: 'Oxidized Chain-link Metal',
    imageId: 'GB-2',
  },
  {
    id: 3,
    slug: 'nocturne-eyelet-belt',
    name: 'Nocturne Eyelet Belt',
    price: 720,
    image: '/images/belt_detail.png',
    images: ['/images/belt_detail.png', '/images/belt_hero.png', '/images/belt_lifestyle.png'],
    description:
      'Minimalist brutalism. Clean lines of distressed leather punctuated by rows of gunmetal eyelets. A quieter rebellion — no less dangerous.',
    material: 'Distressed Charcoal Calfskin',
    buckle: 'Gunmetal Square Buckle',
    imageId: 'GB-3',
  },
    {
      id: 4,
      slug: 'nocturne-eyelet-belt',
      name: 'Nocturne Eyelet Belt',
      price: 220,
      image: '/product-images/dragon-fly-model-x1.png',
      images: ['/images/belt_detail.png', '/images/belt_hero.png', '/images/belt_lifestyle.png'],
      description:
        'Minimalist brutalism. Clean lines of distressed leather punctuated by rows of gunmetal eyelets. A quieter rebellion — no less dangerous.',
      material: 'Distressed Charcoal Calfskin',
      buckle: 'Gunmetal Square Buckle',
      imageId: 'GB-3',
    },
    // {
    //   id: 5,
    //   slug: 'nocturne-eyelet-belt',
    //   name: 'Nocturne Eyelet Belt',
    //   price: 220,
    //   image: '/product-images/dragon-fly-model-x1.png',
    //   images: ['/images/belt_detail.png', '/images/belt_hero.png', '/images/belt_lifestyle.png'],
    //   description:
    //     'Minimalist brutalism. Clean lines of distressed leather punctuated by rows of gunmetal eyelets. A quieter rebellion — no less dangerous.',
    //   material: 'Distressed Charcoal Calfskin',
    //   buckle: 'Gunmetal Square Buckle',
    //   imageId: 'GB-3',
    // },
];
