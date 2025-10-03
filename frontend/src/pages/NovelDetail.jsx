import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFavorite } from '../hooks/useFavorite';
import api from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import CommentSection from '../components/common/CommentSection';
import StarRating from '../components/common/StarRating';
import { 
  Eye, Star, Heart, Share2, BookOpen, Clock, 
  Edit, Trash2, Plus, Calendar, Users, Globe, 
  Sparkles, BookMarked, Layers
} from 'lucide-react';
import toast from 'react-hot-toast';

const NovelDetail = () => {
  const { id } = useParams();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorite('NOVEL', id);
  
  const [novel, setNovel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('chapters'); // chapters, characters, world, volumes, arcs, magic
  
  // Dados avançados
  const [characters, setCharacters] = useState([]);
  const [worldBuilding, setWorldBuilding] = useState([]);
  const [volumes, setVolumes] = useState([]);
  const [arcs, setArcs] = useState([]);
  const [magics, setMagics] = useState([]);

  useEffect(() => {
    loadNovel();
    loadAdvancedData();
  }, [id]);

  const loadNovel = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/novel/${id}`);
      setNovel(data);
    } catch (error) {
      console.error('Erro ao carregar novel:', error);
      toast.error('Erro ao carregar novel');
    } finally {
      setLoading(false);
    }
  };

  const loadAdvancedData = async () => {
    try {
      const [chars, world, vols, arcsData, magicData] = await Promise.all([
        api.get(`/novel-advanced/${id}/characters`),
        api.get(`/novel-advanced/${id}/worldbuilding`),
        api.get(`/novel-advanced/${id}/volumes`),
        api.get(`/novel-advanced/${id}/arcs`),
        api.get(`/novel-advanced/${id}/magic`),
      ]);
      
      setCharacters(chars.data);
      setWorldBuilding(world.data);
      setVolumes(vols.data);
      setArcs(arcsData.data);
      setMagics(magicData.data);
    } catch (error) {
      console.error('Erro ao carregar dados avançados:', error);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja deletar esta novel?')) return;
    
    try {
      await api.delete(`/novel/${id}`);
      toast.success('Novel deletada com sucesso');
      navigate('/novels');
    } catch (error) {
      console.error('Erro ao deletar:', error);
      toast.error('Erro ao deletar novel');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copiado!');
  };

  if (loading) return <LoadingSpinner />;
  if (!novel) return <div className="text-center py-12">Novel não encontrada</div>;

  const imageUrl = `${import.meta.env.VITE_API_URL?.replace('/api', '')}${novel.coverImage}`;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${imageUrl})` 
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-end pb-8">
          <div className="flex items-end space-x-6">
            <img
              src={imageUrl}
              alt={novel.title}
              className="w-48 h-72 object-cover rounded-lg shadow-2xl border-4 border-white"
            />
            
            <div className="text-white pb-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 bg-purple-600 rounded-full text-sm font-semibold">
                  Novel
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-2">{novel.title}</h1>
              <p className="text-xl text-gray-300 mb-4">{novel.author}</p>
              
              <div className="flex items-center space-x-6 mb-4">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>{novel.views.toLocaleString()} visualizações</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  novel.status === 'ONGOING' ? 'bg-green-500' :
                  novel.status === 'COMPLETED' ? 'bg-blue-500' : 'bg-yellow-500'
                }`}>
                  {novel.status === 'ONGOING' ? 'Em Andamento' :
                   novel.status === 'COMPLETED' ? 'Completo' : 'Hiato'}
                </span>
              </div>

              <div className="mb-4">
                <StarRating contentType="NOVEL" contentId={id} currentRating={novel.rating} />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {novel.genres.map((genre, index) => (
                  <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>

              <div className="flex space-x-3">
                {novel.chapters && novel.chapters.length > 0 && (
                  <Link
                    to={`/novel/${id}/chapter/${novel.chapters[0].id}`}
                    className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 px-6 py-3 rounded-lg font-semibold transition"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>Ler Primeiro Capítulo</span>
                  </Link>
                )}
                
                <button
                  onClick={toggleFavorite}
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
                      to={`/admin/novel/${id}/edit`}
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

      {/* Conteúdo */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Sinopse */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Sinopse</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {novel.description}
              </p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="border-b border-gray-200">
                <nav className="flex overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('chapters')}
                    className={`px-6 py-4 text-sm font-semibold whitespace-nowrap ${
                      activeTab === 'chapters'
                        ? 'border-b-2 border-purple-600 text-purple-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>Capítulos ({novel.chapters?.length || 0})</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('characters')}
                    className={`px-6 py-4 text-sm font-semibold whitespace-nowrap ${
                      activeTab === 'characters'
                        ? 'border-b-2 border-purple-600 text-purple-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Personagens ({characters.length})</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('world')}
                    className={`px-6 py-4 text-sm font-semibold whitespace-nowrap ${
                      activeTab === 'world'
                        ? 'border-b-2 border-purple-600 text-purple-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4" />
                      <span>Mundo ({worldBuilding.length})</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('volumes')}
                    className={`px-6 py-4 text-sm font-semibold whitespace-nowrap ${
                      activeTab === 'volumes'
                        ? 'border-b-2 border-purple-600 text-purple-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <BookMarked className="w-4 h-4" />
                      <span>Volumes ({volumes.length})</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('arcs')}
                    className={`px-6 py-4 text-sm font-semibold whitespace-nowrap ${
                      activeTab === 'arcs'
                        ? 'border-b-2 border-purple-600 text-purple-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Layers className="w-4 h-4" />
                      <span>Arcos ({arcs.length})</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('magic')}
                    className={`px-6 py-4 text-sm font-semibold whitespace-nowrap ${
                      activeTab === 'magic'
                        ? 'border-b-2 border-purple-600 text-purple-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Magias ({magics.length})</span>
                    </div>
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Capítulos */}
                {activeTab === 'chapters' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">Capítulos</h3>
                      {isAdmin() && (
                        <Link
                          to={`/admin/novel/${id}/chapter/new`}
                          className="flex items-center space-x-2 btn-primary text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Adicionar</span>
                        </Link>
                      )}
                    </div>

                    {novel.chapters && novel.chapters.length > 0 ? (
                      <div className="space-y-2">
                        {novel.chapters.map((chapter) => (
                          <Link
                            key={chapter.id}
                            to={`/novel/${id}/chapter/${chapter.id}`}
                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition group"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold">
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
                )}

                {/* Personagens */}
                {activeTab === 'characters' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">Personagens</h3>
                      {isAdmin() && (
                        <Link
                          to={`/admin/novel/${id}/character/new`}
                          className="flex items-center space-x-2 btn-primary text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Adicionar</span>
                        </Link>
                      )}
                    </div>

                    {characters.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {characters.map((character) => (
                          <div key={character.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                            <div className="flex space-x-4">
                              {character.image ? (
                                <img
                                  src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${character.image}`}
                                  alt={character.name}
                                  className="w-20 h-20 rounded-lg object-cover"
                                />
                              ) : (
                                <div className="w-20 h-20 bg-purple-100 rounded-lg flex items-center justify-center">
                                  <Users className="w-10 h-10 text-purple-600" />
                                </div>
                              )}
                              <div className="flex-1">
                                <h4 className="font-bold text-lg">{character.name}</h4>
                                <p className="text-sm text-purple-600 mb-2">{character.role}</p>
                                {character.age && (
                                  <p className="text-xs text-gray-600">Idade: {character.age}</p>
                                )}
                                <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                                  {character.description}
                                </p>
                                {character.abilities && character.abilities.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {character.abilities.slice(0, 3).map((ability, idx) => (
                                      <span key={idx} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                        {ability}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Nenhum personagem cadastrado</p>
                      </div>
                    )}
                  </div>
                )}

                {/* World Building */}
                {activeTab === 'world' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">Construção do Mundo</h3>
                      {isAdmin() && (
                        <Link
                          to={`/admin/novel/${id}/worldbuilding/new`}
                          className="flex items-center space-x-2 btn-primary text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Adicionar</span>
                        </Link>
                      )}
                    </div>

                    {worldBuilding.length > 0 ? (
                      <div className="space-y-4">
                        {worldBuilding.map((item) => (
                          <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-bold text-lg">{item.title}</h4>
                                <span className="text-sm text-blue-600">{item.category}</span>
                              </div>
                            </div>
                            {item.imageUrl && (
                              <img
                                src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${item.imageUrl}`}
                                alt={item.title}
                                className="w-full h-48 object-cover rounded-lg mb-3"
                              />
                            )}
                            <p className="text-gray-700 whitespace-pre-line">{item.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <Globe className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Nenhuma informação sobre o mundo</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Volumes */}
                {activeTab === 'volumes' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">Volumes</h3>
                      {isAdmin() && (
                        <Link
                          to={`/admin/novel/${id}/volume/new`}
                          className="flex items-center space-x-2 btn-primary text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Adicionar</span>
                        </Link>
                      )}
                    </div>

                    {volumes.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {volumes.map((volume) => (
                          <div key={volume.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                            {volume.coverImage ? (
                              <img
                                src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${volume.coverImage}`}
                                alt={volume.title}
                                className="w-full h-48 object-cover"
                              />
                            ) : (
                              <div className="w-full h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                                <span className="text-white text-4xl font-bold">Vol. {volume.volumeNumber}</span>
                              </div>
                            )}
                            <div className="p-4">
                              <h4 className="font-bold">Volume {volume.volumeNumber}</h4>
                              <p className="text-sm text-gray-600 line-clamp-2">{volume.title}</p>
                              <p className="text-xs text-gray-500 mt-2">
                                {volume.chapters?.length || 0} capítulos
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <BookMarked className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Nenhum volume cadastrado</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Arcos */}
                {activeTab === 'arcs' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">Arcos Narrativos</h3>
                      {isAdmin() && (
                        <Link
                          to={`/admin/novel/${id}/arc/new`}
                          className="flex items-center space-x-2 btn-primary text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Adicionar</span>
                        </Link>
                      )}
                    </div>

                    {arcs.length > 0 ? (
                      <div className="space-y-3">
                        {arcs.map((arc) => (
                          <div key={arc.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-bold text-lg">Arco {arc.arcNumber}: {arc.title}</h4>
                                {arc.volume && (
                                  <span className="text-sm text-purple-600">Volume {arc.volume.volumeNumber}</span>
                                )}
                                {arc.description && (
                                  <p className="text-gray-700 mt-2">{arc.description}</p>
                                )}
                                <p className="text-xs text-gray-500 mt-2">
                                  {arc.chapters?.length || 0} capítulos
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <Layers className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Nenhum arco cadastrado</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Sistema de Magia */}
                {activeTab === 'magic' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">Sistema de Magia</h3>
                      {isAdmin() && (
                        <Link
                          to={`/admin/novel/${id}/magic/new`}
                          className="flex items-center space-x-2 btn-primary text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Adicionar</span>
                        </Link>
                      )}
                    </div>

                    {magics.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {magics.map((magic) => (
                          <div key={magic.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-bold text-lg">{magic.name}</h4>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                    {magic.type}
                                  </span>
                                  {magic.level && (
                                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                      {magic.level}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 mb-3">{magic.description}</p>
                            
                            {(magic.manaCost || magic.cooldown || magic.range) && (
                              <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                                {magic.manaCost && (
                                  <div>
                                    <span className="text-gray-600">Mana:</span>
                                    <p className="font-semibold">{magic.manaCost}</p>
                                  </div>
                                )}
                                {magic.cooldown && (
                                  <div>
                                    <span className="text-gray-600">Recarga:</span>
                                    <p className="font-semibold">{magic.cooldown}</p>
                                  </div>
                                )}
                                {magic.range && (
                                  <div>
                                    <span className="text-gray-600">Alcance:</span>
                                    <p className="font-semibold">{magic.range}</p>
                                  </div>
                                )}
                              </div>
                            )}

                            {magic.effects && magic.effects.length > 0 && (
                              <div>
                                <p className="text-xs text-gray-600 mb-1">Efeitos:</p>
                                <div className="flex flex-wrap gap-1">
                                  {magic.effects.map((effect, idx) => (
                                    <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                      {effect}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <Sparkles className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Nenhuma magia cadastrada</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Comentários */}
            <CommentSection contentType="NOVEL" contentId={id} />
          </div>

          {/* Barra Lateral */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h3 className="font-bold text-lg mb-4">Informações</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Autor:</span>
                  <p className="font-semibold">{novel.author}</p>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <p className="font-semibold">
                    {novel.status === 'ONGOING' ? 'Em Andamento' :
                     novel.status === 'COMPLETED' ? 'Completo' : 'Hiato'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Visualizações:</span>
                  <p className="font-semibold">{novel.views.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Capítulos:</span>
                  <p className="font-semibold">{novel.chapters?.length || 0}</p>
                </div>
                <div>
                  <span className="text-gray-600">Volumes:</span>
                  <p className="font-semibold">{volumes.length}</p>
                </div>
                <div>
                  <span className="text-gray-600">Personagens:</span>
                  <p className="font-semibold">{characters.length}</p>
                </div>
                <div>
                  <span className="text-gray-600">Adicionado em:</span>
                  <p className="font-semibold">
                    {new Date(novel.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovelDetail;