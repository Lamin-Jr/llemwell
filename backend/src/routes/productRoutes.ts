import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct } from '../controllers/productController';
import { requireAuth, requireAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

router.post('/', requireAuth, requireAdmin, createProduct);
router.put('/:id', requireAuth, requireAdmin, updateProduct);

export default router;
