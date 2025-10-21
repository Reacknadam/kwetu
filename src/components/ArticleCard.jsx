import React from 'react';

const ArticleCard = ({ article }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">{article.title}</h2>
        <p className="text-kwetu-purple-600 dark:text-kwetu-purple-400 text-sm mb-4">{article.date}</p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{article.excerpt}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-4">{article.likes} Likes</span>
            <span>{article.commentCount} Comments</span>
          </div>
          <a href={`/article/${article.slug}`} className="text-kwetu-purple-700 dark:text-kwetu-purple-400 font-semibold hover:underline">
            Lire la suite &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
