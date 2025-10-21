// src/hooks/useNewsletter.js
import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

export const useNewsletter = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const newsletterCollection = collection(db, 'newsletter');

  const getSubscribers = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(newsletterCollection);
      const subscribers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLoading(false);
      return subscribers;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return [];
    }
  };

  const addSubscriber = async (email) => {
      await addDoc(newsletterCollection, {
          email,
          createdAt: serverTimestamp(),
      })
  }

  return { loading, error, getSubscribers, addSubscriber };
};
