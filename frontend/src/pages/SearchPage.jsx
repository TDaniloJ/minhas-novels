import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import MangaCard from '../components/manga/MangaCard';
import NovelCard from '../components/novel/NovelCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Search, Filter } from 'lucide-react';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    query: searchParams.get('q') || '',
    type: searchParams.get('type') || 'all', // all, manga, novel
    status: searchParams.get('status') || '',
    genres: searchParams.get('genres') || '',
    sortBy: searchParams.get('sort') || 'relevance', // relevance, views, rating, newest
  });

  useEffect(() => {
    if (filters.query) {
      search();
    }
  }, [filters]);

  const search = async () => {
    setLoading(true);
    try {
      const mangaPromise = filters.type !== 'novel'
        ? api.get('/manga', { params: { search: filters.query, status: filters.status, genres: filters.genres } })
        : Promise.resolve({ data: { mangas: [] } });

      const novelPromise = filters.type !== 'manga'
        ? api.get('/novel', { params: { search: filters.query, status: filters.status, genres: filters.genres } })
        : Promise.resolve({ data: { novels: [] } });

      const [mangaRes, novelRes] = await Promise.all([mangaPromise, novelPromise]);

      let combined = [
        ...mangaRes.data.mangas.map(m => ({ ...m, type: 'manga' })),
        ...novelRes.data.novels.map(n => ({ ...n, type: 'novel' })),
      ];

      // Ordenar
      if (filters.sortBy === 'views') {
        combined.sort((a, b) => b.views - a.views);
      } else if (filters.sortBy === 'rating') {
        combined.sort((a, b) => b.rating - a.rating);
      } else if (filters.sortBy === 'newest') {
        combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      setResults(combined);
    } catch (error) {
      console.error('Erro na busca:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    const params = {};
    if (newFilters.query) params.q = newFilters.query;
    if (newFilters.type !== 'all') params.type = newFilters.type;
    if (newFilters.status) params.status = newFilters.status;
    if (newFilters.genres) params.genres = newFilters.genres;
    if (newFilters.sortBy !== 'relevance') params.sort = newFilters.sortBy;
    
    setSearchParams(params);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Buscar</h1>

      {/* Barra de Busca */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={filters.query}
              onChange={(e) => handleFilterChange('query', e.target.value)}
              placeholder="Buscar mangás e novels..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            onClick={search}
            className="btn-primary"
          >
            Buscar
          </button>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-4">
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">Todos</option>
            <option value="manga">Mangás</option>
            <option value="novel">Novels</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Qualquer Status</option>
            <option value="ONGOING">Em Andamento</option>
            <option value="COMPLETED">Completo</option>
            <option value="HIATUS">Hiato</option>
          </select>

          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="relevance">Relevância</option>
            <option value="views">Mais Vistos</option>
            <option value="rating">Melhor Avaliados</option>
            <option value="newest">Mais Recentes</option>
          </select>
        </div>
      </div>

      {/* Resultados */}
      {loading ? (
        <LoadingSpinner />
      ) : results.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">
            {filters.query ? 'Nenhum resultado encontrado' : 'Digite algo para buscar'}
          </p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {results.map((item) => (
              item.type === 'manga' ? (
                <MangaCard key={item.id} manga={item} />
              ) : (
                <NovelCard key={item.id} novel={item} />
              )
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;