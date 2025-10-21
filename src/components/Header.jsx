import React from 'react';

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-kwetu-purple-700 dark:text-kwetu-purple-400">
          Kwetu
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-kwetu-purple-100 dark:bg-kwetu-purple-800 text-kwetu-purple-800 dark:text-kwetu-purple-200 font-bold py-2 px-4 rounded"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
};

export default Header;
