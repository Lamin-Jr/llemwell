import prisma from './src/config/prisma';

async function test() {
  await prisma.product.create({
    data: {
      name: 'Test',
      price: 100,
      imageUrl: 'test.jpg',
      description: 'Test',
      stock: 10
    }
  })
}
