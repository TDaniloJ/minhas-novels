import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Upload, X, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

const AddChapter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [manga, setManga] = useState(null);
  const [formData, setFormData] = useState({
    chapterNumber: '',
    title: '',
  });
  const [pageFiles, setPageFiles] = useState([]);
  const [pagePreviews, setPagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadManga();
  }, [id]);

  const loadManga = async () => {
    try {
      const { data } = await api.get(`/manga/${id}`);
      setManga(data);
      
      // Sugerir próximo número de capítulo
      if (data.chapters && data.chapters.length > 0) {
        const lastChapter = Math.max(...data.chapters.map(c => c.chapterNumber));
        setFormData({ ...formData, chapterNumber: (lastChapter + 1).toString() });
      } else {
        setFormData({ ...formData, chapterNumber: '1' });
      }
    } catch (error) {
      console.error('Erro ao carregar mangá:', error);
      toast.error('Erro ao carregar mangá');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setPageFiles([...pageFiles, ...files]);

    // Criar previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPagePreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePage = (index) => {
    setPageFiles(pageFiles.filter((_, i) => i !== index));
    setPagePreviews(pagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pageFiles.length === 0) {
      toast.error('Adicione pelo menos uma página');
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append('chapterNumber', parseFloat(formData.chapterNumber));
      data.append('title', formData.title);
      
      pageFiles.forEach(file => {
        data.append('pages', file);
      });

      await api.post(`/manga/${id}/chapters`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Capítulo adicionado com sucesso!');
      navigate(`/manga/${id}`);
    } catch (error) {
      console.error('Erro ao adicionar capítulo:', error);
      toast.error(error.response?.data?.error || 'Erro ao adicionar capítulo');
    } finally {
      setLoading(false);
    }
  };

  if (!manga) return <div>Carregando...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Adicionar Capítulo</h1>
        <p className="text-gray-600 mb-8">Mangá: {manga.title}</p>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Número do Capítulo */}
            <div>
              <label className="block text-sm font-medium mb-2">Número do Capítulo *</label>
              <input
                type="number"
                name="chapterNumber"
                value={formData.chapterNumber}
                onChange={handleInputChange}
                step="0.1"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="1"
              />
            </div>

            {/* Título */}
            <div>
              <label className="block text-sm font-medium mb-2">Título do Capítulo *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Ex: O Início"
              />
            </div>
          </div>

          {/* Upload de Páginas */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Páginas do Capítulo * ({pageFiles.length} imagens)
            </label>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <label className="cursor-pointer block text-center">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600">Clique para adicionar páginas</p>
                <p className="text-sm text-gray-500 mt-1">
                  Selecione múltiplas imagens (PNG, JPG)
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFilesChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Preview das Páginas */}
            {pagePreviews.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {pagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Página ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold">Página {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removePage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botões */}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary disabled:opacity-50"
            >
              {loading ? 'Adicionando...' : 'Adicionar Capítulo'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/manga/${id}`)}
              className="btn-secondary"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChapter;