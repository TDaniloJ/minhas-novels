import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import MangaCard from '../components/manga/MangaCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Filter } from 'lucide-react';

const MangaList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  
  const [filters, setFilters] = useState({
    status: searchParams.get('status') || '',
    genres: searchParams.get('genres') || '',
    search: searchParams.get('search') || '',
  });

  const genres = [
    'Ação', 'Aventura', 'Comédia', 'Drama', 'Fantasia', 
    'Romance', 'Ficção Científica', 'Mistério', 'Horror', 'Shounen',
    'Seinen', 'Shoujo', 'Slice of Life'
  ];

  useEffect(() => {
    loadMangas();
  }, [searchParams]);

  const loadMangas = async () => {
    try {
      setLoading(true);
      const page = searchParams.get('page') || 1;
      const { data } = await api.get('/manga', {
        params: {
          page,
          limit: 12,
          status: filters.status,
          genres: filters.genres,
          search: filters.search,
        },
      });
      setMangas(data.mangas);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Erro ao carregar mangás:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    const params = {};
    if (newFilters.status) params.status = newFilters.status;
    if (newFilters.genres) params.genres = newFilters.genres;
    if (newFilters.search) params.search = newFilters.search;
    
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    const params = Object.fromEntries(searchParams);
    params.page = page;
    setSearchParams(params);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mangás</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filtros */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="w-5 h-5" />
              <h2 className="font-semibold text-lg">Filtros</h2>
            </div>

            {/* Status */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Todos</option>
                <option value="ONGOING">Em Andamento</option>
                <option value="COMPLETED">Completo</option>
                <option value="HIATUS">Hiato</option>
              </select>
            </div>

            {/* Gêneros */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Gêneros</label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {genres.map((genre) => (
                  <label key={genre} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.genres.includes(genre)}
                      onChange={(e) => {
                        const currentGenres = filters.genres.split(',').filter(g => g);
                        if (e.target.checked) {
                          currentGenres.push(genre);
                        } else {
                          const index = currentGenres.indexOf(genre);
                          if (index > -1) currentGenres.splice(index, 1);
                        }
                        handleFilterChange('genres', currentGenres.join(','));
                      }}
                      className="rounded text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm">{genre}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Limpar Filtros */}
            <button
              onClick={() => {
                setFilters({ status: '', genres: '', search: '' });
                setSearchParams({});
              }}
              className="w-full btn-secondary"
            >
              Limpar Filtros
            </button>
          </div>
        </aside>

        {/* Lista de Mangás */}
        <main className="lg:col-span-3">
          {loading ? (
            <LoadingSpinner />
          ) : mangas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Nenhum mangá encontrado</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mangas.map((manga) => (
                  <MangaCard key={manga.id} manga={manga} />
                ))}
              </div>

              {/* Paginação */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center space-x-2 mt-8">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg ${
                        page === pagination.page
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default MangaList;