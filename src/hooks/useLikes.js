// src/hooks/useLikes.js
import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, query, where, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';

export const useLikes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const likesCollection = collection(db, 'likes');

  const getLikes = async (articleSlug) => {
    setLoading(true);
    try {
      const q = query(likesCollection, where('articleSlug', '==', articleSlug));
      const querySnapshot = await getDocs(q);
      setLoading(false);
      return querySnapshot.size; // Return the count of likes
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return 0;
    }
  };

  const addLike = async (articleSlug, userId) => {
    setLoading(true);
    try {
      // Check if the user has already liked the article
      const q = query(likesCollection, where('articleSlug', '==', articleSlug), where('uid', '==', userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await addDoc(likesCollection, {
          articleSlug,
          uid: userId,
          createdAt: serverTimestamp(),
        });
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { loading, error, getLikes, addLike };
};
