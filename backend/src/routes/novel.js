import express from 'express';
import {
  createNovel,
  getNovelList,
  getNovelById,
  updateNovel,
  deleteNovel,
  createNovelChapter,
  getNovelChapterById,
  updateNovelChapter,
} from '../controllers/novelController.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { uploadCover } from '../middlewares/upload.js';

const router = express.Router();

// Rotas públicas
router.get('/', getNovelList);
router.get('/:id', getNovelById);
router.get('/chapter/:chapterId', getNovelChapterById);

// Rotas protegidas (apenas ADMIN)
router.post('/', authenticate, authorize('ADMIN'), uploadCover, createNovel);
router.put('/:id', authenticate, authorize('ADMIN'), uploadCover, updateNovel);
router.delete('/:id', authenticate, authorize('ADMIN'), deleteNovel);

// Capítulos (apenas ADMIN)
router.post('/:novelId/chapters', authenticate, authorize('ADMIN'), createNovelChapter);
router.put('/chapter/:chapterId', authenticate, authorize('ADMIN'), updateNovelChapter);

export default router;