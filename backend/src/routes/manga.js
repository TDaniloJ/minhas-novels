import express from 'express';
import {
  createManga,
  getMangaList,
  getMangaById,
  updateManga,
  deleteManga,
  createChapter,
  addPDFToChapter,
  getChapterById,
} from '../controllers/mangaController.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { uploadCover, uploadMangaPages, uploadPDF } from '../middlewares/upload.js';

const router = express.Router();

// Rotas públicas
router.get('/', getMangaList);
router.get('/:id', getMangaById);
router.get('/chapter/:chapterId', getChapterById);

// Rotas protegidas (apenas ADMIN)
router.post('/', authenticate, authorize('ADMIN'), uploadCover, createManga);
router.put('/:id', authenticate, authorize('ADMIN'), uploadCover, updateManga);
router.delete('/:id', authenticate, authorize('ADMIN'), deleteManga);

// Capítulos (apenas ADMIN)
router.post('/:mangaId/chapters', authenticate, authorize('ADMIN'), uploadMangaPages, createChapter);
router.post('/chapter/:chapterId/pdf', authenticate, authorize('ADMIN'), uploadPDF, addPDFToChapter);

export default router;