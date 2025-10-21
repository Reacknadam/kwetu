import styles from './ArticleCard.module.css';

const ArticleCard = ({ article }) => {
  return (
    <div className={styles.card}>
      <img src={article.imageUrl || 'https://via.placeholder.com/400x250'} alt={article.title} />
      <div className={styles.content}>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <a href={`/article/${article.slug}`}>Read More</a>
      </div>
    </div>
  );
};

export default ArticleCard;
