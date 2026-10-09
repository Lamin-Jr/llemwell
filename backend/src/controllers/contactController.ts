import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, inquiry } = req.body;

    if (!name || !email || !inquiry) {
      res.status(400).json({ error: 'Name, Email, and Inquiry are required.' });
      return;
    }

    const message = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        inquiry,
      },
    });

    res.status(201).json({ success: true, messageId: message.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit contact message' });
  }
};
