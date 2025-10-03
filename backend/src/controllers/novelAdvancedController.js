import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// ========== PERSONAGENS ==========
const characterSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  role: z.string(),
  age: z.string().optional(),
  personality: z.string().optional(),
  abilities: z.array(z.string()).optional(),
  magicIds: z.array(z.string()).optional(),
  appearance: z.string().optional(),
  backstory: z.string().optional(),
});

export const createCharacter = async (req, res) => {
  try {
    const { novelId } = req.params;
    const validatedData = characterSchema.parse(req.body);

    // Verificar permissão
    const novel = await prisma.novel.findUnique({ where: { id: novelId } });
    if (!novel || (novel.uploadedBy !== req.user.id && req.user.role !== 'ADMIN')) {
      return res.status(403).json({ error: 'Sem permissão' });
    }

    const imageUrl = req.file ? `/uploads/characters/${req.file.filename}` : null;

    const character = await prisma.novelCharacter.create({
      data: {
        novelId,
        ...validatedData,
        image: imageUrl,
        abilities: validatedData.abilities || [],
        magicIds: validatedData.magicIds || [],
      },
    });

    res.status(201).json({ message: 'Personagem criado', character });
  } catch (error) {
    console.error('Erro ao criar personagem:', error);
    res.status(500).json({ error: 'Erro ao criar personagem' });
  }
};

export const getCharacters = async (req, res) => {
  try {
    const { novelId } = req.params;
    const characters = await prisma.novelCharacter.findMany({
      where: { novelId },
      orderBy: { createdAt: 'asc' },
    });
    res.json(characters);
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
    res.status(500).json({ error: 'Erro ao buscar personagens' });
  }
};

