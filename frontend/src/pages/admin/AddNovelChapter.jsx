import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import NovelEditor from '../../components/novel/NovelEditor';
import toast from 'react-hot-toast';

const AddNovelChapter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [novel, setNovel] = useState(null);
  const [formData, setFormData] = useState({
    chapterNumber: '',
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNovel();
  }, [id]);

  const loadNovel = async () => {
    try {
      const { data } = await api.get(`/novel/${id}`);
      setNovel(data);
      
      if (data.chapters && data.chapters.length > 0) {
        const lastChapter = Math.max(...data.chapters.map(c => c.chapterNumber));
        setFormData({ ...formData, chapterNumber: (lastChapter + 1).toString() });
      } else {
        setFormData({ ...formData, chapterNumber: '1' });
      }
    } catch (error) {
      console.error('Erro ao carregar novel:', error);
      toast.error('Erro ao carregar novel');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (content) => {
    setFormData({ ...formData, content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.content || formData.content.trim() === '') {
      toast.error('O conteúdo do capítulo não pode estar vazio');
      return;
    }

    setLoading(true);

    try {
      await api.post(`/novel/${id}/chapters`, {
        chapterNumber: parseFloat(formData.chapterNumber),
        title: formData.title,
        content: formData.content,
      });

      toast.success('Capítulo adicionado com sucesso!');
      navigate(`/novel/${id}`);
    } catch (error) {
      console.error('Erro ao adicionar capítulo:', error);
      toast.error(error.response?.data?.error || 'Erro ao adicionar capítulo');
    } finally {
      setLoading(false);
    }
  };

  if (!novel) return <div>Carregando...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Adicionar Capítulo</h1>
        <p className="text-gray-600 mb-8">Novel: {novel.title}</p>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
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
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Título do Capítulo *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Conteúdo do Capítulo *</label>
            <NovelEditor value={formData.content} onChange={handleContentChange} />
          </div>

          <div className="flex space-x-4">
            <button type="submit" disabled={loading} className="flex-1 btn-primary disabled:opacity-50">
              {loading ? 'Adicionando...' : 'Adicionar Capítulo'}
            </button>
            <button type="button" onClick={() => navigate(`/novel/${id}`)} className="btn-secondary">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNovelChapter;