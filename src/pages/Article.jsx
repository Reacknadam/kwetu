import { useParams } from 'react-router-dom';
import { useArticle } from '../hooks/useArticles';
import styles from './Article.module.css';

const Article = () => {
  const { slug } = useParams();
  const { article, loading } = useArticle(slug);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>Article not found.</div>;
  }

  return (
    <article className={styles.article}>
      <h1>{article.title}</h1>
      <div className={styles.meta}>
        <span>By {article.author}</span>
        <span>{new Date(article.createdAt.seconds * 1000).toLocaleDateString()}</span>
      </div>
      <img src={article.imageUrl} alt={article.title} className={styles.mainImage} />
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
};

export default Article;
