import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const EditManga = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [manga, setManga] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    status: 'ONGOING',
    genres: [],
  });

  const [coverPreview, setCoverPreview] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const availableGenres = [
    'Ação', 'Aventura', 'Comédia', 'Drama', 'Fantasia', 
    'Romance', 'Ficção Científica', 'Mistério', 'Horror', 'Shounen',
    'Seinen', 'Shoujo', 'Slice of Life'
  ];

  useEffect(() => {
    loadManga();
  }, [id]);

  const loadManga = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/manga/${id}`);
      setManga(data);
      setFormData({
        title: data.title,
        description: data.description,
        author: data.author,
        status: data.status,
        genres: data.genres,
      });
      setCoverPreview(`${import.meta.env.VITE_API_URL?.replace('/api', '')}${data.coverImage}`);
    } catch (error) {
      console.error('Erro ao carregar mangá:', error);
      toast.error('Erro ao carregar mangá');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addGenre = (genre) => {
    if (!formData.genres.includes(genre)) {
      setFormData({ ...formData, genres: [...formData.genres, genre] });
    }
  };

  const removeGenre = (genre) => {
    setFormData({
      ...formData,
      genres: formData.genres.filter(g => g !== genre)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = new FormData();
      if (coverFile) {
        data.append('cover', coverFile);
      }
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('author', formData.author);
      data.append('status', formData.status);
      data.append('genres', JSON.stringify(formData.genres));

      await api.put(`/manga/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Mangá atualizado com sucesso!');
      navigate(`/manga/${id}`);
    } catch (error) {
      console.error('Erro ao atualizar mangá:', error);
      toast.error(error.response?.data?.error || 'Erro ao atualizar mangá');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Editar Mangá</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Capa */}
          <div>
            <label className="block text-sm font-medium mb-2">Imagem de Capa</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              {coverPreview ? (
                <div className="relative inline-block">
                  <img src={coverPreview} alt="Preview" className="max-h-64 rounded-lg" />
                  <button
                    type="button"
                    onClick={() => {
                      setCoverPreview(null);
                      setCoverFile(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">Clique para trocar a capa</p>
                  <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Título *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="ONGOING">Em Andamento</option>
              <option value="COMPLETED">Completo</option>
              <option value="HIATUS">Hiato</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Gêneros *</label>
            {formData.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.genres.map((genre) => (
                  <span key={genre} className="flex items-center space-x-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                    <span>{genre}</span>
                    <button type="button" onClick={() => removeGenre(genre)} className="hover:text-red-600">
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {availableGenres.filter(g => !formData.genres.includes(g)).map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => addGenre(genre)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-primary-100 hover:text-primary-700 transition"
                >
                  + {genre}
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <button type="submit" disabled={saving} className="flex-1 btn-primary disabled:opacity-50">
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
            <button type="button" onClick={() => navigate(`/manga/${id}`)} className="btn-secondary">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditManga;