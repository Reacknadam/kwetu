// src/pages/Contact.jsx
import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import styles from './Contact.module.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await addDoc(collection(db, 'contacts'), {
        name,
        email,
        message,
        createdAt: serverTimestamp(),
        read: false,
      });
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError('Échec de l’envoi. Veuillez réessayer plus tard.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Nous contacter</h1>
        <p className={styles.subtitle}>
          Vous avez une information à partager, une question ou une suggestion ?<br />
          Chez <strong>Kwetu, notre média</strong>, chaque voix compte.
        </p>
      </div>

      {success && (
        <div className={`${styles.alert} ${styles.alertSuccess}`}>
          ✅ Votre message a été envoyé avec succès. Nous le traiterons dans les plus brefs délais.
        </div>
      )}
      {error && (
        <div className={`${styles.alert} ${styles.alertError}`}>
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nom complet</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Ex. : Marie Tshibangu"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Adresse e-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="votre@email.com"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Partagez votre témoignage, alerte ou suggestion…"
          />
        </div>
        <button type="submit" disabled={submitting} className={styles.submitButton}>
          {submitting ? 'Envoi en cours…' : 'Envoyer'}
        </button>
      </form>

      <div className={styles.infoBox}>
        <h3>Coordonnées officielles</h3>
        <div className={styles.contactItem}>
          <span className={styles.iconEmail}></span>
          <span>israelntalu328@gmail.com</span>
        </div>
        <div className={styles.contactItem}>
          <span className={styles.iconLocation}></span>
          <span>Kananga, République Démocratique du Congo</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;