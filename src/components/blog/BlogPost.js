import React from 'react';
import { CalendarIcon, UserIcon, ChatBubbleLeftIcon, ShareIcon } from '@heroicons/react/24/outline';

const BlogPost = ({ post }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Erreur lors du partage:', error);
      }
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* En-tête */}
      <header className="text-center mb-12">
        <div className="flex justify-center space-x-2 mb-6">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center">
            <CalendarIcon className="flex-shrink-0 mr-1.5 h-4 w-4" />
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString()}
            </time>
          </div>

          <div className="flex items-center">
            <UserIcon className="flex-shrink-0 mr-1.5 h-4 w-4" />
            <span>{post.author}</span>
          </div>

          <div className="flex items-center">
            <ChatBubbleLeftIcon className="flex-shrink-0 mr-1.5 h-4 w-4" />
            <span>{post.commentCount} commentaires</span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <ShareIcon className="flex-shrink-0 mr-1.5 h-4 w-4" />
            Partager
          </button>
        </div>
      </header>

      {/* Image à la une */}
      {post.featuredImage && (
        <div className="mb-12">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Contenu */}
      <div
        className="prose prose-indigo max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Section commentaires */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Commentaires</h2>
        
        {/* Formulaire de commentaire */}
        <form className="mb-12">
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
              Votre commentaire
            </label>
            <textarea
              id="comment"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Écrivez votre commentaire..."
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Publier le commentaire
          </button>
        </form>

        {/* Liste des commentaires */}
        <div className="space-y-8">
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={comment.authorAvatar}
                  alt={comment.author}
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{comment.author}</h3>
                  <time className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </time>
                </div>
                <p className="mt-1 text-sm text-gray-700">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export default BlogPost;
