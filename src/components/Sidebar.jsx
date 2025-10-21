import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.widget}>
        <h3>Categories</h3>
        <ul>
          <li><a href="/category/tech">Tech</a></li>
          <li><a href="/category/business">Business</a></li>
          <li><a href="/category/culture">Culture</a></li>
        </ul>
      </div>
      <div className={styles.widget}>
        <h3>Popular Articles</h3>
        <ul>
          <li><a href="/article/popular-1">Popular Article 1</a></li>
          <li><a href="/article/popular-2">Popular Article 2</a></li>
        </ul>
      </div>
      <div className={styles.widget}>
        <h3>Newsletter</h3>
        <p>Subscribe to our newsletter.</p>
        <input type="email" placeholder="Your email" />
        <button>Subscribe</button>
      </div>
    </aside>
  );
};

export default Sidebar;
