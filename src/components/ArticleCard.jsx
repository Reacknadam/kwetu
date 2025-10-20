import React from 'react';

const ArticleCard = ({ article }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{article.date}</p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{article.excerpt}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-gray-600 dark:text-gray-400 mr-2">{article.likes} Likes</span>
          <span className="text-gray-600 dark:text-gray-400">{article.commentCount} Comments</span>
        </div>
        <a href={`/article/${article.slug}`} className="text-blue-500 hover:underline">Read More</a>
      </div>
    </div>
  );
};

export default ArticleCard;
