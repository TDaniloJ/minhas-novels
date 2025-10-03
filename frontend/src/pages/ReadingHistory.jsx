import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Clock, BookOpen, Book } from 'lucide-react';

const ReadingHistory = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/progress/history');
      setHistory(data);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Faça login para ver seu histórico de leitura</p>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center space-x-2">
        <Clock className="w-8 h-8" />
        <span>Histórico de Leitura</span>
      </h1>

      {history.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-600">Seu histórico de leitura aparecerá aqui</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => {
            const content = item.manga || item.novel;
            const chapter = item.mangaChapter || item.novelChapter;
            const type = item.contentType;

            return (
              <Link
                key={item.id}
                to={type === 'MANGA' ? `/manga/${content.id}` : `/novel/${content.id}`}
                className="flex items-center space-x-4 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
              >
                <img
                  src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${content.coverImage}`}
                  alt={content.title}
                  className="w-20 h-28 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {type === 'MANGA' ? (
                      <BookOpen className="w-4 h-4 text-primary-600" />
                    ) : (
                      <Book className="w-4 h-4 text-purple-600" />
                    )}
                    <span className="text-xs text-gray-600">{type}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{content.title}</h3>
                  {chapter && (
                    <p className="text-sm text-gray-600">
                      Capítulo {chapter.chapterNumber} - {chapter.title}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Lido em {new Date(item.lastReadAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  {item.progress > 0 && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{item.progress}% completo</p>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <Link
                    to={
                      type === 'MANGA'
                        ? `/manga/${content.id}/chapter/${chapter.id}`
                        : `/novel/${content.id}/chapter/${chapter.id}`
                    }
                    className="btn-primary text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Continuar
                  </Link>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReadingHistory;