// src/pages/Category.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';
import ArticleCard from '../components/blog/ArticleCard';
import styles from './Category.module.css';

const Category = () => {
  const { category } = useParams();
  const { getArticles } = useArticles();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const allArticles = await getArticles();
      const filtered = allArticles.filter(art => art.category === category);
      setArticles(filtered);
    };
    fetchArticles();
  }, [category]);

  return (
    <div className={styles.container}>
      <h1>Category: {category}</h1>
      <div className={styles.articlesGrid}>
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Category;
