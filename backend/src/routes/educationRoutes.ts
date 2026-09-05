import { Router } from 'express';
import {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation
} from '../controllers/educationController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Public route
router.get('/', getEducation);

// Admin-protected routes
router.post('/', requireAuth, createEducation);
router.put('/:id', requireAuth, updateEducation);
router.delete('/:id', requireAuth, deleteEducation);

export default router;
