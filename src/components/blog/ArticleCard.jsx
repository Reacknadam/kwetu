// src/components/blog/ArticleCard.jsx
import { Link } from 'react-router-dom';
import styles from './ArticleCard.module.css';

const ArticleCard = ({ article }) => {
  // Fonction pour formater la date + heure
  const formatDateWithTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).replace('à', 'à'); // Assure la forme "21 octobre 2025 à 21:55"
  };

  return (
    <Link to={`/article/${article.slug}`} className={styles.card}>
      {article.imageUrl && (
        <img src={article.imageUrl} alt={article.title} className={styles.image} />
      )}
      <div className={styles.content}>
        {article.createdAt && (
          <time className={styles.date}>
            Publié le {formatDateWithTime(article.createdAt)}
          </time>
        )}
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.excerpt}>{article.excerpt}</p>
      </div>
    </Link>
  );
};

export default ArticleCard;