// src/components/layout/Header.jsx
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './Header.module.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>Kwetu</Link>
        <nav className={styles.nav}>
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
    </header>
  );
};

export default Header;
