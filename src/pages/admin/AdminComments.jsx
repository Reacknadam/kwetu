// src/pages/admin/AdminComments.jsx
import { useEffect, useState } from 'react';
import { useComments } from '../../hooks/useComments';
import styles from './AdminComments.module.css';

const AdminComments = () => {
  const { comments, loading, error, getAllComments, approveComment, deleteComment } = useComments();
  const [fetchedComments, setFetchedComments] = useState([]);


  useEffect(() => {
    const fetchComments = async () => {
        const comms = await getAllComments();
        setFetchedComments(comms);
    };
    fetchComments();
  }, []);

  const handleApprove = async (id) => {
    await approveComment(id);
    setFetchedComments(prev => prev.map(c => c.id === id ? { ...c, approved: true } : c));
  };

  const handleDelete = async (id) => {
    await deleteComment(id);
    setFetchedComments(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1>Moderate Comments</h1>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.commentList}>
        {fetchedComments.map(comment => (
          <div key={comment.id} className={`${styles.commentItem} ${comment.approved ? styles.approved : ''}`}>
            <h4>{comment.author} on article "{comment.articleSlug}"</h4>
            <p>{comment.text}</p>
            <div className={styles.actions}>
              {!comment.approved && <button onClick={() => handleApprove(comment.id)}>Approve</button>}
              <button onClick={() => handleDelete(comment.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminComments;
