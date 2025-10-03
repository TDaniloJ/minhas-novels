import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { 
  ChevronLeft, ChevronRight, Home, ZoomIn, ZoomOut, 
  Maximize2, X, Settings 
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useProgress } from '../hooks/useProgress';

const MangaReader = () => {
  const { id, chapterId } = useParams();
  const navigate = useNavigate();
  
  const [chapter, setChapter] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [showControls, setShowControls] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [readingMode, setReadingMode] = useState('single'); // single, double
  const [showSettings, setShowSettings] = useState(false);
  const { saveProgress } = useProgress('MANGA', id, chapterId);

  useEffect(() => {
    loadChapter();
    loadChapterList();
  }, [chapterId]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') previousPage();
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'Escape' && fullscreen) toggleFullscreen();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, fullscreen]);

  useEffect(() => {
    if (chapter && currentPage >= 0) {
      const progress = Math.round(((currentPage + 1) / chapter.pages.length) * 100);
      saveProgress(progress);
    }
  }, [currentPage, chapter]);

  const loadChapter = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/manga/chapter/${chapterId}`);
      setChapter(data);
      setCurrentPage(0);
    } catch (error) {
      console.error('Erro ao carregar capítulo:', error);
      toast.error('Erro ao carregar capítulo');
    } finally {
      setLoading(false);
    }
  };

  const loadChapterList = async () => {
    try {
      const { data } = await api.get(`/manga/${id}`);
      setChapters(data.chapters);
    } catch (error) {
      console.error('Erro ao carregar lista:', error);
    }
  };

  const getCurrentIndex = () => {
    return chapters.findIndex(c => c.id === chapterId);
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      // Ir para capítulo anterior
      const currentIndex = getCurrentIndex();
      if (currentIndex > 0) {
        navigate(`/manga/${id}/chapter/${chapters[currentIndex - 1].id}`);
      }
    }
  };

  const nextPage = () => {
    if (chapter && currentPage < chapter.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Ir para próximo capítulo
      const currentIndex = getCurrentIndex();
      if (currentIndex < chapters.length - 1) {
        navigate(`/manga/${id}/chapter/${chapters[currentIndex + 1].id}`);
      }
    }
  };

  const handlePageClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    // Dividir em 3 áreas: esquerda (30%), centro (40%), direita (30%)
    if (x < width * 0.3) {
      previousPage();
    } else if (x > width * 0.7) {
      nextPage();
    } else {
      setShowControls(!showControls);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!chapter) return <div className="text-center py-12">Capítulo não encontrado</div>;

  const currentImageUrl = `${import.meta.env.VITE_API_URL?.replace('/api', '')}${chapter.pages[currentPage]}`;
  const hasPrevious = currentPage > 0 || getCurrentIndex() > 0;
  const hasNext = currentPage < chapter.pages.length - 1 || getCurrentIndex() < chapters.length - 1;

  return (
    <div className="bg-black min-h-screen relative">
      {/* Header */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent p-4 transition-all duration-300 ${
          showControls ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between text-white">
          <Link to={`/manga/${id}`} className="flex items-center space-x-2 hover:text-primary-400 transition">
            <ChevronLeft className="w-6 h-6" />
            <span>Voltar</span>
          </Link>

          <div className="flex-1 text-center px-4">
            <h2 className="font-semibold truncate">{chapter.manga.title}</h2>
            <p className="text-sm text-gray-400">
              Cap. {chapter.chapterNumber} - {chapter.title}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-white/10 rounded-lg transition"
            >
              <Settings className="w-6 h-6" />
            </button>
            <button onClick={toggleFullscreen} className="p-2 hover:bg-white/10 rounded-lg transition">
              {fullscreen ? <X className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
            </button>
            <Link to="/" className="p-2 hover:bg-white/10 rounded-lg transition">
              <Home className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mt-4 mx-auto max-w-2xl bg-black/80 backdrop-blur rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-2">Zoom</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setZoom(Math.max(50, zoom - 10))}
                    className="p-2 hover:bg-white/10 rounded"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <span className="text-sm">{zoom}%</span>
                  <button
                    onClick={() => setZoom(Math.min(200, zoom + 10))}
                    className="p-2 hover:bg-white/10 rounded"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Modo de Leitura</label>
                <select
                  value={readingMode}
                  onChange={(e) => setReadingMode(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm"
                >
                  <option value="single" className="bg-gray-800">Página Única</option>
                  <option value="double" className="bg-gray-800">Página Dupla</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2">Navegação</label>
                <p className="text-xs text-gray-400">
                  Clique esquerda: Voltar<br/>
                  Clique direita: Avançar<br/>
                  Centro: Controles
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Reader */}
      <div 
        className="flex items-center justify-center min-h-screen cursor-pointer"
        onClick={handlePageClick}
      >
        <img
          src={currentImageUrl}
          alt={`Página ${currentPage + 1}`}
          className="max-w-full max-h-screen object-contain select-none"
          style={{ transform: `scale(${zoom / 100})` }}
          draggable="false"
        />
      </div>

      {/* Bottom Controls */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/90 to-transparent p-4 transition-all duration-300 ${
          showControls ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <div className="container mx-auto">
          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            <button
              onClick={previousPage}
              disabled={!hasPrevious}
              className="p-3 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur rounded-lg px-6 py-3">
              <input
                type="number"
                value={currentPage + 1}
                onChange={(e) => {
                  const page = parseInt(e.target.value) - 1;
                  if (page >= 0 && page < chapter.pages.length) {
                    setCurrentPage(page);
                  }
                }}
                className="w-16 bg-transparent text-white text-center focus:outline-none"
                min="1"
                max={chapter.pages.length}
              />
              <span className="text-white">/ {chapter.pages.length}</span>
            </div>

            <button
              onClick={nextPage}
              disabled={!hasNext}
              className="p-3 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="absolute h-full bg-primary-500 transition-all duration-300"
              style={{ width: `${((currentPage + 1) / chapter.pages.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Zones Hint (aparece ao passar o mouse) */}
      {showControls && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="h-full flex">
            <div className="w-[30%] flex items-center justify-center bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity">
              <ChevronLeft className="w-16 h-16 text-white/50" />
            </div>
            <div className="w-[40%]"></div>
            <div className="w-[30%] flex items-center justify-center bg-gradient-to-l from-blue-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity">
              <ChevronRight className="w-16 h-16 text-white/50" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MangaReader;