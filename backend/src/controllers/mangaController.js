import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

// Schemas de validação
const createMangaSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  author: z.string().min(1, 'Autor é obrigatório'),
  status: z.enum(['ONGOING', 'COMPLETED', 'HIATUS']).default('ONGOING'),
  genres: z.array(z.string()).min(1, 'Pelo menos um gênero é obrigatório'),
});

const createChapterSchema = z.object({
  chapterNumber: z.number().positive('Número do capítulo deve ser positivo'),
  title: z.string().min(1, 'Título do capítulo é obrigatório'),
});

// Criar mangá
export const createManga = async (req, res) => {
  try {
    const validatedData = createMangaSchema.parse({
      ...req.body,
      genres: JSON.parse(req.body.genres || '[]'),
    });

    if (!req.file) {
      return res.status(400).json({ error: 'Imagem de capa é obrigatória' });
    }

    const coverPath = `/uploads/covers/${req.file.filename}`;

    const manga = await prisma.manga.create({
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
      message: 'Mangá criado com sucesso',
      manga,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Dados inválidos', 
        details: error.errors 
      });
    }
    console.error('Erro ao criar mangá:', error);
    res.status(500).json({ error: 'Erro ao criar mangá' });
  }
};

// Listar mangás
export const getMangaList = async (req, res) => {
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

    const [mangas, total] = await Promise.all([
      prisma.manga.findMany({
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
      prisma.manga.count({ where }),
    ]);

    res.json({
      mangas,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Erro ao listar mangás:', error);
    res.status(500).json({ error: 'Erro ao listar mangás' });
  }
};

// Obter mangá por ID
export const getMangaById = async (req, res) => {
  try {
    const { id } = req.params;

    const manga = await prisma.manga.findUnique({
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

    if (!manga) {
      return res.status(404).json({ error: 'Mangá não encontrado' });
    }

    // Incrementar views
    await prisma.manga.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    res.json(manga);
  } catch (error) {
    console.error('Erro ao buscar mangá:', error);
    res.status(500).json({ error: 'Erro ao buscar mangá' });
  }
};

// Atualizar mangá
export const updateManga = async (req, res) => {
  try {
    const { id } = req.params;

    const manga = await prisma.manga.findUnique({
      where: { id },
    });

    if (!manga) {
      return res.status(404).json({ error: 'Mangá não encontrado' });
    }

    if (manga.uploadedBy !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Sem permissão para editar este mangá' });
    }

    const updateData = { ...req.body };
    
    if (req.body.genres) {
      updateData.genres = JSON.parse(req.body.genres);
    }

    if (req.file) {
      // Remover imagem antiga
      const oldImagePath = path.join(__dirname, '../..', manga.coverImage);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      updateData.coverImage = `/uploads/covers/${req.file.filename}`;
    }

    const updatedManga = await prisma.manga.update({
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
      message: 'Mangá atualizado com sucesso',
      manga: updatedManga,
    });
  } catch (error) {
    console.error('Erro ao atualizar mangá:', error);
    res.status(500).json({ error: 'Erro ao atualizar mangá' });
  }
};

// Deletar mangá
export const deleteManga = async (req, res) => {
  try {
    const { id } = req.params;

    const manga = await prisma.manga.findUnique({
      where: { id },
      include: { chapters: true },
    });

    if (!manga) {
      return res.status(404).json({ error: 'Mangá não encontrado' });
    }

    if (manga.uploadedBy !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Sem permissão para deletar este mangá' });
    }

    // Remover imagem de capa
    const coverPath = path.join(__dirname, '../..', manga.coverImage);
    if (fs.existsSync(coverPath)) {
      fs.unlinkSync(coverPath);
    }

    // Remover capítulos e suas páginas
    for (const chapter of manga.chapters) {
      const pages = chapter.pages;
      if (Array.isArray(pages)) {
        pages.forEach(page => {
          const pagePath = path.join(__dirname, '../..', page);
          if (fs.existsSync(pagePath)) {
            fs.unlinkSync(pagePath);
          }
        });
      }

      if (chapter.pdfUrl) {
        const pdfPath = path.join(__dirname, '../..', chapter.pdfUrl);
        if (fs.existsSync(pdfPath)) {
          fs.unlinkSync(pdfPath);
        }
      }
    }

    await prisma.manga.delete({
      where: { id },
    });

    res.json({ message: 'Mangá deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar mangá:', error);
    res.status(500).json({ error: 'Erro ao deletar mangá' });
  }
};

// Criar capítulo
export const createChapter = async (req, res) => {
  try {
    const { mangaId } = req.params;

    const manga = await prisma.manga.findUnique({
      where: { id: mangaId },
    });

    if (!manga) {
      return res.status(404).json({ error: 'Mangá não encontrado' });
    }

    if (manga.uploadedBy !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Sem permissão para adicionar capítulos' });
    }

    const validatedData = createChapterSchema.parse({
      chapterNumber: parseFloat(req.body.chapterNumber),
      title: req.body.title,
    });

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Pelo menos uma página é obrigatória' });
    }

    const pages = req.files.map(file => `/uploads/manga/${file.filename}`);

    const chapter = await prisma.mangaChapter.create({
      data: {
        ...validatedData,
        mangaId,
        pages,
      },
    });

    // Enviar notificação via Socket.io
    const io = req.app.get('io');
    io.emit('new-chapter', {
      mangaId,
      mangaTitle: manga.title,
      chapterNumber: chapter.chapterNumber,
      chapterTitle: chapter.title,
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

// Adicionar PDF ao capítulo
export const addPDFToChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;

    const chapter = await prisma.mangaChapter.findUnique({
      where: { id: chapterId },
      include: { manga: true },
    });

    if (!chapter) {
      return res.status(404).json({ error: 'Capítulo não encontrado' });
    }

    if (chapter.manga.uploadedBy !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Sem permissão' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Arquivo PDF é obrigatório' });
    }

    const pdfUrl = `/uploads/manga/${req.file.filename}`;

    const updatedChapter = await prisma.mangaChapter.update({
      where: { id: chapterId },
      data: { pdfUrl },
    });

    res.json({
      message: 'PDF adicionado com sucesso',
      chapter: updatedChapter,
    });
  } catch (error) {
    console.error('Erro ao adicionar PDF:', error);
    res.status(500).json({ error: 'Erro ao adicionar PDF' });
  }
};

// Obter capítulo por ID
export const getChapterById = async (req, res) => {
  try {
    const { chapterId } = req.params;

    const chapter = await prisma.mangaChapter.findUnique({
      where: { id: chapterId },
      include: {
        manga: {
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
    await prisma.mangaChapter.update({
      where: { id: chapterId },
      data: { views: { increment: 1 } },
    });

    res.json(chapter);
  } catch (error) {
    console.error('Erro ao buscar capítulo:', error);
    res.status(500).json({ error: 'Erro ao buscar capítulo' });
  }
};