import express from 'express';
import {
  createCharacter,
  getCharacters,
  updateCharacter,
  deleteCharacter,
  createWorldBuilding,
  getWorldBuilding,
  createVolume,
  getVolumes,
  createArc,
  getArcs,
  createMagic,
  getMagics,
} from '../controllers/novelAdvancedController.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { 
  uploadCharacterImage, 
  uploadWorldBuildingImage, 
  uploadVolumeImage 
} from '../middlewares/upload.js';

const router = express.Router();

// Personagens
router.post('/:novelId/characters', authenticate, authorize('ADMIN'), uploadCharacterImage, createCharacter);
router.get('/:novelId/characters', getCharacters);
router.put('/characters/:id', authenticate, authorize('ADMIN'), uploadCharacterImage, updateCharacter);
router.delete('/characters/:id', authenticate, authorize('ADMIN'), deleteCharacter);

// World Building
router.post('/:novelId/worldbuilding', authenticate, authorize('ADMIN'), uploadWorldBuildingImage, createWorldBuilding);
router.get('/:novelId/worldbuilding', getWorldBuilding);

// Volumes
router.post('/:novelId/volumes', authenticate, authorize('ADMIN'), uploadVolumeImage, createVolume);
router.get('/:novelId/volumes', getVolumes);

// Arcos
router.post('/:novelId/arcs', authenticate, authorize('ADMIN'), createArc);
router.get('/:novelId/arcs', getArcs);

// Magias
router.post('/:novelId/magic', authenticate, authorize('ADMIN'), createMagic);
router.get('/:novelId/magic', getMagics);

export default router;