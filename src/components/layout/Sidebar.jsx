// src/components/layout/Sidebar.jsx
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      {/* Categories Widget */}
      <div className={styles.widget}>
        <h3>Catégories</h3>
        <ul>
          <li><Link to="/search?q=Politique">Politique</Link></li>
          <li><Link to="/search?q=Économie">Économie</Link></li>
          <li><Link to="/search?q=Société">Société</Link></li>
          <li><Link to="/search?q=Culture">Culture</Link></li>
          <li><Link to="/search?q=Environnement">Environnement</Link></li>
        </ul>
      </div>

      {/* Newsletter Widget */}
      <div className={styles.widget}>
        <h3>Newsletter</h3>
        <p>Recevez chaque semaine les meilleurs articles de Kwetu.</p>
        <form className={styles.newsletterForm}>
          <input type="email" placeholder="Votre adresse e-mail" required />
          <button type="submit">S’abonner</button>
        </form>
      </div>

      {/* Call to Action – Citizen Contribution */}
      <div className={styles.widget}>
        <h3>Devenez source d’information</h3>
        <p>
          Vous êtes témoin d’un événement ? Partagez-le avec nous de façon anonyme ou non.
        </p>
        <Link to="/contact" className={styles.ctaButton}>
          Envoyer une info
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;