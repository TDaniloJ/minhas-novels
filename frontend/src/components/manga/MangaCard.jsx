import { Link } from 'react-router-dom';
import { Eye, Star } from 'lucide-react';

const MangaCard = ({ manga }) => {
  const imageUrl = `${import.meta.env.VITE_API_URL?.replace('/api', '')}${manga.coverImage}`;

  return (
    <Link to={`/manga/${manga.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Imagem */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
          <img
            src={imageUrl}
            alt={manga.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {/* Status Badge */}
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 text-xs font-semibold rounded ${
              manga.status === 'ONGOING' ? 'bg-green-500 text-white' :
              manga.status === 'COMPLETED' ? 'bg-blue-500 text-white' :
              'bg-yellow-500 text-white'
            }`}>
              {manga.status === 'ONGOING' ? 'Em Andamento' :
               manga.status === 'COMPLETED' ? 'Completo' : 'Hiato'}
            </span>
          </div>
        </div>

        {/* Informações */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-primary-600 transition">
            {manga.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-1">{manga.author}</p>
          
          {/* Gêneros */}
          <div className="flex flex-wrap gap-1 mb-3">
            {manga.genres.slice(0, 3).map((genre, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {genre}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{manga.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{manga.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Último Capítulo */}
          {manga.chapters && manga.chapters.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-600">
                Cap. {manga.chapters[0].chapterNumber} - {manga.chapters[0].title}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MangaCard;