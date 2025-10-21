// src/hooks/useContacts.js
import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export const useContacts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const contactsCollection = collection(db, 'contacts');

  const getContacts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(contactsCollection);
      const contacts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLoading(false);
      return contacts;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return [];
    }
  };

  const markAsRead = async (id) => {
    const docRef = doc(db, 'contacts', id);
    await updateDoc(docRef, { read: true });
  };

  const deleteContact = async (id) => {
    const docRef = doc(db, 'contacts', id);
    await deleteDoc(docRef);
  };

  return { loading, error, getContacts, markAsRead, deleteContact };
};
