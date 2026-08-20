import { Router } from 'express';
import { createOrder, getMyOrders, getAllOrders } from '../controllers/orderController';
import { requireAuth, requireAdmin } from '../middlewares/authMiddleware';

const router = Router();

// User routes
router.post('/', requireAuth, createOrder);
router.get('/me', requireAuth, getMyOrders);

// Admin routes
router.get('/all', requireAuth, requireAdmin, getAllOrders);

export default router;
