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
    includeScore: true
  };

  const { query, setQuery, results } = useSearch(articles, searchOptions);

  return (
    <div className={styles.container}>
      <h1>Search Articles</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for articles..."
        className={styles.searchInput}
      />
      <div className={styles.resultsGrid}>
        {results.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Search;
