// src/components/admin/AdminLayout.jsx
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  const { logout } = useAuth();

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <nav>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/articles">Articles</Link>
          <Link to="/admin/contacts">Contacts</Link>
          <Link to="/admin/comments">Comments</Link>
          <Link to="/admin/newsletter">Newsletter</Link>
        </nav>
        <button onClick={logout} className={styles.logoutButton}>Logout</button>
      </aside>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
