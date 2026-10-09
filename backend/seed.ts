import prisma from "./src/config/prisma";

async function main() {
  console.log("Seeding products...");

  const products = [
    {
      name: "DRAGONFLY-V1 Mirror",
      price: 850,
      image: "/product-images/mirror/mirror_1.jpg",
      images: ['/product-images/mirror/mirror_1.jpg', '/product-images/mirror/mirror_2.jpg', '/product-images/mirror/mirror_3.jpg'],
      description: "A true piece of high-fashion grunge. Crafted from distressed black calfskin leather, fortified with heavy metal eyelets, silver spikes, and chunky vintage hardware. Designed for the raw, unapologetic aesthetic.",
      stock: 10,
      isActive: true,
    },
    {
      name: "hairline v1",
      price: 220,
      image: "/product-images/hairline/hairline_1.jpg",
      images: ['/product-images/hairline/hairline_1.jpg', '/product-images/hairline/hairline_2.jpg', '/product-images/hairline/hairline_3.jpg'],
      description: "Minimalist brutalism. Clean lines of distressed leather punctuated by rows of gunmetal eyelets. A quieter rebellion — no less dangerous.",
      stock: 15,
      isActive: true,
    },
    {
      name: "DLC Black",
      price: 650,
      image: "/product-images/dlc_black/dlc_black_4.jpg",
      images: ['/product-images/dlc_black/dlc_black_4.jpg', '/product-images/dlc_black/dlc_black_2.jpg', '/product-images/dlc_black/dlc_black_3.jpg'],
      description: "Industrial elegance redefined. Hand-stitched from aged calfskin with oxidized chain links and a vintage clasp mechanism. Each belt develops its own unique patina over time.",
      stock: 5,
      isActive: true,
    },
    {
      name: "925",
      price: 220,
      image: "/product-images/925/925.jpg",
      images: ['/product-images/925/925.jpg', '/images/hero_a5.jpg', '/images/hero_a3.jpg'],
      description: "Minimalist brutalism. Clean lines of distressed leather punctuated by rows of gunmetal eyelets. A quieter rebellion — no less dangerous.",
      stock: 20,
      isActive: true,
    },
  ];

  for (const p of products) {
    console.log("Creating product: ", p.name);
    try {
      await prisma.product.create({
        data: p,
      });
    } catch (e: any) {
      console.log("Product seed error, error message: ", e);
    }
  }
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
