import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useFavorite } from '../hooks/useFavorite';
import CommentSection from '../components/common/CommentSection';
import StarRating from '../components/common/StarRating';
import { 
  Eye, Star, Heart, Share2, BookOpen, Clock, 
  Edit, Trash2, Plus, Calendar 
} from 'lucide-react';
import toast from 'react-hot-toast';

const MangaDetail = () => {
  const { id } = useParams();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorite('MANGA', id);
  

  useEffect(() => {
    loadManga();
  }, [id]);

  const loadManga = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/manga/${id}`);
      setManga(data);
      // TODO: Verificar se está nos favoritos
    } catch (error) {
      console.error('Erro ao carregar mangá:', error);
      toast.error('Erro ao carregar mangá');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja deletar este mangá?')) return;
    
    try {
      await api.delete(`/manga/${id}`);
      toast.success('Mangá deletado com sucesso');
      navigate('/mangas');
    } catch (error) {
      console.error('Erro ao deletar:', error);
      toast.error('Erro ao deletar mangá');
    }
  };

  const handleFavorite = async () => {
    await toggleFavorite();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copiado!');
  };

  if (loading) return <LoadingSpinner />;
  if (!manga) return <div className="text-center py-12">Mangá não encontrado</div>;

  const imageUrl = `${import.meta.env.VITE_API_URL?.replace('/api', '')}${manga.coverImage}`;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner com Imagem de Fundo */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${imageUrl})` 
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-end pb-8">
          <div className="flex items-end space-x-6">
            {/* Capa */}
            <img
              src={imageUrl}
              alt={manga.title}
              className="w-48 h-72 object-cover rounded-lg shadow-2xl border-4 border-white"
            />
            
            {/* Informações Básicas */}
            <div className="text-white pb-4">
              <h1 className="text-4xl font-bold mb-2">{manga.title}</h1>
              <p className="text-xl text-gray-300 mb-4">{manga.author}</p>
              
              <div className="mb-4">
                <StarRating contentType="MANGA" contentId={id} currentRating={manga.rating} />
              </div>

              <div className="flex items-center space-x-6 mb-4">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>{manga.views.toLocaleString()} visualizações</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span>{manga.rating.toFixed(1)}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  manga.status === 'ONGOING' ? 'bg-green-500' :
                  manga.status === 'COMPLETED' ? 'bg-blue-500' : 'bg-yellow-500'
                }`}>
                  {manga.status === 'ONGOING' ? 'Em Andamento' :
                   manga.status === 'COMPLETED' ? 'Completo' : 'Hiato'}
                </span>
              </div>

              {/* Gêneros */}
              <div className="flex flex-wrap gap-2 mb-4">
                {manga.genres.map((genre, index) => (
                  <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>

              {/* Botões de Ação */}
              <div className="flex space-x-3">
                {manga.chapters && manga.chapters.length > 0 && (
                  <Link
                    to={`/manga/${id}/chapter/${manga.chapters[0].id}`}
                    className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 px-6 py-3 rounded-lg font-semibold transition"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>Ler Primeiro Capítulo</span>
                  </Link>
                )}
                
                <button
                  onClick={handleFavorite}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition ${
                    isFavorite 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-white/20 hover:bg-white/30 backdrop-blur'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
                  <span>{isFavorite ? 'Favoritado' : 'Favoritar'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur px-6 py-3 rounded-lg font-semibold transition"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Compartilhar</span>
                </button>

                {isAdmin() && (
                  <>
                    <Link
                      to={`/admin/manga/${id}/edit`}
                      className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition"
                    >
                      <Edit className="w-5 h-5" />
                      <span>Editar</span>
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-semibold transition"
                    >
                      <Trash2 className="w-5 h-5" />
                      <span>Deletar</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sinopse */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Sinopse</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {manga.description}
              </p>
            </div>

            {/* Lista de Capítulos */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Capítulos</h2>
                {isAdmin() && (
                  <Link
                    to={`/admin/manga/${id}/chapter/new`}
                    className="flex items-center space-x-2 btn-primary"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Adicionar Capítulo</span>
                  </Link>
                )}
              </div>

              {manga.chapters && manga.chapters.length > 0 ? (
                <div className="space-y-2">
                  {manga.chapters.map((chapter) => (
                    <Link
                      key={chapter.id}
                      to={`/manga/${id}/chapter/${chapter.id}`}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold">
                          {chapter.chapterNumber}
                        </div>
                        <div>
                          <h3 className="font-semibold group-hover:text-primary-600 transition">
                            Capítulo {chapter.chapterNumber} - {chapter.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{chapter.views.toLocaleString()}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(chapter.publishedAt).toLocaleDateString()}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <BookOpen className="w-6 h-6 text-gray-400 group-hover:text-primary-600 transition" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhum capítulo disponível ainda</p>
                </div>
              )}
            </div>
          </div>

          {/* Barra Lateral */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h3 className="font-bold text-lg mb-4">Informações</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Autor:</span>
                  <p className="font-semibold">{manga.author}</p>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <p className="font-semibold">
                    {manga.status === 'ONGOING' ? 'Em Andamento' :
                     manga.status === 'COMPLETED' ? 'Completo' : 'Hiato'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Visualizações:</span>
                  <p className="font-semibold">{manga.views.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Avaliação:</span>
                  <p className="font-semibold">{manga.rating.toFixed(1)} / 5.0</p>
                </div>
                <div>
                  <span className="text-gray-600">Capítulos:</span>
                  <p className="font-semibold">{manga.chapters?.length || 0}</p>
                </div>
                <div>
                  <span className="text-gray-600">Adicionado em:</span>
                  <p className="font-semibold">
                    {new Date(manga.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Uploader:</span>
                  <p className="font-semibold">{manga.uploader.username}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 pb-8">
        <CommentSection contentType="MANGA" contentId={id} />
      </div>
    </div>
  );
};

export default MangaDetail;