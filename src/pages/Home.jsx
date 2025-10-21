// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { useArticles } from '../hooks/useArticles';
import ArticleCard from '../components/blog/ArticleCard';
import SkeletonLoader from '../components/common/SkeletonLoader';
import Sidebar from '../components/layout/Sidebar';
import styles from './Home.module.css';

const Home = () => {
  const { loading, error, getArticles } = useArticles();
  const [fetchedArticles, setFetchedArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
        const arts = await getArticles();
        setFetchedArticles(arts);
    };
    fetchArticles();
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>Welcome to Kwetu</h1>
        <p>Your source for the latest news and stories.</p>
      </section>

      <div className={styles.mainContent}>
        <section className={styles.articlesGrid}>
          {loading && Array.from({ length: 6 }).map((_, i) => <SkeletonLoader key={i} />)}
          {error && <p className={styles.error}>{error}</p>}
          {!loading && fetchedArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </section>
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
