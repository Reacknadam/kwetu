// src/pages/Article.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
  const [copied, setCopied] = useState(false);

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
      setLikes((prev) => prev + 1);
    } else {
      alert('Veuillez vous connecter pour soutenir cet article.');
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = article?.title || 'Article sur Kwetu';
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
        return;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const wordCount = text.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <SkeletonLoader type="article" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className={styles.container}>
        <div className={styles.errorCard}>
          <h2>Article introuvable</h2>
          <p>Cet article n’est pas disponible. Il a peut-être été déplacé ou supprimé.</p>
        </div>
      </div>
    );
  }

  // ✅ Fonction pour formater date + heure au format francophone complet
  const formatPublishedDateTime = (timestamp) => {
    if (!timestamp) return 'Date inconnue';
    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).replace(/\sà\s/, ' à '); // Assure "lundi 21 octobre 2025 à 21:55"
  };

  const readingTime = article.content ? calculateReadingTime(article.content) : 0;
  const publishedDateTime = formatPublishedDateTime(article.createdAt);

  return (
    <>
      <Helmet>
        <title>{article.title} – Kwetu, notre média</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.imageUrl || '/og-image-kwetu.jpg'} />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <article className={styles.container}>
        <header className={styles.header}>
          <div className={styles.badge}>Kwetu, notre média</div>
          <p className={styles.publishedInfo}>
            Publié le {publishedDateTime} • {readingTime} min de lecture
          </p>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.excerpt}>{article.excerpt}</p>
        </header>

        {article.imageUrl && (
          <figure className={styles.heroFigure}>
            <img src={article.imageUrl} alt={article.title} className={styles.heroImage} />
            <figcaption className={styles.imageCaption}>
              Crédit : {article.imageCredit || 'Kwetu'}
            </figcaption>
          </figure>
        )}

        <div className={styles.actionsBar}>
          <button onClick={handleLike} className={styles.likeButton} aria-label="Soutenir cet article">
            ❤️ {likes} soutien{likes !== 1 ? 's' : ''}
          </button>

          <div className={styles.shareGroup}>
            <span>Partager :</span>
            <button onClick={() => handleShare('twitter')} className={styles.shareBtn} aria-label="Partager sur X (Twitter)">
              X
            </button>
            <button onClick={() => handleShare('facebook')} className={styles.shareBtn} aria-label="Partager sur Facebook">
              f
            </button>
            <button onClick={() => handleShare('linkedin')} className={styles.shareBtn} aria-label="Partager sur LinkedIn">
              in
            </button>
            <button onClick={() => handleShare('copy')} className={styles.shareBtn} aria-label="Copier le lien">
              {copied ? '✓' : '🔗'}
            </button>
          </div>
        </div>

        <div className={styles.adPlaceholder}>Espace publicitaire – Soutenez notre indépendance</div>

        <div className={styles.content} dangerouslySetInnerHTML={{ __html: article.content }} />

        <div className={styles.adPlaceholder}>Espace publicitaire – Pour une information libre</div>

        <footer className={styles.articleFooter}>
          <p>
            <strong>Kwetu, notre média</strong> — Une information au service du citoyen, pour une RDC éclairée, unie et prospère.
          </p>
        </footer>

        <Comments articleSlug={slug} />
      </article>
    </>
  );
};

export default Article;