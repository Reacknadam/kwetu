import React from 'react';

const ShareButtons = ({ article }) => {
  const url = window.location.href;
  const title = article.title;

  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-600 dark:text-gray-400 font-semibold">Partager:</span>
      <a
        href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-kwetu-purple-600 hover:text-kwetu-purple-800 dark:text-kwetu-purple-400 dark:hover:text-kwetu-purple-300 transition-colors duration-300"
      >
        Twitter
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-kwetu-purple-600 hover:text-kwetu-purple-800 dark:text-kwetu-purple-400 dark:hover:text-kwetu-purple-300 transition-colors duration-300"
      >
        Facebook
      </a>
    </div>
  );
};

export default ShareButtons;
