import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

export const useProgress = (contentType, contentId, chapterId) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && contentId) {
      loadProgress();
    }
  }, [user, contentId]);

  const loadProgress = async () => {
    try {
      const { data } = await api.get('/progress', {
        params: { contentType, contentId },
      });
      if (data && data.mangaChapterId === chapterId) {
        setProgress(data.progress);
      }
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
    }
  };

  const saveProgress = async (newProgress) => {
    if (!user) return;

    setLoading(true);
    try {
      await api.post('/progress', {
        contentType,
        contentId,
        chapterId,
        progress: newProgress,
      });
      setProgress(newProgress);
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
    } finally {
      setLoading(false);
    }
  };

  return { progress, saveProgress, loading };
};