import React from 'react';

const LikeButton = ({ onClick, likes }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    >
      {likes} Likes
    </button>
  );
};

export default LikeButton;
