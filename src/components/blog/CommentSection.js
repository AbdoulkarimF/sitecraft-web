import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const CommentSection = ({ postId, comments: initialComments = [] }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Erreur lors du chargement des commentaires:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        },
        body: JSON.stringify({
          content: newComment,
          author: currentUser.id
        })
      });

      const data = await response.json();
      setComments([...comments, data]);
      setNewComment('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await fetch(`/api/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${currentUser.token}`
        }
      });

      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire:', error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Commentaires ({comments.length})</h3>

      {/* Liste des commentaires */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-medium">
                    {comment.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{comment.author.name}</div>
                  <div className="text-sm text-gray-500">
                    {formatDate(comment.createdAt)}
                  </div>
                </div>
              </div>
              {currentUser?.id === comment.author.id && (
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <span className="sr-only">Supprimer</span>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>
            <p className="mt-2 text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>

      {/* Formulaire de nouveau commentaire */}
      {currentUser ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="comment" className="sr-only">
              Votre commentaire
            </label>
            <textarea
              id="comment"
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading || !newComment.trim()}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                isLoading || !newComment.trim()
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isLoading ? 'Envoi...' : 'Publier'}
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center py-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            Connectez-vous pour ajouter un commentaire
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
