import express from 'express';
import { saveProgress, getProgress, getReadingHistory } from '../controllers/progressController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authenticate, saveProgress);
router.get('/', authenticate, getProgress);
router.get('/history', authenticate, getReadingHistory);

export default router;