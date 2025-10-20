import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import useAuth from '../hooks/useAuth';

const CommentForm = ({ onSubmit }) => {
  const { user } = useAuth();
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ author: user ? user.displayName : author, text });
    setAuthor('');
    setText('');
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit}>
        <h3 className="text-xl font-bold mb-4">Leave a Comment</h3>
        {!user && (
          <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
            Comment
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      {!user && (
        <div className="mt-4">
          <p>Or</p>
          <button
            onClick={handleGoogleSignIn}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentForm;
