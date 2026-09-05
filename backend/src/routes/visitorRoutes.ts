import { Router } from 'express';
import { getVisitorCount, incrementVisitorCount } from '../controllers/visitorController.js';

const router = Router();

router.get('/', getVisitorCount);
router.post('/increment', incrementVisitorCount);

export default router;
