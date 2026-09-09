import prisma from "./src/config/prisma";

async function main() {
  console.log("Seeding products...");

  const products = [
    {
      name: "DRAGONFLY-V1 Mirror",
      price: 850,
      imageUrl: "/product-images/mirror/mirror_1.jpg",
      description:
        "A true piece of high-fashion grunge. Crafted from distressed black calfskin leather, fortified with heavy metal eyelets, silver spikes, and chunky vintage hardware. Designed for the raw, unapologetic aesthetic.",
      stock: 10,
    },
    {
      name: "hairline v1",
      price: 220,
      imageUrl: "/product-images/hairline/hairline_1.jpg",
      description:
        "Minimalist brutalism. Clean lines of distressed leather punctuated by rows of gunmetal eyelets. A quieter rebellion — no less dangerous.",
      stock: 15,
    },
    {
      name: "DLC Black",
      price: 650,
      imageUrl: "/product-images/dlc_black/dlc_black_4.jpg",
      description:
        "Industrial elegance redefined. Hand-stitched from aged calfskin with oxidized chain links and a vintage clasp mechanism. Each belt develops its own unique patina over time.",
      stock: 5,
    },
    {
      name: "925",
      price: 220,
      imageUrl: "/product-images/925/925.jpg",
      description:
        "Minimalist brutalism. Clean lines of distressed leather punctuated by rows of gunmetal eyelets. A quieter rebellion — no less dangerous.",
      stock: 20,
    },
  ];

  for (const p of products) {
    console.log("Creating product: ", products);
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
