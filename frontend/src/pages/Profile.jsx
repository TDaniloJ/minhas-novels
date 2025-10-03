import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { User, Mail, Calendar, Edit2, Save, X, Heart, BookOpen, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Profile = () => {
  const { user, loadUser } = useAuth();
  const navigate = useNavigate();
  
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    favorites: 0,
    comments: 0,
  });
  
  const [formData, setFormData] = useState({
    username: '',
    avatar: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setFormData({
      username: user.username,
      avatar: user.avatar || '',
    });
    
    loadStats();
  }, [user]);

  const loadStats = async () => {
    try {
      const [favorites, comments] = await Promise.all([
        api.get('/favorites'),
        // api.get('/comments/user'), // Você pode criar esta rota depois
      ]);
      
      setStats({
        favorites: favorites.data.length,
        comments: 0, // Implementar depois
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put('/auth/profile', formData);
      toast.success('Perfil atualizado com sucesso!');
      setEditing(false);
      // Recarregar dados do usuário
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
      avatar: user.avatar || '',
    });
    setEditing(false);
  };

  if (!user) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Meu Perfil</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card Principal */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
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
                {/* Avatar */}
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-4xl font-bold">
                    {user.username[0].toUpperCase()}
                  </div>
                  {editing && (
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-2">URL do Avatar (opcional)</label>
                      <input
                        type="url"
                        value={formData.avatar}
                        onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="https://exemplo.com/avatar.jpg"
                      />
                    </div>
                  )}
                </div>

                {/* Username */}
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-700 font-semibold">{user.username}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </label>
                  <p className="text-gray-700">{user.email}</p>
                  <p className="text-xs text-gray-500 mt-1">O email não pode ser alterado</p>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium mb-2">Função</label>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {user.role === 'ADMIN' ? 'Administrador' : 'Usuário'}
                  </span>
                </div>

                {/* Data de Criação */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Membro desde
                  </label>
                  <p className="text-gray-700">
                    {new Date(user.createdAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>

                {/* Botões */}
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
          </div>

          {/* Estatísticas */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Estatísticas</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-8 h-8 text-red-500" />
                    <div>
                      <p className="text-sm text-gray-600">Favoritos</p>
                      <p className="text-2xl font-bold text-red-600">{stats.favorites}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">Comentários</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.comments}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/favorites')}
                  className="w-full btn-primary"
                >
                  Ver Meus Favoritos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;