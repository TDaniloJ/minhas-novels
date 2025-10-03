import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import MangaCard from '../components/manga/MangaCard';
import NovelCard from '../components/novel/NovelCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Heart, BookOpen, Book } from 'lucide-react';

const Favorites = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL'); // ALL, MANGA, NOVEL

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadFavorites();
  }, [user]);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/favorites');
      setFavorites(data);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFavorites = favorites.filter(fav => {
    if (filter === 'ALL') return true;
    return fav.contentType === filter;
  });

  const mangaFavorites = filteredFavorites.filter(f => f.contentType === 'MANGA');
  const novelFavorites = filteredFavorites.filter(f => f.contentType === 'NOVEL');

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 flex items-center space-x-2">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          <span>Meus Favoritos</span>
        </h1>

        {/* Filtros */}
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === 'ALL'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Todos ({favorites.length})
          </button>
          <button
            onClick={() => setFilter('MANGA')}
            className={`px-4 py-2 rounded-lg font-semibold transition flex items-center space-x-2 ${
              filter === 'MANGA'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Mangás ({mangaFavorites.length})</span>
          </button>
          <button
            onClick={() => setFilter('NOVEL')}
            className={`px-4 py-2 rounded-lg font-semibold transition flex items-center space-x-2 ${
              filter === 'NOVEL'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Book className="w-4 h-4" />
            <span>Novels ({novelFavorites.length})</span>
          </button>
        </div>
      </div>

      {filteredFavorites.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Nenhum favorito ainda
          </h3>
          <p className="text-gray-500 mb-6">
            Adicione mangás e novels aos seus favoritos para vê-los aqui!
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/mangas')}
              className="btn-primary"
            >
              Ver Mangás
            </button>
            <button
              onClick={() => navigate('/novels')}
              className="btn-secondary"
            >
              Ver Novels
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {filteredFavorites.map((favorite) => (
            <div key={favorite.id}>
              {favorite.contentType === 'MANGA' ? (
                <MangaCard manga={favorite.manga} />
              ) : (
                <NovelCard novel={favorite.novel} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;