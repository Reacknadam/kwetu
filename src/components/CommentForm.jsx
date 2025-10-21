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
    <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
      <form onSubmit={handleSubmit}>
        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Laisser un commentaire</h3>
        {!user && (
          <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
              Nom
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
            Commentaire
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-kwetu-purple-600 hover:bg-kwetu-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Envoyer
        </button>
      </form>
      {!user && (
        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">ou</p>
          <button
            onClick={handleGoogleSignIn}
            className="mt-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            Se connecter avec Google
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentForm;
