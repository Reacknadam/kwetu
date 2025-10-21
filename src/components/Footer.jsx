import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.links}>
          <a href="/social">Social</a>
          <a href="/newsletter">Newsletter</a>
        </div>
        <div className={styles.copy}>
          &copy; {new Date().getFullYear()} Kwetu. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
