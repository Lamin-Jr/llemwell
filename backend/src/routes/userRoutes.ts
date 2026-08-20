import { Router } from 'express';
import { getMyProfile, updateMyProfile, addAddress, syncUser } from '../controllers/userController';
import { requireAuth } from '../middlewares/authMiddleware';

const router = Router();

router.post('/sync', requireAuth, syncUser);
router.get('/me', requireAuth, getMyProfile);
router.put('/me', requireAuth, updateMyProfile);
router.post('/me/addresses', requireAuth, addAddress);

export default router;