export const updateCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const character = await prisma.novelCharacter.findUnique({
      where: { id },
      include: { novel: true },
    });

    if (!character || (character.novel.uploadedBy !== req.user.id && req.user.role !== 'ADMIN')) {
      return res.status(403).json({ error: 'Sem permissão' });
    }

    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/characters/${req.file.filename}`;
    }

    const updated = await prisma.novelCharacter.update({
      where: { id },
      data: updateData,
    });

    res.json({ message: 'Personagem atualizado', character: updated });
  } catch (error) {
    console.error('Erro ao atualizar personagem:', error);
    res.status(500).json({ error: 'Erro ao atualizar personagem' });
  }
};

export const deleteCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const character = await prisma.novelCharacter.findUnique({
      where: { id },
      include: { novel: true },
    });

    if (!character || (character.novel.uploadedBy !== req.user.id && req.user.role !== 'ADMIN')) {
      return res.status(403).json({ error: 'Sem permissão' });
    }

    await prisma.novelCharacter.delete({ where: { id } });
    res.json({ message: 'Personagem deletado' });
  } catch (error) {
    console.error('Erro ao deletar personagem:', error);
    res.status(500).json({ error: 'Erro ao deletar personagem' });
  }
};

// ========== WORLD BUILDING ==========
export const createWorldBuilding = async (req, res) => {
  try {
    const { novelId } = req.params;
    const { title, category, content } = req.body;

    const novel = await prisma.novel.findUnique({ where: { id: novelId } });
    if (!novel || (novel.uploadedBy !== req.user.id && req.user.role !== 'ADMIN')) {
      return res.status(403).json({ error: 'Sem permissão' });
    }

    const imageUrl = req.file ? `/uploads/worldbuilding/${req.file.filename}` : null;

    const worldBuilding = await prisma.novelWorldBuilding.create({
      data: {
        novelId,
        title,
        category,
        content,
        imageUrl,
      },
    });

    res.status(201).json({ message: 'World Building criado', worldBuilding });
  } catch (error) {
    console.error('Erro ao criar world building:', error);
    res.status(500).json({ error: 'Erro ao criar world building' });
  }
};

export const getWorldBuilding = async (req, res) => {
  try {
    const { novelId } = req.params;
    const worldBuilding = await prisma.novelWorldBuilding.findMany({
      where: { novelId },
      orderBy: { category: 'asc' },
    });
    res.json(worldBuilding);
  } catch (error) {
    console.error('Erro ao buscar world building:', error);
    res.status(500).json({ error: 'Erro ao buscar world building' });
  }
};

// ========== VOLUMES ==========
export const createVolume = async (req, res) => {
  try {
    const { novelId } = req.params;
    const { volumeNumber, title, description } = req.body;

    const novel = await prisma.novel.findUnique({ where: { id: novelId } });
    if (!novel || (novel.uploadedBy !== req.user.id && req.user.role !== 'ADMIN')) {
      return res.status(403).json({ error: 'Sem permissão' });
    }

    const coverImage = req.file ? `/uploads/volumes/${req.file.filename}` : null;

    const volume = await prisma.novelVolume.create({
      data: {
        novelId,
        volumeNumber: parseInt(volumeNumber),
        title,
        description,
        coverImage,
      },
    });

    res.status(201).json({ message: 'Volume criado', volume });
  } catch (error) {
    console.error('Erro ao criar volume:', error);
    res.status(500).json({ error: 'Erro ao criar volume' });
  }
};

export const getVolumes = async (req, res) => {
  try {
    const { novelId } = req.params;
    const volumes = await prisma.novelVolume.findMany({
      where: { novelId },
      orderBy: { volumeNumber: 'asc' },
      include: {
        arcs: true,
        chapters: {
          orderBy: { chapterNumber: 'asc' },
        },
      },
    });
    res.json(volumes);
  } catch (error) {
    console.error('Erro ao buscar volumes:', error);
    res.status(500).json({ error: 'Erro ao buscar volumes' });
  }
};

// ========== ARCOS ==========
export const createArc = async (req, res) => {
  try {
    const { novelId } = req.params;
    const { volumeId, arcNumber, title, description } = req.body;

    const novel = await prisma.novel.findUnique({ where: { id: novelId } });
    if (!novel || (novel.uploadedBy !== req.user.id && req.user.role !== 'ADMIN')) {
      return res.status(403).json({ error: 'Sem permissão' });
    }

    const arc = await prisma.novelArc.create({
      data: {
        novelId,
        volumeId: volumeId || null,
        arcNumber: parseInt(arcNumber),
        title,
        description,
      },
    });

    res.status(201).json({ message: 'Arco criado', arc });
  } catch (error) {
    console.error('Erro ao criar arco:', error);
    res.status(500).json({ error: 'Erro ao criar arco' });
  }
};

export const getArcs = async (req, res) => {
  try {
    const { novelId } = req.params;
    const arcs = await prisma.novelArc.findMany({
      where: { novelId },
      orderBy: { arcNumber: 'asc' },
      include: {
        volume: true,
        chapters: {
          orderBy: { chapterNumber: 'asc' },
        },
      },
    });
    res.json(arcs);
  } catch (error) {
    console.error('Erro ao buscar arcos:', error);
    res.status(500).json({ error: 'Erro ao buscar arcos' });
  }
};

// ========== SISTEMA DE MAGIA ==========
export const createMagic = async (req, res) => {
  try {
    const { novelId } = req.params;
    const { name, type, description, level, requirements, effects, manaCost, cooldown, range } = req.body;

    const novel = await prisma.novel.findUnique({ where: { id: novelId } });
    if (!novel || (novel.uploadedBy !== req.user.id && req.user.role !== 'ADMIN')) {
      return res.status(403).json({ error: 'Sem permissão' });
    }

    const magic = await prisma.novelMagic.create({
      data: {
        novelId,
        name,
        type,
        description,
        level,
        requirements,
        effects: Array.isArray(effects) ? effects : [],
        manaCost,
        cooldown,
        range,
      },
    });

    res.status(201).json({ message: 'Magia criada', magic });
  } catch (error) {
    console.error('Erro ao criar magia:', error);
    res.status(500).json({ error: 'Erro ao criar magia' });
  }
};

export const getMagics = async (req, res) => {
  try {
    const { novelId } = req.params;
    const magics = await prisma.novelMagic.findMany({
      where: { novelId },
      orderBy: { name: 'asc' },
    });
    res.json(magics);
  } catch (error) {
    console.error('Erro ao buscar magias:', error);
    res.status(500).json({ error: 'Erro ao buscar magias' });
  }
};