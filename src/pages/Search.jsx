// src/pages/Search.jsx
import { useEffect, useState } from 'react';
import { useArticles } from '../hooks/useArticles';
import { useSearch } from '../hooks/useSearch';
import ArticleCard from '../components/blog/ArticleCard';
import styles from './Search.module.css';

const Search = () => {
  const { getArticles } = useArticles();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const allArticles = await getArticles();
      setArticles(allArticles);
    };
    fetchArticles();
  }, []);

  const searchOptions = {
    keys: ['title', 'excerpt', 'tags'],
    includeScore: true,
    threshold: 0.3,
  };

  const { query, setQuery, results } = useSearch(articles, searchOptions);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Rechercher dans Kwetu</h1>
        <p className={styles.subtitle}>
          Trouvez les articles qui vous intéressent parmi nos publications.
        </p>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ex. : élections, culture congolaise, économie..."
        className={styles.searchInput}
        autoFocus
      />

      {query && (
        <p className={styles.resultCount}>
          {results.length > 0
            ? `${results.length} résultat${results.length > 1 ? 's' : ''} pour "${query}"`
            : `Aucun résultat trouvé pour "${query}"`}
        </p>
      )}

      {results.length > 0 && (
        <div className={styles.resultsGrid}>
          {results.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <div className={styles.noResults}>
          <p>Essayez d’autres mots-clés ou explorez nos catégories.</p>
        </div>
      )}
    </div>
  );
};

export default Search;