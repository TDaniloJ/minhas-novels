import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import api from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import CommentSection from '../components/common/CommentSection';
import { 
  ChevronLeft, ChevronRight, List, Home, Settings, 
  Type, AlignLeft, Moon, Sun, Minus, Plus
} from 'lucide-react';
import toast from 'react-hot-toast';

const NovelReader = () => {
  const { id, chapterId } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef(null);
  
  const [chapter, setChapter] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  
  const { saveProgress } = useProgress('NOVEL', id, chapterId);
  
  const [settings, setSettings] = useState({
    fontSize: parseInt(localStorage.getItem('novel_fontSize') || '18'),
    lineHeight: parseFloat(localStorage.getItem('novel_lineHeight') || '1.8'),
    fontFamily: localStorage.getItem('novel_fontFamily') || 'serif',
    theme: localStorage.getItem('novel_theme') || 'light',
    maxWidth: localStorage.getItem('novel_maxWidth') || '800px',
  });

  const themes = {
    light: { bg: '#ffffff', text: '#000000' },
    sepia: { bg: '#f5f5dc', text: '#2c2416' },
    dark: { bg: '#1a1a1a', text: '#e0e0e0' },
    night: { bg: '#0d1117', text: '#c9d1d9' },
  };

  useEffect(() => {
    loadChapter();
    loadChapterList();
  }, [chapterId]);

  useEffect(() => {
    // Salvar configurações
    Object.keys(settings).forEach(key => {
      localStorage.setItem(`novel_${key}`, settings[key]);
    });
  }, [settings]);

  useEffect(() => {
    // Tracking de scroll
    const handleScroll = () => {
      if (contentRef.current) {
        const element = contentRef.current;
        const scrollPercentage = Math.round(
          (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100
        );
        if (scrollPercentage > 0 && scrollPercentage <= 100) {
          saveProgress(scrollPercentage);
        }
      }
    };

    const content = contentRef.current;
    if (content) {
      content.addEventListener('scroll', handleScroll);
      return () => content.removeEventListener('scroll', handleScroll);
    }
  }, [chapter]);

  const loadChapter = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/novel/chapter/${chapterId}`);
      setChapter(data);
    } catch (error) {
      console.error('Erro ao carregar capítulo:', error);
      toast.error('Erro ao carregar capítulo');
    } finally {
      setLoading(false);
    }
  };

  const loadChapterList = async () => {
    try {
      const { data } = await api.get(`/novel/${id}`);
      setChapters(data.chapters);
    } catch (error) {
      console.error('Erro ao carregar lista:', error);
    }
  };

  const getCurrentIndex = () => {
    return chapters.findIndex(c => c.id === chapterId);
  };

  const goToPrevious = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex > 0) {
      navigate(`/novel/${id}/chapter/${chapters[currentIndex - 1].id}`);
    }
  };

  const goToNext = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex < chapters.length - 1) {
      navigate(`/novel/${id}/chapter/${chapters[currentIndex + 1].id}`);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!chapter) return <div className="text-center py-12">Capítulo não encontrado</div>;

  const currentIndex = getCurrentIndex();
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < chapters.length - 1;
  const currentTheme = themes[settings.theme];

  return (
    <div 
      style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
      className="min-h-screen"
    >
      {/* Header */}
      <div 
        className="sticky top-0 z-50 shadow-md"
        style={{ backgroundColor: currentTheme.bg, borderBottom: `1px solid ${settings.theme === 'dark' || settings.theme === 'night' ? '#333' : '#e5e7eb'}` }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to={`/novel/${id}`} 
              className="flex items-center space-x-2 hover:opacity-70 transition"
            >
              <ChevronLeft className="w-6 h-6" />
              <span>Voltar</span>
            </Link>

            <div className="flex-1 text-center px-4">
              <h2 className="font-semibold truncate">{chapter.novel.title}</h2>
              <p className="text-sm opacity-70">
                Cap. {chapter.chapterNumber} - {chapter.title}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
              >
                <Settings className="w-6 h-6" />
              </button>
              <Link 
                to="/"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
              >
                <Home className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: settings.theme === 'light' ? '#f9fafb' : '#2d2d2d' }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Tamanho da Fonte */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Type className="w-4 h-4 inline mr-1" />
                    Tamanho da Fonte
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSettings({...settings, fontSize: Math.max(14, settings.fontSize - 2)})}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm w-12 text-center">{settings.fontSize}px</span>
                    <button
                      onClick={() => setSettings({...settings, fontSize: Math.min(28, settings.fontSize + 2)})}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Espaçamento */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <AlignLeft className="w-4 h-4 inline mr-1" />
                    Espaçamento
                  </label>
                  <select
                    value={settings.lineHeight}
                    onChange={(e) => setSettings({...settings, lineHeight: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border rounded-lg"
                    style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
                  >
                    <option value="1.4">Compacto</option>
                    <option value="1.6">Normal</option>
                    <option value="1.8">Confortável</option>
                    <option value="2.0">Espaçoso</option>
                  </select>
                </div>

                {/* Fonte */}
                <div>
                  <label className="block text-sm font-medium mb-2">Fonte</label>
                  <select
                    value={settings.fontFamily}
                    onChange={(e) => setSettings({...settings, fontFamily: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
                  >
                    <option value="serif">Serif</option>
                    <option value="sans-serif">Sans-serif</option>
                    <option value="'Georgia', serif">Georgia</option>
                    <option value="'Arial', sans-serif">Arial</option>
                  </select>
                </div>
              </div>

              {/* Temas */}
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Tema</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSettings({...settings, theme: 'light'})}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${settings.theme === 'light' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
                  >
                    <Sun className="w-4 h-4" />
                    <span>Claro</span>
                  </button>
                  <button
                    onClick={() => setSettings({...settings, theme: 'sepia'})}
                    className={`px-4 py-2 rounded-lg ${settings.theme === 'sepia' ? 'bg-primary-600 text-white' : 'bg-[#f5f5dc] text-gray-800'}`}
                  >
                    Sépia
                  </button>
                  <button
                    onClick={() => setSettings({...settings, theme: 'dark'})}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${settings.theme === 'dark' ? 'bg-primary-600 text-white' : 'bg-gray-700 text-white'}`}
                  >
                    <Moon className="w-4 h-4" />
                    <span>Escuro</span>
                  </button>
                  <button
                    onClick={() => setSettings({...settings, theme: 'night'})}
                    className={`px-4 py-2 rounded-lg ${settings.theme === 'night' ? 'bg-primary-600 text-white' : 'bg-black text-white'}`}
                  >
                    Noite
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div 
        ref={contentRef}
        className="container mx-auto px-4 py-8 overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
      >
        <article
          className="prose prose-lg max-w-none mx-auto"
          style={{
            fontSize: `${settings.fontSize}px`,
            lineHeight: settings.lineHeight,
            fontFamily: settings.fontFamily,
            maxWidth: settings.maxWidth,
            color: currentTheme.text,
          }}
          dangerouslySetInnerHTML={{ __html: chapter.content }}
        />

        {/* Navegação */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t" style={{ borderColor: settings.theme === 'dark' || settings.theme === 'night' ? '#333' : '#e5e7eb' }}>
          <button
            onClick={goToPrevious}
            disabled={!hasPrevious}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
            style={{ backgroundColor: hasPrevious ? (settings.theme === 'dark' || settings.theme === 'night' ? '#333' : '#e5e7eb') : 'transparent' }}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Anterior</span>
          </button>

          <Link 
            to={`/novel/${id}`}
            className="p-3 rounded-lg transition"
            style={{ backgroundColor: settings.theme === 'dark' || settings.theme === 'night' ? '#333' : '#e5e7eb' }}
          >
            <List className="w-5 h-5" />
          </Link>

          <button
            onClick={goToNext}
            disabled={!hasNext}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
            style={{ backgroundColor: hasNext ? (settings.theme === 'dark' || settings.theme === 'night' ? '#333' : '#e5e7eb') : 'transparent' }}
          >
            <span>Próximo</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Comentários */}
        <div className="mt-12">
          <CommentSection 
            contentType="NOVEL" 
            contentId={id} 
            chapterId={chapterId} 
          />
        </div>
      </div>
    </div>
  );
};

export default NovelReader;