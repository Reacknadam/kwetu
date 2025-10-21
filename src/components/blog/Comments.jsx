// src/components/blog/Comments.jsx
import { useEffect, useState } from 'react';
import { useComments } from '../../hooks/useComments';
import styles from './Comments.module.css';

const Comments = ({ articleSlug }) => {
  const { getComments, addComment, loading } = useComments();
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const fetched = await getComments(articleSlug);
      setComments(fetched.filter(c => c.approved));
    };
    fetchComments();
  }, [articleSlug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addComment(articleSlug, { author, text });
    setAuthor('');
    setText('');
    // Optionally, show a "pending approval" message
  };

  return (
    <div className={styles.container}>
      <h3>Comments</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" placeholder="Your name" value={author} onChange={e => setAuthor(e.target.value)} required />
        <textarea placeholder="Your comment" value={text} onChange={e => setText(e.target.value)} required></textarea>
        <button type="submit" disabled={loading}>Submit</button>
      </form>
      <div className={styles.commentList}>
        {comments.map(comment => (
          <div key={comment.id} className={styles.comment}>
            <strong>{comment.author}</strong>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
