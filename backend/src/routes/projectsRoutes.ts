import { Router } from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectsController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Public routes
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Admin-protected routes
router.post('/', requireAuth, createProject);
router.put('/:id', requireAuth, updateProject);
router.delete('/:id', requireAuth, deleteProject);

export default router;
