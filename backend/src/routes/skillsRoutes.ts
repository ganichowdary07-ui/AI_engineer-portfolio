import { Router } from 'express';
import {
  getSkills,
  createCategory,
  deleteCategory,
  createSkill,
  updateSkill,
  deleteSkill
} from '../controllers/skillsController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Public route
router.get('/', getSkills);

// Admin-protected routes
router.post('/categories', requireAuth, createCategory);
router.delete('/categories/:id', requireAuth, deleteCategory);

router.post('/', requireAuth, createSkill);
router.put('/:id', requireAuth, updateSkill);
router.delete('/:id', requireAuth, deleteSkill);

export default router;
