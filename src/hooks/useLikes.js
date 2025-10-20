import { useState, useEffect } from 'react';
import { db } from '../firebase/firestore';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const useLikes = (articleId) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const getLikes = async () => {
      const docRef = doc(db, 'articles', articleId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLikes(docSnap.data().likes);
      }
    };

    getLikes();

    const likedArticles = JSON.parse(localStorage.getItem('likedArticles')) || [];
    if (likedArticles.includes(articleId)) {
      setLiked(true);
    }
  }, [articleId]);

  const likeArticle = async () => {
    if (liked) {
      return;
    }

    const docRef = doc(db, 'articles', articleId);
    await updateDoc(docRef, {
      likes: likes + 1,
    });

    setLikes(likes + 1);
    setLiked(true);

    const likedArticles = JSON.parse(localStorage.getItem('likedArticles')) || [];
    localStorage.setItem('likedArticles', JSON.stringify([...likedArticles, articleId]));
  };

  return { likes, likeArticle };
};

export default useLikes;
