import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import MangaCard from '../components/manga/MangaCard';
import NovelCard from '../components/novel/NovelCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { ArrowRight, TrendingUp, Clock, BookOpen, Book, Star, Sparkles } from 'lucide-react';

const Home = () => {
  const [latest, setLatest] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [latestMangas, popularMangas, latestNovels, popularNovels, topManga, topNovel] = await Promise.all([
        api.get('/manga?limit=6'),
        api.get('/manga?limit=6&sort=views'),
        api.get('/novel?limit=6'),
        api.get('/novel?limit=6&sort=views'),
        api.get('/manga?limit=6&sort=rating'),
        api.get('/novel?limit=6&sort=rating'),
      ]);

      // Combinar mangás e novels para criar uma lista mista
      const latestContent = [
        ...(latestMangas.data.mangas || []).map(m => ({ ...m, type: 'manga' })),
        ...(latestNovels.data.novels || []).map(n => ({ ...n, type: 'novel' })),
      ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 12);

      const popularContent = [
        ...(popularMangas.data.mangas || []).map(m => ({ ...m, type: 'manga' })),
        ...(popularNovels.data.novels || []).map(n => ({ ...n, type: 'novel' })),
      ].sort((a, b) => b.views - a.views).slice(0, 12);

      const topRatedContent = [
        ...(topManga.data.mangas || []).map(m => ({ ...m, type: 'manga' })),
        ...(topNovel.data.novels || []).map(n => ({ ...n, type: 'novel' })),
      ].sort((a, b) => b.rating - a.rating).slice(0, 12);

      setLatest(latestContent);
      setPopular(popularContent);
      setTopRated(topRatedContent);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setLatest([]);
      setPopular([]);
      setTopRated([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">Bem-vindo ao MangaVerse</h1>
          <p className="text-xl mb-8 opacity-90">
            Leia seus mangás e novels favoritos gratuitamente
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/mangas"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 flex items-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>Ver Mangás</span>
            </Link>
            <Link
              to="/novels"
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition transform hover:scale-105 flex items-center space-x-2"
            >
              <Book className="w-5 h-5" />
              <span>Ver Novels</span>
            </Link>
            <Link
              to="/search"
              className="bg-white/20 backdrop-blur px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition transform hover:scale-105"
            >
              Buscar
            </Link>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-blue-500" />
            <h3 className="text-3xl font-bold mb-1">{latest.filter(c => c.type === 'manga').length}</h3>
            <p className="text-gray-600 dark:text-gray-400">Mangás Disponíveis</p>
          </div>
          <div className="card p-6 text-center">
            <Book className="w-12 h-12 mx-auto mb-3 text-purple-500" />
            <h3 className="text-3xl font-bold mb-1">{latest.filter(c => c.type === 'novel').length}</h3>
            <p className="text-gray-600 dark:text-gray-400">Novels Disponíveis</p>
          </div>
          <div className="card p-6 text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
            <h3 className="text-3xl font-bold mb-1">{latest.length}</h3>
            <p className="text-gray-600 dark:text-gray-400">Conteúdo Total</p>
          </div>
        </div>
      </section>

      {/* Últimos Adicionados */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Clock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold">Últimos Adicionados</h2>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/mangas"
              className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:underline"
            >
              <span>Ver Mangás</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/novels"
              className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:underline"
            >
              <span>Ver Novels</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {latest.map((content) => (
            content.type === 'manga' ? (
              <MangaCard key={content.id} manga={content} />
            ) : (
              <NovelCard key={content.id} novel={content} />
            )
          ))}
        </div>
      </section>

      {/* Mais Populares */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold">Mais Populares</h2>
          </div>
          <Link
            to="/search?sort=views"
            className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:underline"
          >
            <span>Ver todos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {popular.map((content) => (
            content.type === 'manga' ? (
              <MangaCard key={content.id} manga={content} />
            ) : (
              <NovelCard key={content.id} novel={content} />
            )
          ))}
        </div>
      </section>

      {/* Melhor Avaliados */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            <h2 className="text-2xl font-bold">Melhor Avaliados</h2>
          </div>
          <Link
            to="/search?sort=rating"
            className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:underline"
          >
            <span>Ver todos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {topRated.map((content) => (
            content.type === 'manga' ? (
              <MangaCard key={content.id} manga={content} />
            ) : (
              <NovelCard key={content.id} novel={content} />
            )
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 mb-12">
        <div className="card p-12 text-center bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20">
          <h2 className="text-3xl font-bold mb-4">Não encontrou o que procura?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Use nossa busca avançada para encontrar exatamente o que você quer
          </p>
          <Link
            to="/search"
            className="inline-block btn-primary px-8 py-3 text-lg"
          >
            Buscar Agora
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;