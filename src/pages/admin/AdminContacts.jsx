// src/pages/admin/AdminContacts.jsx
import { useEffect, useState } from 'react';
import { useContacts } from '../../hooks/useContacts';
import styles from './AdminContacts.module.css';

const AdminContacts = () => {
  const { contacts, loading, error, getContacts, markAsRead, deleteContact } = useContacts();
  const [fetchedContacts, setFetchedContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
        const conts = await getContacts();
        setFetchedContacts(conts);
    };
    fetchContacts();
  }, []);

  const handleMarkAsRead = async (id) => {
    await markAsRead(id);
    setFetchedContacts(prev => prev.map(c => c.id === id ? { ...c, read: true } : c));
  };

  const handleDelete = async (id) => {
    await deleteContact(id);
    setFetchedContacts(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1>Contact Messages</h1>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.contactList}>
        {fetchedContacts.map(contact => (
          <div key={contact.id} className={`${styles.contactItem} ${contact.read ? styles.read : ''}`}>
            <h3>{contact.name} ({contact.email})</h3>
            <p>{contact.message}</p>
            <div className={styles.actions}>
              {!contact.read && <button onClick={() => handleMarkAsRead(contact.id)}>Mark as Read</button>}
              <button onClick={() => handleDelete(contact.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminContacts;
