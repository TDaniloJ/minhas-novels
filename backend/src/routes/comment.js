import express from 'express';
import {
  createComment,
  getComments,
  deleteComment,
  likeComment,
} from '../controllers/commentController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authenticate, createComment);
router.get('/', getComments);
router.delete('/:id', authenticate, deleteComment);
router.post('/:id/like', likeComment);

export default router;