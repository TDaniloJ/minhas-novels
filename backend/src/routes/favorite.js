import express from 'express';
import {
  addFavorite,
  removeFavorite,
  getUserFavorites,
  checkFavorite,
} from '../controllers/favoriteController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authenticate, addFavorite);
router.delete('/', authenticate, removeFavorite);
router.get('/', authenticate, getUserFavorites);
router.get('/check', authenticate, checkFavorite);

export default router;