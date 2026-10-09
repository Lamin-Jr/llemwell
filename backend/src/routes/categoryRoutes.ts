import { Router } from 'express';
import { getCategories, createCategory } from '../controllers/categoryController';
import { requireAuth, requireAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getCategories);
router.post('/', requireAuth, requireAdmin, createCategory);

export default router;
