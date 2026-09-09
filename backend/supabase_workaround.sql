-- 1. Apply Schema Changes (Rename imageUrl to image, add images array)
ALTER TABLE "Product" 
RENAME COLUMN "imageUrl" TO "image";

ALTER TABLE "Product"
ADD COLUMN "images" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- 2. Seed Static Products
INSERT INTO "Product" (id, name, description, price, stock, image, images, "isActive", "createdAt", "updatedAt")
VALUES
(
  gen_random_uuid(),
  'DRAGONFLY-V1 Mirror',
  'A true piece of high-fashion grunge. Crafted from distressed black calfskin leather, fortified with heavy metal eyelets, silver spikes, and chunky vintage hardware. Designed for the raw, unapologetic aesthetic.',
  850,
  10,
  '/product-images/mirror/mirror_1.jpg',
  ARRAY['/product-images/mirror/mirror_1.jpg', '/product-images/mirror/mirror_2.jpg', '/product-images/mirror/mirror_3.jpg'],
  true,
  now(),
  now()
),
(
  gen_random_uuid(),
  'hairline v1',
  'Minimalist brutalism. Clean lines of distressed leather punctuated by rows of gunmetal eyelets. A quieter rebellion — no less dangerous.',
  220,
  15,
  '/product-images/hairline/hairline_1.jpg',
  ARRAY['/product-images/hairline/hairline_1.jpg', '/product-images/hairline/hairline_2.jpg', '/product-images/hairline/hairline_3.jpg'],
  true,
  now(),
  now()
),
(
  gen_random_uuid(),
  'DLC Black',
  'Industrial elegance redefined. Hand-stitched from aged calfskin with oxidized chain links and a vintage clasp mechanism. Each belt develops its own unique patina over time.',
  650,
  5,
  '/product-images/dlc_black/dlc_black_4.jpg',
  ARRAY['/product-images/dlc_black/dlc_black_4.jpg', '/product-images/dlc_black/dlc_black_2.jpg', '/product-images/dlc_black/dlc_black_3.jpg'],
  true,
  now(),
  now()
),
(
  gen_random_uuid(),
  '925',
  'Minimalist brutalism. Clean lines of distressed leather punctuated by rows of gunmetal eyelets. A quieter rebellion — no less dangerous.',
  220,
  20,
  '/product-images/925/925.jpg',
  ARRAY['/product-images/925/925.jpg', '/images/hero_a5.jpg', '/images/hero_a3.jpg'],
  true,
  now(),
  now()
);
