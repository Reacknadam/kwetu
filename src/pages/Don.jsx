// src/pages/Don.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Don.module.css';

const Don = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirection immédiate vers la boutique
    window.location.href = 'https://brwqjjmk.mychariow.shop/israel-ltd';
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p>Redirection vers la plateforme de dons...</p>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        ← Retour
      </button>
    </div>
  );
};

export default Don;