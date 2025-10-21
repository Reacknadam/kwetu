// src/hooks/useArticles.js
import { useState } from 'react';
import { db, storage } from '../firebase/config';
import { collection, getDocs, getDoc, doc, setDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const useArticles = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const articlesCollection = collection(db, 'articles');

  const uploadImage = async (imageFile) => {
    const storageRef = ref(storage, `articles/images/${Date.now()}_${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  };

  const getArticles = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(articlesCollection);
      const articles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLoading(false);
      return articles;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return [];
    }
  };

  const getArticleBySlug = async (slug) => {
    setLoading(true);
    try {
      const docRef = doc(db, 'articles', slug);
      const docSnap = await getDoc(docRef);
      setLoading(false);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        setError('Article not found.');
        return null;
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  const addArticle = async (articleData, imageFile) => {
    setLoading(true);
    try {
      const imageUrl = await uploadImage(imageFile);
      const docRef = doc(db, 'articles', articleData.slug);
      await setDoc(docRef, {
        ...articleData,
        imageUrl,
        published: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const updateArticle = async (slug, articleData, imageFile) => {
    setLoading(true);
    try {
      let imageUrl = articleData.imageUrl;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      const docRef = doc(db, 'articles', slug);
      await updateDoc(docRef, {
        ...articleData,
        imageUrl,
        updatedAt: serverTimestamp(),
      });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const deleteArticle = async (slug) => {
    setLoading(true);
    try {
      const docRef = doc(db, 'articles', slug);
      await deleteDoc(docRef);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };


  return { loading, error, getArticles, getArticleBySlug, addArticle, updateArticle, deleteArticle };
};
