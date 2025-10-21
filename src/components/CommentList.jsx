import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Commentaires</h3>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
            <p className="font-bold text-kwetu-purple-700 dark:text-kwetu-purple-400">{comment.author}</p>
            <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400">Aucun commentaire pour le moment.</p>
      )}
    </div>
  );
};

export default CommentList;
