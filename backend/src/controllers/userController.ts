import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getMyProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { addresses: true }
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateMyProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { firstName, lastName, phone } = req.body;
    
    const user = await prisma.user.update({
      where: { id: userId },
      data: { firstName, lastName, phone }
    });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

export const addAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { type, street, city, state, postalCode, country, isDefault } = req.body;

    // If this is set to default, optionally unset other defaults in a transaction
    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId, type },
        data: { isDefault: false }
      });
    }

    const address = await prisma.address.create({
      data: {
        userId, type, street, city, state, postalCode, country, isDefault: isDefault || false
      }
    });

    res.status(201).json({ address });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add address' });
  }
};

export const syncUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Since the authMiddleware verifies the JWT, we know the user is authentic.
    // We just upsert them into the database using the email from the token.
    const email = req.user?.email || req.body.email; 

    if (!email) {
      res.status(400).json({ error: 'Email is required for syncing' });
      return;
    }

    const user = await prisma.user.upsert({
      where: { id: userId },
      update: {}, // Do nothing if they already exist, or we could update last login
      create: {
        id: userId,
        email: email
      }
    });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to sync user' });
  }
};
