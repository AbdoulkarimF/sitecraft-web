import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, UserIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

const BlogList = ({ posts }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            {post.featuredImage && (
              <Link to={`/blog/${post.slug}`} className="block aspect-w-16 aspect-h-9">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </Link>
            )}
            
            <div className="p-6">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Titre */}
              <Link
                to={`/blog/${post.slug}`}
                className="block mt-2 text-xl font-semibold text-gray-900 hover:text-indigo-600"
              >
                {post.title}
              </Link>

              {/* Extrait */}
              <p className="mt-3 text-base text-gray-500 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Métadonnées */}
              <div className="mt-6 flex items-center space-x-4 text-sm text-gray-500">
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
              </div>

              {/* Lien "Lire la suite" */}
              <div className="mt-6">
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Lire la suite
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
