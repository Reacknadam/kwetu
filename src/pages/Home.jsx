import Hero from '../components/Hero';
import ArticleCard from '../components/ArticleCard';
import { useArticles } from '../hooks/useArticles';
import styles from './Home.module.css';

const Home = () => {
  const { articles, loading } = useArticles();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Hero />
      <h2 className={styles.latestArticles}>Latest Articles</h2>
      <div className={styles.articleGrid}>
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Home;
