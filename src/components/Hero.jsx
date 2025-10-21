import styles from './Hero.module.css';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <img src="https://via.placeholder.com/1200x600" alt="Featured article" />
      <div className={styles.content}>
        <h2>Featured Article Title</h2>
        <p>This is a short excerpt of the featured article.</p>
        <a href="/article/featured" className={styles.readMore}>Read More</a>
      </div>
    </div>
  );
};

export default Hero;
