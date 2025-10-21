// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
      // Trier du plus récent au plus ancien
      const sorted = arts
        .filter(a => a.createdAt) // garder seulement ceux avec une date
        .sort((a, b) => {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
          return dateB - dateA;
        });
      setFetchedArticles(sorted);
    };
    fetchArticles();
  }, []);

  return (
    <div className={styles.container}>
      {/* Hero Section – Editorial Identity */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Kwetu, notre média, notre voix</h1>
          <p className={styles.heroSubtitle}>
            L’actualité kasaienne racontée avec rigueur, proximité et indépendance.<br />
            Parce que chaque citoyen a le droit à une information juste et vérifiée.
          </p>
        </div>
      </section>

      {/* Citizen Contribution Banner */}
      <div className={styles.contributionBanner}>
        <div className={styles.bannerContent}>
          <h2>Votre voix compte</h2>
          <p>
            Vous avez une information, un témoignage ou une alerte à partager ?<br />
            Envoyez-nous vos documents, photos ou récits. Chaque contribution est examinée avec sérieux.
          </p>
          <Link to="/contact" className={styles.contributeButton}>
            Envoyez-nous une information
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <section className={styles.articlesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Derniers articles</h2>
            <Link to="/search" className={styles.viewAll}>Voir tout</Link>
          </div>

          {loading && (
            <div className={styles.skeletonGrid}>
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonLoader key={i} />
              ))}
            </div>
          )}

          {error && <p className={styles.error}>Impossible de charger les articles. Veuillez réessayer.</p>}

          {!loading && fetchedArticles.length === 0 && (
            <p className={styles.noArticles}>Aucun article n’a été publié pour le moment.</p>
          )}

          {!loading && fetchedArticles.length > 0 && (
            <div className={styles.articlesGrid}>
              {fetchedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </section>

        <Sidebar />
      </div>
    </div>
  );
};

export default Home;