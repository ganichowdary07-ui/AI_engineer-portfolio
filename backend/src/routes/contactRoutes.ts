import { Router } from 'express';
import {
  submitContact,
  getContactMessages,
  updateMessageStatus,
  deleteMessage
} from '../controllers/contactController.js';
import { contactValidationRules, validateContact } from '../validators/contactValidator.js';
import { contactFormLimiter } from '../middleware/rateLimiter.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Public route for portfolio visitors to submit messages
router.post(
  '/',
  contactFormLimiter,
  contactValidationRules,
  validateContact,
  submitContact
);

// Admin-protected routes to inspect and manage contact messages
router.get('/', requireAuth, getContactMessages);
router.patch('/:id/status', requireAuth, updateMessageStatus);
router.delete('/:id', requireAuth, deleteMessage);

export default router;
