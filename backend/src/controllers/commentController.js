import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const createCommentSchema = z.object({
  content: z.string().min(1, 'Comentário não pode estar vazio'),
  contentType: z.enum(['MANGA', 'NOVEL']),
  contentId: z.string(),
  chapterId: z.string().optional(),
  parentId: z.string().optional(),
});

export const createComment = async (req, res) => {
  try {
    const validatedData = createCommentSchema.parse(req.body);

    const comment = await prisma.comment.create({
      data: {
        userId: req.user.id,
        content: validatedData.content,
        contentType: validatedData.contentType,
        ...(validatedData.contentType === 'MANGA' 
          ? { mangaId: validatedData.contentId } 
          : { novelId: validatedData.contentId }),
        ...(validatedData.chapterId && validatedData.contentType === 'MANGA'
          ? { mangaChapterId: validatedData.chapterId }
          : validatedData.chapterId && validatedData.contentType === 'NOVEL'
          ? { novelChapterId: validatedData.chapterId }
          : {}),
        ...(validatedData.parentId && { parentId: validatedData.parentId }),
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    res.status(201).json({
      message: 'Comentário adicionado',
      comment,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Dados inválidos', details: error.errors });
    }
    console.error('Erro ao criar comentário:', error);
    res.status(500).json({ error: 'Erro ao criar comentário' });
  }
};

export const getComments = async (req, res) => {
  try {
    const { contentType, contentId, chapterId } = req.query;

    const where = {
      contentType,
      ...(contentType === 'MANGA' ? { mangaId: contentId } : { novelId: contentId }),
      parentId: null, // Apenas comentários principais
    };

    if (chapterId) {
      if (contentType === 'MANGA') {
        where.mangaChapterId = chapterId;
      } else {
        where.novelChapterId = chapterId;
      }
    }

    const comments = await prisma.comment.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        replies: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(comments);
  } catch (error) {
    console.error('Erro ao buscar comentários:', error);
    res.status(500).json({ error: 'Erro ao buscar comentários' });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      return res.status(404).json({ error: 'Comentário não encontrado' });
    }

    if (comment.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Sem permissão para deletar este comentário' });
    }

    await prisma.comment.delete({
      where: { id },
    });

    res.json({ message: 'Comentário deletado' });
  } catch (error) {
    console.error('Erro ao deletar comentário:', error);
    res.status(500).json({ error: 'Erro ao deletar comentário' });
  }
};

export const likeComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await prisma.comment.update({
      where: { id },
      data: {
        likes: { increment: 1 },
      },
    });

    res.json({ message: 'Comentário curtido', likes: comment.likes });
  } catch (error) {
    console.error('Erro ao curtir comentário:', error);
    res.status(500).json({ error: 'Erro ao curtir comentário' });
  }
};