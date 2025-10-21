import { useTheme } from '../contexts/ThemeContext';
import styles from './Header.module.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={`${styles.container} container`}>
        <div className={styles.logo}>Kwetu</div>
        <nav className={styles.nav}>
          <a href="/">Home</a>
          <a href="/categories">Categories</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
    </header>
  );
};

export default Header;
