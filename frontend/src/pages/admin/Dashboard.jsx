import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Book, Plus, BarChart3, Users, Eye, Star } from 'lucide-react';
import api from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMangas: 0,
    totalNovels: 0,
    totalUsers: 0,
    totalViews: 0,
    recentMangas: [],
    recentNovels: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      
      const [mangas, novels] = await Promise.all([
        api.get('/manga?limit=100'),
        api.get('/novel?limit=100'),
      ]);

      const totalMangaViews = mangas.data.mangas.reduce((sum, manga) => sum + manga.views, 0);
      const totalNovelViews = novels.data.novels.reduce((sum, novel) => sum + novel.views, 0);

      setStats({
        totalMangas: mangas.data.pagination.total,
        totalNovels: novels.data.pagination.total,
        totalUsers: 0, // Implementar depois
        totalViews: totalMangaViews + totalNovelViews,
        recentMangas: mangas.data.mangas.slice(0, 5),
        recentNovels: novels.data.novels.slice(0, 5),
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total de Mangás</p>
              <p className="text-3xl font-bold text-primary-600">{stats.totalMangas}</p>
            </div>
            <BookOpen className="w-12 h-12 text-primary-200" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total de Novels</p>
              <p className="text-3xl font-bold text-purple-600">{stats.totalNovels}</p>
            </div>
            <Book className="w-12 h-12 text-purple-200" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Conteúdo Total</p>
              <p className="text-3xl font-bold text-green-600">
                {stats.totalMangas + stats.totalNovels}
              </p>
            </div>
            <BarChart3 className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Views Totais</p>
              <p className="text-3xl font-bold text-orange-600">
                {stats.totalViews.toLocaleString()}
              </p>
            </div>
            <Eye className="w-12 h-12 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/manga/new"
            className="flex items-center space-x-3 p-4 border-2 border-dashed border-primary-300 rounded-lg hover:bg-primary-50 transition"
          >
            <Plus className="w-8 h-8 text-primary-600" />
            <div>
              <h3 className="font-semibold text-primary-600">Adicionar Mangá</h3>
              <p className="text-sm text-gray-600">Criar novo mangá</p>
            </div>
          </Link>

          <Link
            to="/admin/novel/new"
            className="flex items-center space-x-3 p-4 border-2 border-dashed border-purple-300 rounded-lg hover:bg-purple-50 transition"
          >
            <Plus className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="font-semibold text-purple-600">Adicionar Novel</h3>
              <p className="text-sm text-gray-600">Criar nova novel</p>
            </div>
          </Link>

          <Link
            to="/mangas"
            className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <BookOpen className="w-8 h-8 text-gray-600" />
            <div>
              <h3 className="font-semibold text-gray-600">Gerenciar Mangás</h3>
              <p className="text-sm text-gray-600">Ver todos os mangás</p>
            </div>
          </Link>

          <Link
            to="/novels"
            className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <Book className="w-8 h-8 text-gray-600" />
            <div>
              <h3 className="font-semibold text-gray-600">Gerenciar Novels</h3>
              <p className="text-sm text-gray-600">Ver todas as novels</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Conteúdo Recente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mangás Recentes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-primary-600" />
            <span>Mangás Recentes</span>
          </h2>
          {stats.recentMangas.length > 0 ? (
            <div className="space-y-3">
              {stats.recentMangas.map((manga) => (
                <Link
                  key={manga.id}
                  to={`/manga/${manga.id}`}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition"
                >
                  <img
                    src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${manga.coverImage}`}
                    alt={manga.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm line-clamp-1">{manga.title}</h3>
                    <div className="flex items-center space-x-3 text-xs text-gray-600 mt-1">
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{manga.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>{manga.rating.toFixed(1)}</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Nenhum mangá ainda</p>
          )}
        </div>

        {/* Novels Recentes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <Book className="w-6 h-6 text-purple-600" />
            <span>Novels Recentes</span>
          </h2>
          {stats.recentNovels.length > 0 ? (
            <div className="space-y-3">
              {stats.recentNovels.map((novel) => (
                <Link
                  key={novel.id}
                  to={`/novel/${novel.id}`}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition"
                >
                  <img
                    src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${novel.coverImage}`}
                    alt={novel.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm line-clamp-1">{novel.title}</h3>
                    <div className="flex items-center space-x-3 text-xs text-gray-600 mt-1">
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{novel.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>{novel.rating.toFixed(1)}</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Nenhuma novel ainda</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;