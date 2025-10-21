// src/hooks/useComments.js
import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, query, where, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export const useComments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const commentsCollection = collection(db, 'comments');

  const getComments = async (articleSlug) => {
    setLoading(true);
    try {
      const q = query(commentsCollection, where('articleSlug', '==', articleSlug));
      const querySnapshot = await getDocs(q);
      const comments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLoading(false);
      return comments;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return [];
    }
  };

  const getAllComments = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(commentsCollection);
      const comments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLoading(false);
      return comments;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return [];
    }
  };

  const addComment = async (articleSlug, commentData) => {
    setLoading(true);
    try {
      await addDoc(commentsCollection, {
        ...commentData,
        articleSlug,
        approved: false, // Comments require approval
        createdAt: serverTimestamp(),
      });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const approveComment = async (id) => {
    const docRef = doc(db, 'comments', id);
    await updateDoc(docRef, { approved: true });
  };

  const deleteComment = async (id) => {
    const docRef = doc(db, 'comments', id);
    await deleteDoc(docRef);
  };

  return { loading, error, getComments, getAllComments, addComment, approveComment, deleteComment };
};
