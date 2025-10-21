// src/pages/admin/AdminNewsletter.jsx
import { useEffect, useState } from 'react';
import { useNewsletter } from '../../hooks/useNewsletter';
import styles from './AdminNewsletter.module.css';

const AdminNewsletter = () => {
  const { subscribers, loading, error, getSubscribers } = useNewsletter();
  const [fetchedSubs, setFetchedSubs] = useState([]);

  useEffect(() => {
    const fetchSubs = async () => {
        const subs = await getSubscribers();
        setFetchedSubs(subs);
    }
    fetchSubs();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Newsletter Subscribers</h1>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <ul className={styles.subscriberList}>
        {fetchedSubs.map(sub => (
          <li key={sub.id}>{sub.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminNewsletter;
