import { Link } from 'react-router-dom';
import { Eye, Star, BookOpen } from 'lucide-react';

const NovelCard = ({ novel }) => {
  const imageUrl = `${import.meta.env.VITE_API_URL?.replace('/api', '')}${novel.coverImage}`;

  return (
    <Link to={`/novel/${novel.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Imagem */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
          <img
            src={imageUrl}
            alt={novel.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 text-xs font-semibold rounded ${
              novel.status === 'ONGOING' ? 'bg-green-500 text-white' :
              novel.status === 'COMPLETED' ? 'bg-blue-500 text-white' :
              'bg-yellow-500 text-white'
            }`}>
              {novel.status === 'ONGOING' ? 'Em Andamento' :
               novel.status === 'COMPLETED' ? 'Completo' : 'Hiato'}
            </span>
          </div>
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 text-xs font-semibold rounded bg-purple-500 text-white">
              Novel
            </span>
          </div>
        </div>

        {/* Informações */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-primary-600 transition">
            {novel.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-1">{novel.author}</p>
          
          {/* Gêneros */}
          <div className="flex flex-wrap gap-1 mb-3">
            {novel.genres.slice(0, 3).map((genre, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {genre}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{novel.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{novel.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Último Capítulo */}
          {novel.chapters && novel.chapters.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-600 flex items-center space-x-1">
                <BookOpen className="w-3 h-3" />
                <span>Cap. {novel.chapters[0].chapterNumber} - {novel.chapters[0].title}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default NovelCard;