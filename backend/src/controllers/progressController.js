import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const saveProgress = async (req, res) => {
  try {
    const { contentType, contentId, chapterId, progress } = req.body;

    const data = {
      userId: req.user.id,
      contentType,
      progress: parseInt(progress),
      lastReadAt: new Date(),
    };

    if (contentType === 'MANGA') {
      data.mangaId = contentId;
      data.mangaChapterId = chapterId;
    } else {
      data.novelId = contentId;
      data.novelChapterId = chapterId;
    }

    const existing = await prisma.readingProgress.findFirst({
      where: {
        userId: req.user.id,
        contentType,
        ...(contentType === 'MANGA' ? { mangaId: contentId } : { novelId: contentId }),
      },
    });

    let progressRecord;

    if (existing) {
      progressRecord = await prisma.readingProgress.update({
        where: { id: existing.id },
        data,
      });
    } else {
      progressRecord = await prisma.readingProgress.create({
        data,
      });
    }

    res.json({ message: 'Progresso salvo', progress: progressRecord });
  } catch (error) {
    console.error('Erro ao salvar progresso:', error);
    res.status(500).json({ error: 'Erro ao salvar progresso' });
  }
};

export const getProgress = async (req, res) => {
  try {
    const { contentType, contentId } = req.query;

    const progress = await prisma.readingProgress.findFirst({
      where: {
        userId: req.user.id,
        contentType,
        ...(contentType === 'MANGA' ? { mangaId: contentId } : { novelId: contentId }),
      },
      include: {
        mangaChapter: true,
        novelChapter: true,
      },
    });

    res.json(progress);
  } catch (error) {
    console.error('Erro ao buscar progresso:', error);
    res.status(500).json({ error: 'Erro ao buscar progresso' });
  }
};

export const getReadingHistory = async (req, res) => {
  try {
    const history = await prisma.readingProgress.findMany({
      where: { userId: req.user.id },
      include: {
        manga: {
          select: {
            id: true,
            title: true,
            coverImage: true,
          },
        },
        novel: {
          select: {
            id: true,
            title: true,
            coverImage: true,
          },
        },
        mangaChapter: {
          select: {
            id: true,
            chapterNumber: true,
            title: true,
          },
        },
        novelChapter: {
          select: {
            id: true,
            chapterNumber: true,
            title: true,
          },
        },
      },
      orderBy: { lastReadAt: 'desc' },
      take: 20,
    });

    res.json(history);
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    res.status(500).json({ error: 'Erro ao buscar histórico' });
  }
};