import React from 'react';
import ArticleCard from '../components/ArticleCard';
import useArticles from '../hooks/useArticles';

const Home = () => {
  const { articles, loading, error } = useArticles();

  if (loading) {
    return <div className="text-center mt-10">Chargement des articles...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Erreur: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          Bienvenue sur <span className="text-kwetu-purple-700 dark:text-kwetu-purple-500">Kwetu</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Le portail des informaticiens de Kananga.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Home;
