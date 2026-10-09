import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';

// Extend Express Request to include our user payload
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

/**
 * Middleware to verify Supabase JWT
 */
export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.SUPABASE_JWT_SECRET;

    if (!jwtSecret) {
      console.error("Missing SUPABASE_JWT_SECRET in .env");
      res.status(500).json({ error: 'Internal Server Error: Auth configuration missing' });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, jwtSecret) as any;
    
    // Supabase sets the subject 'sub' to the user's UUID
    const userId = decoded.sub;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized: Invalid token payload' });
      return;
    }

    // Optional: Fetch user from our DB to get their role and verify they exist in our system
    // (If they just signed up in Supabase Auth, they might not be in our DB yet unless we have a webhook setup,
    // but for e-commerce they must be in our DB to place orders).
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true }
    });

    if (!user) {
      res.status(401).json({ error: 'Unauthorized: User record not found' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
    return;
  }
};

/**
 * Middleware to require ADMIN role
 * Must be used AFTER requireAuth
 */
export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized: Authentication required' });
    return;
  }

  if (req.user.role !== 'ADMIN') {
    res.status(403).json({ error: 'Forbidden: Admin access required' });
    return;
  }

  next();
};
