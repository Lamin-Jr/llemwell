'use server';

import { PrismaClient } from '../generated/prisma';

// Use a global PRISMA instance to prevent exhausting connections in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string | null;
    const inquiry = formData.get('inquiry') as string;

    if (!name || !email || !inquiry) {
      return { success: false, error: 'Name, Email, and Inquiry are required.' };
    }

    const message = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        inquiry,
      },
    });

    return { success: true, messageId: message.id };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: 'Failed to submit the form. Please try again later.' };
  }
}
