import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const StarRating = ({ contentType, contentId, currentRating = 0 }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    setRating(currentRating);
    if (user) {
      loadUserRating();
    }
  }, [currentRating, user]);

  const loadUserRating = async () => {
    try {
      const { data } = await api.get('/ratings/user', {
        params: { contentType, contentId },
      });
      setUserRating(data.rating);
    } catch (error) {
      console.error('Erro ao carregar avaliação:', error);
    }
  };

  const handleRate = async (value) => {
    if (!user) {
      toast.error('Faça login para avaliar');
      navigate('/login');
      return;
    }

    try {
      const { data } = await api.post('/ratings', {
        contentType,
        contentId,
        rating: value,
      });
      setUserRating(value);
      setRating(data.averageRating);
      toast.success('Avaliação enviada!');
    } catch (error) {
      console.error('Erro ao avaliar:', error);
      toast.error('Erro ao enviar avaliação');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              className={`w-6 h-6 ${
                star <= (hover || userRating || rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
      <span className="text-sm font-semibold text-gray-700">
        {rating.toFixed(1)} ({userRating > 0 ? `Você: ${userRating}` : 'Avalie'})
      </span>
    </div>
  );
};

export default StarRating;