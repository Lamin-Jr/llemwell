"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../config/prisma"));
/**
 * Middleware to verify Supabase JWT
 */
const requireAuth = async (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        // Supabase sets the subject 'sub' to the user's UUID
        const userId = decoded.sub;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized: Invalid token payload' });
            return;
        }
        // Optional: Fetch user from our DB to get their role and verify they exist in our system
        // (If they just signed up in Supabase Auth, they might not be in our DB yet unless we have a webhook setup,
        // but for e-commerce they must be in our DB to place orders).
        const user = await prisma_1.default.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, role: true }
        });
        if (!user) {
            res.status(401).json({ error: 'Unauthorized: User record not found' });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
        return;
    }
};
exports.requireAuth = requireAuth;
/**
 * Middleware to require ADMIN role
 * Must be used AFTER requireAuth
 */
const requireAdmin = (req, res, next) => {
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
exports.requireAdmin = requireAdmin;
//# sourceMappingURL=authMiddleware.js.map