// src/pages/Article.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useArticles } from '../hooks/useArticles';
import { useLikes } from '../hooks/useLikes';
import { useAuth } from '../contexts/AuthContext';
import SkeletonLoader from '../components/common/SkeletonLoader';
import Comments from '../components/blog/Comments';
import styles from './Article.module.css';

const Article = () => {
  const { slug } = useParams();
  const { getArticleBySlug, loading, error } = useArticles();
  const { getLikes, addLike } = useLikes();
  const { currentUser } = useAuth();
  const [article, setArticle] = useState(null);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchArticle = async () => {
      const art = await getArticleBySlug(slug);
      setArticle(art);
      if (art) {
        const numLikes = await getLikes(slug);
        setLikes(numLikes);
      }
    };
    fetchArticle();
  }, [slug]);

  const handleLike = async () => {
    if (currentUser) {
      await addLike(slug, currentUser.uid);
      setLikes(prev => prev + 1);
    } else {
      // Prompt user to log in
      alert("Please log in to like articles.");
    }
  };

  if (loading) {
    return <div className={styles.container}><SkeletonLoader type="article" /></div>;
  }
  if (error || !article) {
    return <div className={styles.container}><p>Article not found.</p></div>;
  }

  return (
    <>
      <Helmet>
        <title>{article.title} - Kwetu</title>
        <meta name="description" content={article.excerpt} />
        {/* ... other meta tags ... */}
      </Helmet>
      <div className={styles.container}>
        <h1>{article.title}</h1>
        <img src={article.imageUrl} alt={article.title} className={styles.heroImage} />

        <div className={styles.actions}>
          <button onClick={handleLike} className={styles.likeButton}>Like</button>
          <span>{likes} Likes</span>
        </div>

        <div className={styles.adPlaceholder}>Ad goes here</div>

        <div className={styles.content} dangerouslySetInnerHTML={{ __html: article.content }} />

        <div className={styles.adPlaceholder}>Ad goes here</div>

        <Comments articleSlug={slug} />
      </div>
    </>
  );
};

export default Article;
