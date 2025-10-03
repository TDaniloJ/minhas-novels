import { BookOpen, Github, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 text-white font-bold text-xl mb-4">
              <BookOpen className="w-8 h-8" />
              <span>MangaVerse</span>
            </div>
            <p className="text-sm">
              Sua plataforma favorita para ler mangás e novels online gratuitamente.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold text-white mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/mangas" className="hover:text-white transition">
                  Mangás
                </Link>
              </li>
              <li>
                <Link to="/novels" className="hover:text-white transition">
                  Novels
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  Sobre
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="font-semibold text-white mb-4">Categorias</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/mangas?genre=Ação" className="hover:text-white transition">
                  Ação
                </Link>
              </li>
              <li>
                <Link to="/mangas?genre=Romance" className="hover:text-white transition">
                  Romance
                </Link>
              </li>
              <li>
                <Link to="/mangas?genre=Fantasia" className="hover:text-white transition">
                  Fantasia
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="font-semibold text-white mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white transition">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white transition">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>&copy; 2025 MangaVerse. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;