import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
} from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// Rotas públicas
router.post('/register', register);
router.post('/login', login);

// Rotas protegidas
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);

export default router;