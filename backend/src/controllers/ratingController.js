import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addRating = async (req, res) => {
  try {
    const { contentType, contentId, rating } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Avaliação deve ser entre 1 e 5' });
    }

    // Verificar se já avaliou
    const existing = await prisma.rating.findFirst({
      where: {
        userId: req.user.id,
        contentType,
        ...(contentType === 'MANGA' ? { mangaId: contentId } : { novelId: contentId }),
      },
    });

    let userRating;

    if (existing) {
      // Atualizar avaliação
      userRating = await prisma.rating.update({
        where: { id: existing.id },
        data: { rating },
      });
    } else {
      // Criar nova avaliação
      userRating = await prisma.rating.create({
        data: {
          userId: req.user.id,
          contentType,
          rating,
          ...(contentType === 'MANGA' ? { mangaId: contentId } : { novelId: contentId }),
        },
      });
    }

    // Calcular nova média
    const ratings = await prisma.rating.findMany({
      where: {
        contentType,
        ...(contentType === 'MANGA' ? { mangaId: contentId } : { novelId: contentId }),
      },
    });

    const avgRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

    // Atualizar média no mangá/novel
    if (contentType === 'MANGA') {
      await prisma.manga.update({
        where: { id: contentId },
        data: { rating: avgRating },
      });
    } else {
      await prisma.novel.update({
        where: { id: contentId },
        data: { rating: avgRating },
      });
    }

    res.json({
      message: 'Avaliação salva com sucesso',
      rating: userRating,
      averageRating: avgRating,
    });
  } catch (error) {
    console.error('Erro ao avaliar:', error);
    res.status(500).json({ error: 'Erro ao avaliar' });
  }
};

export const getUserRating = async (req, res) => {
  try {
    const { contentType, contentId } = req.query;

    const rating = await prisma.rating.findFirst({
      where: {
        userId: req.user.id,
        contentType,
        ...(contentType === 'MANGA' ? { mangaId: contentId } : { novelId: contentId }),
      },
    });

    res.json({ rating: rating?.rating || 0 });
  } catch (error) {
    console.error('Erro ao buscar avaliação:', error);
    res.status(500).json({ error: 'Erro ao buscar avaliação' });
  }
};