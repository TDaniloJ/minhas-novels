import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import {
  BookOpen, Book, Users, Eye, Star, MessageSquare, Heart,
  Plus, Edit, Trash2, TrendingUp, Calendar, BarChart3
} from 'lucide-react';

const SuperDashboard = () => {
  const [stats, setStats] = useState({
    totalMangas: 0,
    totalNovels: 0,
    totalUsers: 0,
    totalViews: 0,
    totalComments: 0,
    totalFavorites: 0,
    mangaChapters: 0,
    novelChapters: 0,
  });

  const [content, setContent] = useState({
    mangas: [],
    novels: [],
    characters: [],
    volumes: [],
  });

  const [activeTab, setActiveTab] = useState('overview'); // overview, mangas, novels, characters, volumes, world, arcs, magic
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      
      const [mangaRes, novelRes] = await Promise.all([
        api.get('/manga?limit=1000'),
        api.get('/novel?limit=1000'),
      ]);

      const mangas = mangaRes.data.mangas;
      const novels = novelRes.data.novels;

      const totalMangaViews = mangas.reduce((sum, m) => sum + m.views, 0);
      const totalNovelViews = novels.reduce((sum, n) => sum + n.views, 0);
      const mangaChapters = mangas.reduce((sum, m) => sum + (m.chapters?.length || 0), 0);
      const novelChapters = novels.reduce((sum, n) => sum + (n.chapters?.length || 0), 0);

      setStats({
        totalMangas: mangas.length,
        totalNovels: novels.length,
        totalUsers: 0, // TODO: criar rota para pegar total de usuários
        totalViews: totalMangaViews + totalNovelViews,
        totalComments: 0, // TODO
        totalFavorites: 0, // TODO
        mangaChapters,
        novelChapters,
      });

      setContent({
        mangas: mangas.slice(0, 20),
        novels: novels.slice(0, 20),
        characters: [],
        volumes: [],
      });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!confirm(`Tem certeza que deseja deletar este ${type}?`)) return;
    
    try {
      await api.delete(`/${type}/${id}`);
      toast.success(`${type} deletado com sucesso`);
      loadAllData();
    } catch (error) {
      console.error('Erro ao deletar:', error);
      toast.error('Erro ao deletar');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
        <p className="text-gray-600">Gerencie todo o conteúdo da plataforma</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="w-12 h-12 opacity-80" />
            <div className="text-right">
              <p className="text-3xl font-bold">{stats.totalMangas}</p>
              <p className="text-sm opacity-80">Mangás</p>
            </div>
          </div>
          <div className="text-sm opacity-80">{stats.mangaChapters} capítulos</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Book className="w-12 h-12 opacity-80" />
            <div className="text-right">
              <p className="text-3xl font-bold">{stats.totalNovels}</p>
              <p className="text-sm opacity-80">Novels</p>
            </div>
          </div>
          <div className="text-sm opacity-80">{stats.novelChapters} capítulos</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Eye className="w-12 h-12 opacity-80" />
            <div className="text-right">
              <p className="text-3xl font-bold">{stats.totalViews.toLocaleString()}</p>
              <p className="text-sm opacity-80">Visualizações</p>
            </div>
          </div>
          <div className="text-sm opacity-80">Total de views</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-12 h-12 opacity-80" />
            <div className="text-right">
              <p className="text-3xl font-bold">{stats.totalMangas + stats.totalNovels}</p>
              <p className="text-sm opacity-80">Conteúdo Total</p>
            </div>
          </div>
          <div className="text-sm opacity-80">{stats.mangaChapters + stats.novelChapters} capítulos</div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/manga/new"
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition"
          >
            <Plus className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm font-semibold text-blue-600">Novo Mangá</span>
          </Link>

          <Link
            to="/admin/novel/new"
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-purple-300 rounded-lg hover:bg-purple-50 transition"
          >
            <Plus className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-sm font-semibold text-purple-600">Nova Novel</span>
          </Link>

          <Link
            to="/mangas"
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <BookOpen className="w-8 h-8 text-gray-600 mb-2" />
            <span className="text-sm font-semibold text-gray-600">Ver Mangás</span>
          </Link>

          <Link
            to="/novels"
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <Book className="w-8 h-8 text-gray-600 mb-2" />
            <span className="text-sm font-semibold text-gray-600">Ver Novels</span>
          </Link>
        </div>
      </div>

      {/* Tabs de Gerenciamento */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {['overview', 'mangas', 'novels'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-semibold whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'overview' && 'Visão Geral'}
                {tab === 'mangas' && `Mangás (${stats.totalMangas})`}
                {tab === 'novels' && `Novels (${stats.totalNovels})`}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Últimos Mangás */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Últimos Mangás</h3>
                  <div className="space-y-2">
                    {content.mangas.slice(0, 5).map((manga) => (
                      <div key={manga.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img
                            src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${manga.coverImage}`}
                            alt={manga.title}
                            className="w-12 h-16 object-cover rounded"
                          />
                          <div>
                            <p className="font-semibold text-sm">{manga.title}</p>
                            <p className="text-xs text-gray-600">{manga.chapters?.length || 0} capítulos</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Link
                            to={`/admin/manga/${manga.id}/edit`}
                            className="p-2 hover:bg-blue-100 rounded"
                          >
                            <Edit className="w-4 h-4 text-blue-600" />
                          </Link>
                          <button
                            onClick={() => handleDelete('manga', manga.id)}
                            className="p-2 hover:bg-red-100 rounded"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Últimas Novels */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Últimas Novels</h3>
                  <div className="space-y-2">
                    {content.novels.slice(0, 5).map((novel) => (
                      <div key={novel.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img
                            src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${novel.coverImage}`}
                            alt={novel.title}
                            className="w-12 h-16 object-cover rounded"
                          />
                          <div>
                            <p className="font-semibold text-sm">{novel.title}</p>
                            <p className="text-xs text-gray-600">{novel.chapters?.length || 0} capítulos</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Link
                            to={`/admin/novel/${novel.id}/edit`}
                            className="p-2 hover:bg-blue-100 rounded"
                          >
                            <Edit className="w-4 h-4 text-blue-600" />
                          </Link>
                          <button
                            onClick={() => handleDelete('novel', novel.id)}
                            className="p-2 hover:bg-red-100 rounded"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mangás Tab */}
          {activeTab === 'mangas' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Todos os Mangás</h3>
                <Link to="/admin/manga/new" className="btn-primary text-sm">
                  <Plus className="w-4 h-4 inline mr-1" />
                  Novo Mangá
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capa</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Autor</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capítulos</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {content.mangas.map((manga) => (
                      <tr key={manga.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <img
                            src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${manga.coverImage}`}
                            alt={manga.title}
                            className="w-12 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Link to={`/manga/${manga.id}`} className="font-semibold hover:text-primary-600">
                            {manga.title}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{manga.author}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            manga.status === 'ONGOING' ? 'bg-green-100 text-green-800' :
                            manga.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {manga.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">{manga.chapters?.length || 0}</td>
                        <td className="px-4 py-3 text-sm">{manga.views.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Link
                              to={`/admin/manga/${manga.id}/edit`}
                              className="p-2 hover:bg-blue-100 rounded"
                              title="Editar"
                            >
                              <Edit className="w-4 h-4 text-blue-600" />
                            </Link>
                            <Link
                              to={`/admin/manga/${manga.id}/chapter/new`}
                              className="p-2 hover:bg-green-100 rounded"
                              title="Adicionar Capítulo"
                            >
                              <Plus className="w-4 h-4 text-green-600" />
                            </Link>
                            <button
                              onClick={() => handleDelete('manga', manga.id)}
                              className="p-2 hover:bg-red-100 rounded"
                              title="Deletar"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Novels Tab */}
          {activeTab === 'novels' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Todas as Novels</h3>
                <Link to="/admin/novel/new" className="btn-primary text-sm">
                  <Plus className="w-4 h-4 inline mr-1" />
                  Nova Novel
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capa</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Autor</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capítulos</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {content.novels.map((novel) => (
                      <tr key={novel.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <img
                            src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${novel.coverImage}`}
                            alt={novel.title}
                            className="w-12 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Link to={`/novel/${novel.id}`} className="font-semibold hover:text-primary-600">
                            {novel.title}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{novel.author}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            novel.status === 'ONGOING' ? 'bg-green-100 text-green-800' :
                            novel.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {novel.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">{novel.chapters?.length || 0}</td>
                        <td className="px-4 py-3 text-sm">{novel.views.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Link
                              to={`/admin/novel/${novel.id}/edit`}
                              className="p-2 hover:bg-blue-100 rounded"
                              title="Editar"
                            >
                              <Edit className="w-4 h-4 text-blue-600" />
                            </Link>
                            <Link
                              to={`/admin/novel/${novel.id}/chapter/new`}
                              className="p-2 hover:bg-green-100 rounded"
                              title="Adicionar Capítulo"
                            >
                              <Plus className="w-4 h-4 text-green-600" />
                            </Link>
                            <Link
                              to={`/admin/novel/${novel.id}/manage`}
                              className="p-2 hover:bg-purple-100 rounded"
                              title="Gerenciar Novel"
                            >
                              <BookOpen className="w-4 h-4 text-purple-600" />
                            </Link>
                            <button
                              onClick={() => handleDelete('novel', novel.id)}
                              className="p-2 hover:bg-red-100 rounded"
                              title="Deletar"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperDashboard;