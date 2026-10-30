import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { items } = req.body; // Array of { productId, quantity }

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: 'Order must contain at least one item' });
      return;
    }

    // Calculate total and prepare order items
    let totalAmount = 0;
    const orderItemsToCreate: { productId: string; quantity: number; price: number }[] = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) {
        res.status(404).json({ error: `Product not found: ${item.productId}` });
        return;
      }
      if (product.stock < item.quantity) {
        res.status(400).json({ error: `Insufficient stock for product: ${product.name}` });
        return;
      }

      totalAmount += product.price * item.quantity;
      
      orderItemsToCreate.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price
      });
    }

    // In a real scenario with Stripe, we would create a Payment Intent here
    // const paymentIntent = await stripe.paymentIntents.create({ amount: totalAmount * 100, ... })

    // Create order and decrement stock using Prisma transaction
    const order = await prisma.$transaction(async (tx) => {
      // 1. Create order
      const newOrder = await tx.order.create({
        data: {
          userId,
          totalAmount,
          items: {
            create: orderItemsToCreate
          }
        },
        include: { items: true }
      });

      // 2. Decrement stock
      for (const item of orderItemsToCreate) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        });
      }

      return newOrder;
    });

    res.status(201).json({ order, message: 'Order created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

export const getMyOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: { select: { id: true, email: true, firstName: true, lastName: true } },
        items: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch all orders' });
  }
};
