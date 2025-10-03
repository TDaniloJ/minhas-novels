import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addFavorite = async (req, res) => {
  try {
    const { contentType, contentId } = req.body;

    // Verificar se já existe
    const existing = await prisma.favorite.findFirst({
      where: {
        userId: req.user.id,
        contentType,
        ...(contentType === 'MANGA' ? { mangaId: contentId } : { novelId: contentId }),
      },
    });

    if (existing) {
      return res.status(400).json({ error: 'Já está nos favoritos' });
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: req.user.id,
        contentType,
        ...(contentType === 'MANGA' ? { mangaId: contentId } : { novelId: contentId }),
      },
    });

    res.status(201).json({
      message: 'Adicionado aos favoritos',
      favorite,
    });
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    res.status(500).json({ error: 'Erro ao adicionar favorito' });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { contentType, contentId } = req.body;

    const favorite = await prisma.favorite.findFirst({
      where: {
        userId: req.user.id,
        contentType,
        ...(contentType === 'MANGA' ? { mangaId: contentId } : { novelId: contentId }),
      },
    });

    if (!favorite) {
      return res.status(404).json({ error: 'Favorito não encontrado' });
    }

    await prisma.favorite.delete({
      where: { id: favorite.id },
    });

    res.json({ message: 'Removido dos favoritos' });
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
    res.status(500).json({ error: 'Erro ao remover favorito' });
  }
};

export const getUserFavorites = async (req, res) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.user.id },
      include: {
        manga: {
          select: {
            id: true,
            title: true,
            coverImage: true,
            author: true,
            status: true,
            genres: true,
            views: true,
            rating: true,
          },
        },
        novel: {
          select: {
            id: true,
            title: true,
            coverImage: true,
            author: true,
            status: true,
            genres: true,
            views: true,
            rating: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(favorites);
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    res.status(500).json({ error: 'Erro ao buscar favoritos' });
  }
};

export const checkFavorite = async (req, res) => {
  try {
    const { contentType, contentId } = req.query;

    const favorite = await prisma.favorite.findFirst({
      where: {
        userId: req.user.id,
        contentType,
        ...(contentType === 'MANGA' ? { mangaId: contentId } : { novelId: contentId }),
      },
    });

    res.json({ isFavorite: !!favorite });
  } catch (error) {
    console.error('Erro ao verificar favorito:', error);
    res.status(500).json({ error: 'Erro ao verificar favorito' });
  }
};