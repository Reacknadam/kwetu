import { useState, useEffect } from 'react';
import { db } from '../firebase/firestore';
import { collection, getDocs, addDoc, doc, updateDoc, increment } from 'firebase/firestore';

const useComments = (articleId) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      const querySnapshot = await getDocs(collection(db, 'articles', articleId, 'comments'));
      const commentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
    };

    getComments();
  }, [articleId]);

  const addComment = async (comment) => {
    const docRef = await addDoc(collection(db, 'articles', articleId, 'comments'), comment);
    setComments([...comments, { id: docRef.id, ...comment }]);

    const articleRef = doc(db, 'articles', articleId);
    await updateDoc(articleRef, {
      commentCount: increment(1),
    });
  };

  return { comments, addComment };
};

export default useComments;
