import React from 'react';

const ShareButtons = ({ article }) => {
  const url = window.location.href;
  const title = article.title;

  return (
    <div className="flex items-center space-x-4 mt-4">
      <span>Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Twitter
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Facebook
      </a>
    </div>
  );
};

export default ShareButtons;
