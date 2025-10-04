import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { 
  User, Mail, Calendar, Edit2, Save, X, Heart, BookOpen, 
  Clock, Upload, Camera, Book
} from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [stats, setStats] = useState({
    favorites: 0,
    comments: 0,
  });

  const [recentReading, setRecentReading] = useState([]);
  const [recentFavorites, setRecentFavorites] = useState([]);
  
  const [formData, setFormData] = useState({
    username: '',
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setFormData({
      username: user.username,
    });

    if (user.avatar) {
      setAvatarPreview(`${import.meta.env.VITE_API_URL?.replace('/api', '')}${user.avatar}`);
    }
    
    loadStats();
    loadRecentReading();
    loadRecentFavorites();
  }, [user]);

  const loadStats = async () => {
    try {
      const [favorites] = await Promise.all([
        api.get('/favorites'),
      ]);
      
      setStats({
        favorites: favorites.data.length,
        comments: 0,
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const loadRecentReading = async () => {
    try {
      const { data } = await api.get('/progress/history');
      setRecentReading(data.slice(0, 4));
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  };

  const loadRecentFavorites = async () => {
    try {
      const { data } = await api.get('/favorites');
      setRecentFavorites(data.slice(0, 4));
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('A imagem deve ter no máximo 5MB');
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('username', formData.username);
      if (avatarFile) {
        data.append('cover', avatarFile); // Usando o mesmo campo que já existe
      }

      await api.put('/auth/profile', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Perfil atualizado com sucesso!');
      setEditing(false);
      setAvatarFile(null);
      window.location.reload();
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      toast.error(error.response?.data?.error || 'Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user.username,
    });
    if (user.avatar) {
      setAvatarPreview(`${import.meta.env.VITE_API_URL?.replace('/api', '')}${user.avatar}`);
    } else {
      setAvatarPreview(null);
    }
    setAvatarFile(null);
    setEditing(false);
  };

  if (!user) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner/Capa */}
      <div className="relative h-48 bg-gradient-to-r from-primary-600 to-primary-800 rounded-t-lg">
        <div className="absolute -bottom-16 left-8">
          <div className="relative">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt={user.username}
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
              />
            ) : (
              <div className="w-32 h-32 bg-primary-100 dark:bg-primary-900 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center text-primary-600 dark:text-primary-400 text-5xl font-bold">
                {user.username[0].toUpperCase()}
              </div>
            )}

            {editing && (
              <label className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 p-2 rounded-full cursor-pointer shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card de Informações */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Informações Pessoais</h2>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center space-x-2 btn-secondary"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Editar</span>
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Username
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      required
                      className="w-full px-4 py-2 input border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300 font-semibold">{user.username}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </label>
                  <p className="text-gray-700 dark:text-gray-300">{user.email}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">O email não pode ser alterado</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Função</label>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    user.role === 'ADMIN' ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                    {user.role === 'ADMIN' ? 'Administrador' : 'Usuário'}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Membro desde
                  </label>
                  <p className="text-gray-700 dark:text-gray-300">
                    {new Date(user.createdAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>

                {editing && (
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center space-x-2 btn-primary disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      <span>{loading ? 'Salvando...' : 'Salvar'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex items-center space-x-2 btn-secondary"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancelar</span>
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Últimas Leituras */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Últimas Leituras</span>
                </h3>
                <Link to="/history" className="text-primary-600 hover:underline text-sm">
                  Ver todos
                </Link>
              </div>

              {recentReading.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhuma leitura recente</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {recentReading.map((item) => {
                    const content = item.manga || item.novel;
                    const chapter = item.mangaChapter || item.novelChapter;

                    return (
                      <Link
                        key={item.id}
                        to={item.contentType === 'MANGA' ? `/manga/${content.id}` : `/novel/${content.id}`}
                        className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                      >
                        <img
                          src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${content.coverImage}`}
                          alt={content.title}
                          className="w-16 h-20 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{content.title}</p>
                          {chapter && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                              Cap. {chapter.chapterNumber}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {new Date(item.lastReadAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Favoritos Recentes */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Favoritos Recentes</span>
                </h3>
                <Link to="/favorites" className="text-primary-600 hover:underline text-sm">
                  Ver todos
                </Link>
              </div>

              {recentFavorites.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Heart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhum favorito</p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-4">
                  {recentFavorites.map((fav) => {
                    const content = fav.manga || fav.novel;

                    return (
                      <Link
                        key={fav.id}
                        to={fav.contentType === 'MANGA' ? `/manga/${content.id}` : `/novel/${content.id}`}
                        className="group"
                      >
                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                          <img
                            src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${content.coverImage}`}
                            alt={content.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                            <p className="text-white text-xs font-semibold line-clamp-2">{content.title}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Barra Lateral */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-20">
              <h3 className="font-bold text-lg mb-6">Estatísticas</h3>
              
              <div className="space-y-4">
                <Link
                  to="/favorites"
                  className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition"
                >
                  <div className="flex items-center space-x-3">
                    <Heart className="w-8 h-8 text-red-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Favoritos</p>
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.favorites}</p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/history"
                  className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition"
                >
                  <div className="flex items-center space-x-3">
                    <Clock className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Histórico</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{recentReading.length}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;