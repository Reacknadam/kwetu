import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
          <p className="font-bold">{comment.author}</p>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
