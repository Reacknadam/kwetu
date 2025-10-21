// src/components/layout/Footer.jsx
import styles from './Footer.module.css';

const Footer = () => {
  const adminEmail = 'israelntalu328@gmail.com';

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {new Date().getFullYear()} Kwetu. All rights reserved.</p>
        <p>
          Admin Contact: <a href={`mailto:${adminEmail}`}>{adminEmail}</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
