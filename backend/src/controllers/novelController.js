import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

// Schemas de validação
const createNovelSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  author: z.string().min(1, 'Autor é obrigatório'),
  status: z.enum(['ONGOING', 'COMPLETED', 'HIATUS']).default('ONGOING'),
  genres: z.array(z.string()).min(1, 'Pelo menos um gênero é obrigatório'),
});

const createNovelChapterSchema = z.object({
  chapterNumber: z.number().positive('Número do capítulo deve ser positivo'),
  title: z.string().min(1, 'Título do capítulo é obrigatório'),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
});

// Criar novel
export const createNovel = async (req, res) => {
  try {
    const validatedData = createNovelSchema.parse({
      ...req.body,
      genres: JSON.parse(req.body.genres || '[]'),
    });

    if (!req.file) {
      return res.status(400).json({ error: 'Imagem de capa é obrigatória' });
    }

    const coverPath = `/uploads/covers/${req.file.filename}`;

    const novel = await prisma.novel.create({
      data: {
        ...validatedData,
        coverImage: coverPath,
        uploadedBy: req.user.id,
      },
      include: {
        uploader: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    res.status(201).json({
      message: 'Novel criada com sucesso',
      novel,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Dados inválidos', 
        details: error.errors 
      });
    }
    console.error('Erro ao criar novel:', error);
    res.status(500).json({ error: 'Erro ao criar novel' });
  }
};

// Listar novels
export const getNovelList = async (req, res) => {
  try {
    const { page = 1, limit = 12, status, genres, search } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};

    if (status) {
      where.status = status;
    }

    if (genres) {
      where.genres = {
        hasSome: genres.split(','),
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [novels, total] = await Promise.all([
      prisma.novel.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          uploader: {
            select: {
              id: true,
              username: true,
            },
          },
          chapters: {
            select: {
              id: true,
              chapterNumber: true,
              title: true,
            },
            orderBy: { chapterNumber: 'desc' },
            take: 1,
          },
        },
      }),
      prisma.novel.count({ where }),
    ]);

    res.json({
      novels,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Erro ao listar novels:', error);
    res.status(500).json({ error: 'Erro ao listar novels' });
  }
};

// Obter novel por ID
export const getNovelById = async (req, res) => {
  try {
    const { id } = req.params;

    const novel = await prisma.novel.findUnique({
      where: { id },
      include: {
        uploader: {
          select: {
            id: true,
            username: true,
          },
        },
        chapters: {
          orderBy: { chapterNumber: 'asc' },
          select: {
            id: true,
            chapterNumber: true,
            title: true,
            views: true,
            publishedAt: true,
          },
        },
      },
    });

    if (!novel) {
      return res.status(404).json({ error: 'Novel não encontrada' });
    }

    // Incrementar views
    await prisma.novel.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    res.json(novel);
  } catch (error) {
    console.error('Erro ao buscar novel:', error);
    res.status(500).json({ error: 'Erro ao buscar novel' });
  }
};

// Atualizar novel
export const updateNovel = async (req, res) => {
  try {
    const { id } = req.params;

    const novel = await prisma.novel.findUnique({
      where: { id },
    });

    if (!novel) {
      return res.status(404).json({ error: 'Novel não encontrada' });
    }

    if (novel.uploadedBy !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Sem permissão para editar esta novel' });
    }

    const updateData = { ...req.body };
    
    if (req.body.genres) {
      updateData.genres = JSON.parse(req.body.genres);
    }

    if (req.file) {
      // Remover imagem antiga
      const oldImagePath = path.join(__dirname, '../..', novel.coverImage);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      updateData.coverImage = `/uploads/covers/${req.file.filename}`;
    }

    const updatedNovel = await prisma.novel.update({
      where: { id },
      data: updateData,
      include: {
        uploader: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    res.json({
      message: 'Novel atualizada com sucesso',
      novel: updatedNovel,
    });
  } catch (error) {
    console.error('Erro ao atualizar novel:', error);
    res.status(500).json({ error: 'Erro ao atualizar novel' });
  }
};

// Deletar novel
export const deleteNovel = async (req, res) => {
  try {
    const { id } = req.params;

    const novel = await prisma.novel.findUnique({
      where: { id },
      include: { chapters: true },
    });

    if (!novel) {
      return res.status(404).json({ error: 'Novel não encontrada' });
    }

    if (novel.uploadedBy !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Sem permissão para deletar esta novel' });
    }

    // Remover imagem de capa
    const coverPath = path.join(__dirname, '../..', novel.coverImage);
    if (fs.existsSync(coverPath)) {
      fs.unlinkSync(coverPath);
    }

    await prisma.novel.delete({
      where: { id },
    });

    res.json({ message: 'Novel deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar novel:', error);
    res.status(500).json({ error: 'Erro ao deletar novel' });
  }
};

// Criar capítulo de novel
export const createNovelChapter = async (req, res) => {
  try {
    const { novelId } = req.params;

    const novel = await prisma.novel.findUnique({
      where: { id: novelId },
    });

    if (!novel) {
      return res.status(404).json({ error: 'Novel não encontrada' });
    }

    if (novel.uploadedBy !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Sem permissão para adicionar capítulos' });
    }

    const validatedData = createNovelChapterSchema.parse({
      chapterNumber: parseFloat(req.body.chapterNumber),
      title: req.body.title,
      content: req.body.content,
    });

    const chapter = await prisma.novelChapter.create({
      data: {
        ...validatedData,
        novelId,
      },
    });

    // Enviar notificação via Socket.io
    const io = req.app.get('io');
    io.emit('new-chapter', {
      novelId,
      novelTitle: novel.title,
      chapterNumber: chapter.chapterNumber,
      chapterTitle: chapter.title,
      type: 'novel',
    });

    res.status(201).json({
      message: 'Capítulo criado com sucesso',
      chapter,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Dados inválidos', 
        details: error.errors 
      });
    }
    console.error('Erro ao criar capítulo:', error);
    res.status(500).json({ error: 'Erro ao criar capítulo' });
  }
};

// Obter capítulo de novel por ID
export const getNovelChapterById = async (req, res) => {
  try {
    const { chapterId } = req.params;

    const chapter = await prisma.novelChapter.findUnique({
      where: { id: chapterId },
      include: {
        novel: {
          select: {
            id: true,
            title: true,
            coverImage: true,
          },
        },
      },
    });

    if (!chapter) {
      return res.status(404).json({ error: 'Capítulo não encontrado' });
    }

    // Incrementar views
    await prisma.novelChapter.update({
      where: { id: chapterId },
      data: { views: { increment: 1 } },
    });

    res.json(chapter);
  } catch (error) {
    console.error('Erro ao buscar capítulo:', error);
    res.status(500).json({ error: 'Erro ao buscar capítulo' });
  }
};

// Atualizar capítulo de novel
export const updateNovelChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;

    const chapter = await prisma.novelChapter.findUnique({
      where: { id: chapterId },
      include: { novel: true },
    });

    if (!chapter) {
      return res.status(404).json({ error: 'Capítulo não encontrado' });
    }

    if (chapter.novel.uploadedBy !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Sem permissão' });
    }

    const updatedChapter = await prisma.novelChapter.update({
      where: { id: chapterId },
      data: {
        title: req.body.title,
        content: req.body.content,
        chapterNumber: parseFloat(req.body.chapterNumber),
      },
    });

    res.json({
      message: 'Capítulo atualizado com sucesso',
      chapter: updatedChapter,
    });
  } catch (error) {
    console.error('Erro ao atualizar capítulo:', error);
    res.status(500).json({ error: 'Erro ao atualizar capítulo' });
  }
};