import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  updateProfileWithAvatar
} from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.js';
import { uploadCover } from '../middlewares/upload.js';

const router = express.Router();

// Rotas públicas
router.post('/register', register);
router.post('/login', login);

// Rotas protegidas
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);

// Rota para atualizar o perfil com upload de avatar
router.put('/profile', authenticate, uploadCover, updateProfileWithAvatar);

export default router;