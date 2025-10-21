// src/components/blog/Comments.jsx
import { useEffect, useState } from 'react';
import { useComments } from '../../hooks/useComments';
import styles from './Comments.module.css';

const Comments = ({ articleSlug }) => {
  const { getComments, addComment, loading: submitting } = useComments();
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetched = await getComments(articleSlug);
        // Only show approved comments
        setComments(fetched.filter(c => c.approved));
      } catch (err) {
        console.error("Failed to load comments", err);
      }
    };
    fetchComments();
  }, [articleSlug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitSuccess(false);

    if (!author.trim() || !text.trim()) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    try {
      await addComment(articleSlug, { author: author.trim(), text: text.trim() });
      setAuthor('');
      setText('');
      setSubmitSuccess(true);
      // Note: new comment won't appear until approved (as per current logic)
    } catch (err) {
      setError('Échec de l’envoi. Veuillez réessayer.');
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Commentaires des lecteurs</h2>
      <p className={styles.subtitle}>
        Partagez votre avis. Tous les commentaires sont modérés avant publication.
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="comment-author">Nom (ou pseudo)</label>
          <input
            id="comment-author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Ex. : Ntumba M."
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="comment-text">Votre commentaire</label>
          <textarea
            id="comment-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Exprimez-vous avec respect et courtoisie…"
            rows="4"
            required
          />
        </div>

        {error && <p className={styles.feedbackError}>{error}</p>}
        {submitSuccess && (
          <p className={styles.feedbackSuccess}>
            Merci ! Votre commentaire a été soumis et sera publié après modération.
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={styles.submitButton}
        >
          {submitting ? 'Envoi en cours…' : 'Publier le commentaire'}
        </button>
      </form>

      {comments.length > 0 ? (
        <div className={styles.commentList}>
          <h3 className={styles.commentsTitle}>
            {comments.length} commentaire{comments.length > 1 ? 's' : ''}
          </h3>
          {comments.map((comment) => (
            <article key={comment.id} className={styles.comment}>
              <header className={styles.commentHeader}>
                <strong>{comment.author}</strong>
                <time dateTime={comment.createdAt?.toDate?.().toISOString()}>
                  {new Date(comment.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </header>
              <p className={styles.commentText}>{comment.text}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.noComments}>
          <p>Aucun commentaire publié pour le moment.</p>
          <p>Soyez le/la premier(e) à réagir !</p>
        </div>
      )}
    </section>
  );
};

export default Comments;