import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className={`${styles.mainContent} container`}>
        <main className={styles.content}>
          <Outlet />
        </main>
        <Sidebar />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
