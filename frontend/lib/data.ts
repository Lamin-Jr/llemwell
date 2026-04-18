import { Product } from './types';

export const products: Product[] = [
  {
    id: 1,
    slug: 'opium-carti-studded-belt',
    name: 'Vampire Studded Leather Belt',
    price: 850,
    image: '/images/belt_hero.png',
    images: ['/images/belt_hero.png', '/images/belt_detail.png', '/images/belt_lifestyle.png'],
    description:
      'A true piece of high-fashion grunge. Crafted from distressed black calfskin leather, fortified with heavy metal eyelets, silver spikes, and chunky vintage hardware. Designed for the raw, unapologetic Opium aesthetic.',
    material: 'Distressed Black Calfskin',
    buckle: 'Heavy Silver-toned Metal',
    imageId: 'GB-1'
  },
  {
    id: 2,
    slug: 'opium-carti-studded-belt',
    name: 'Vampire Studded Leather Belt',
    price: 650,
    image: '/images/belt_hero.png',
    images: ['/images/belt_hero.png', '/images/belt_detail.png', '/images/belt_lifestyle.png'],
    description:
      'A true piece of high-fashion grunge. Crafted from distressed black calfskin leather, fortified with heavy metal eyelets, silver spikes, and chunky vintage hardware. Designed for the raw, unapologetic Opium aesthetic.',
    material: 'Distressed Black Calfskin',
    buckle: 'Heavy Silver-toned Metal',
    imageId: 'GB-1'
  },
];
