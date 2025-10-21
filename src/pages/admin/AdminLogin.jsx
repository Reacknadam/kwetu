// src/pages/admin/AdminLogin.jsx
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import styles from './AdminLogin.module.css';

const AdminLogin = () => {
  const { currentUser, login } = useAuth();

  if (currentUser) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1>Admin Login</h1>
        <p>Please log in with Google to continue.</p>
        <button onClick={login}>Sign in with Google</button>
      </div>
    </div>
  );
};

export default AdminLogin;
