import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

export const useFavorite = (contentType, contentId) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && contentId) {
      checkFavorite();
    }
  }, [user, contentId]);

  const checkFavorite = async () => {
    try {
      const { data } = await api.get('/favorites/check', {
        params: { contentType, contentId },
      });
      setIsFavorite(data.isFavorite);
    } catch (error) {
      console.error('Erro ao verificar favorito:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      toast.error('Faça login para favoritar');
      return false;
    }

    setLoading(true);

    try {
      if (isFavorite) {
        await api.delete('/favorites', {
          data: { contentType, contentId },
        });
        setIsFavorite(false);
        toast.success('Removido dos favoritos');
      } else {
        await api.post('/favorites', { contentType, contentId });
        setIsFavorite(true);
        toast.success('Adicionado aos favoritos');
      }
      return true;
    } catch (error) {
      console.error('Erro ao favoritar:', error);
      toast.error('Erro ao atualizar favorito');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { isFavorite, loading, toggleFavorite };
};