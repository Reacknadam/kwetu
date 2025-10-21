// src/components/layout/Sidebar.jsx
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.widget}>
        <h4>Categories</h4>
        <ul>
          <li><a href="#">Category 1</a></li>
          <li><a href="#">Category 2</a></li>
          <li><a href="#">Category 3</a></li>
        </ul>
      </div>
      <div className={styles.widget}>
        <h4>Newsletter</h4>
        <form>
          <input type="email" placeholder="Your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </aside>
  );
};

export default Sidebar;
