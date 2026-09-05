import { Router } from 'express';
import {
  getJourneySteps,
  createJourneyStep,
  updateJourneyStep,
  deleteJourneyStep
} from '../controllers/journeyController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Public route
router.get('/', getJourneySteps);

// Admin-protected routes
router.post('/', requireAuth, createJourneyStep);
router.put('/:id', requireAuth, updateJourneyStep);
router.delete('/:id', requireAuth, deleteJourneyStep);

export default router;
