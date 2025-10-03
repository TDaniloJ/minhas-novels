import express from 'express';
import { addRating, getUserRating } from '../controllers/ratingController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authenticate, addRating);
router.get('/user', authenticate, getUserRating);

export default router;