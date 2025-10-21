import { Outlet, Link } from 'react-router-dom';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <nav>
          <ul>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/admin/articles">Articles</Link></li>
            <li><Link to="/admin/contacts">Contacts</Link></li>
            <li><Link to="/admin/comments">Comments</Link></li>
            <li><Link to="/admin/analytics">Analytics</Link></li>
            <li><Link to="/admin/newsletter">Newsletter</Link></li>
          </ul>
        </nav>
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
