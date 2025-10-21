import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesCollection = collection(db, 'articles');
        const articleSnapshot = await getDocs(articlesCollection);
        const articlesList = articleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setArticles(articlesList);
      } catch (error) {
        console.error("Error fetching articles: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading };
};

export const useArticle = (slug) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleRef = doc(db, 'articles', slug);
        const articleSnap = await getDoc(articleRef);
        if (articleSnap.exists()) {
          setArticle({ id: articleSnap.id, ...articleSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching article: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  return { article, loading };
};
