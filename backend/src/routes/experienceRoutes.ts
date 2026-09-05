import { Router } from 'express';
import { getExperience, updateExperience } from '../controllers/experienceController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Public route
router.get('/', getExperience);

// Admin-protected route
router.put('/', requireAuth, updateExperience);

export default router;
