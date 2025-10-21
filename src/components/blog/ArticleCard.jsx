// src/components/blog/ArticleCard.jsx
import { Link } from 'react-router-dom';
import styles from './ArticleCard.module.css';

const ArticleCard = ({ article }) => {
  return (
    <Link to={`/article/${article.slug}`} className={styles.card}>
      <img src={article.imageUrl} alt={article.title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.excerpt}>{article.excerpt}</p>
      </div>
    </Link>
  );
};

export default ArticleCard;
