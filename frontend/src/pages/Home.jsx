import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import MangaCard from "../components/manga/MangaCard";
import NovelCard from "../components/novel/NovelCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { ArrowRight, TrendingUp, Clock } from "lucide-react";

const Home = () => {
  const [latestMangas, setLatestMangas] = useState([]);
  const [popularMangas, setPopularMangas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [latestNovels, setLatestNovels] = useState([]);
  const [popularNovels, setPopularNovels] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [latestMangas, popularMangas, latestNovels, popularNovels] =
        await Promise.all([
          api.get("/manga?limit=6"),
          api.get("/manga?limit=6&sort=views"),

          api.get("/novel?limit=6"),
          api.get("/novel?limit=6&sort=views"),
        ]);
      // Defina os estados com os dados corretos
      setLatestMangas(latestMangas.data.mangas || []);
      setPopularMangas(popularMangas.data.mangas || []);
      setLatestNovels(latestNovels.data.novels || []);
      setPopularNovels(popularNovels.data.novels || []);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);

      setLatestMangas([]);
      setPopularMangas([]);
      setLatestNovels([]);
      setPopularNovels([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Bem-vindo ao MangaVerse</h1>
          <p className="text-xl mb-8">
            Leia seus mangás e novels favoritos gratuitamente
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/mangas"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Ver Mangás
            </Link>
            <Link
              to="/novels"
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition"
            >
              Ver Novels
            </Link>
          </div>
        </div>
      </section>

      {/* Últimos Mangás */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Clock className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold">Últimos Adicionados</h2>
          </div>
          <Link
            to="/mangas"
            className="flex items-center space-x-1 text-primary-600 hover:underline"
          >
            <span>Ver todos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {latestMangas.map((manga) => (
            <MangaCard key={manga.id} manga={manga} />
          ))}

          {latestNovels.map((novel) => (
            <NovelCard key={novel.id} novel={novel} />
          ))}
        </div>
      </section>

      {/* Mangás Populares */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold">Mais Populares</h2>
          </div>
          <Link
            to="/mangas?sort=views"
            className="flex items-center space-x-1 text-primary-600 hover:underline"
          >
            <span>Ver todos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {popularMangas.map((manga) => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
          {popularNovels.map((novel) => (
            <NovelCard key={novel.id} novel={novel} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
