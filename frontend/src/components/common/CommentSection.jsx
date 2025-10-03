import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { MessageSquare, Heart, Reply, Trash2, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const CommentSection = ({ contentType, contentId, chapterId = null }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadComments();
  }, [contentType, contentId, chapterId]);

  const loadComments = async () => {
    try {
      const { data } = await api.get('/comments', {
        params: { contentType, contentId, chapterId },
      });
      setComments(data);
    } catch (error) {
      console.error('Erro ao carregar comentários:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Faça login para comentar');
      navigate('/login');
      return;
    }

    if (!newComment.trim()) return;

    setLoading(true);

    try {
      await api.post('/comments', {
        content: newComment,
        contentType,
        contentId,
        chapterId,
        parentId: replyTo,
      });

      setNewComment('');
      setReplyTo(null);
      loadComments();
      toast.success('Comentário adicionado!');
    } catch (error) {
      console.error('Erro ao comentar:', error);
      toast.error('Erro ao adicionar comentário');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!confirm('Deseja deletar este comentário?')) return;

    try {
      await api.delete(`/comments/${commentId}`);
      loadComments();
      toast.success('Comentário deletado');
    } catch (error) {
      console.error('Erro ao deletar:', error);
      toast.error('Erro ao deletar comentário');
    }
  };

  const handleLike = async (commentId) => {
    try {
      await api.post(`/comments/${commentId}/like`);
      loadComments();
    } catch (error) {
      console.error('Erro ao curtir:', error);
    }
  };

  const Comment = ({ comment, isReply = false }) => (
    <div className={`${isReply ? 'ml-12 mt-4' : 'mb-6'}`}>
      <div className="flex space-x-3">
        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold flex-shrink-0">
          {comment.user.username[0].toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{comment.user.username}</span>
              <span className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
            <button
              onClick={() => handleLike(comment.id)}
              className="flex items-center space-x-1 hover:text-red-500 transition"
            >
              <Heart className="w-4 h-4" />
              <span>{comment.likes}</span>
            </button>
            
            {!isReply && (
              <button
                onClick={() => setReplyTo(comment.id)}
                className="flex items-center space-x-1 hover:text-primary-600 transition"
              >
                <Reply className="w-4 h-4" />
                <span>Responder</span>
              </button>
            )}
            
            {(user?.id === comment.user.id || user?.role === 'ADMIN') && (
              <button
                onClick={() => handleDelete(comment.id)}
                className="flex items-center space-x-1 hover:text-red-500 transition"
              >
                <Trash2 className="w-4 h-4" />
                <span>Deletar</span>
              </button>
            )}
          </div>

          {/* Respostas */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4">
              {comment.replies.map((reply) => (
                <Comment key={reply.id} comment={reply} isReply />
              ))}
            </div>
          )}

          {/* Form de Resposta */}
          {replyTo === comment.id && (
            <form onSubmit={handleSubmit} className="mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escreva sua resposta..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows="3"
              />
              <div className="flex space-x-2 mt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50"
                >
                  Responder
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReplyTo(null);
                    setNewComment('');
                  }}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
        <MessageSquare className="w-6 h-6" />
        <span>Comentários ({comments.length})</span>
      </h3>

      {/* Formulário de novo comentário */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escreva um comentário..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows="4"
          />
          <button
            type="submit"
            disabled={loading || !newComment.trim()}
            className="mt-2 flex items-center space-x-2 btn-primary disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{loading ? 'Enviando...' : 'Comentar'}</span>
          </button>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600">
            <button
              onClick={() => navigate('/login')}
              className="text-primary-600 hover:underline"
            >
              Faça login
            </button>{' '}
            para comentar
          </p>
        </div>
      )}

      {/* Lista de comentários */}
      {comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Nenhum comentário ainda. Seja o primeiro!</p>
        </div>
      ) : (
        <div>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;