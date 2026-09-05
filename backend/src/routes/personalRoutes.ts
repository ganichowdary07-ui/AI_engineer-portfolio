import { Router } from 'express';
import { getPersonalInfo, updatePersonalInfo } from '../controllers/personalController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getPersonalInfo);
router.put('/', requireAuth, updatePersonalInfo);

export default router;
