import React from 'react';
import { useParams } from 'react-router-dom';
import LikeButton from '../components/LikeButton';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import AdBanner from '../components/AdBanner';
import ShareButtons from '../components/ShareButtons';
import useArticle from '../hooks/useArticle';
import useLikes from '../hooks/useLikes';
import useComments from '../hooks/useComments';

const Article = () => {
  const { slug } = useParams();
  const { article, loading, error } = useArticle(slug);
  const { likes, likeArticle } = useLikes(slug);
  const { comments, addComment } = useComments(slug);

  if (loading) {
    return <div className="text-center mt-10">Chargement de l'article...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Erreur: {error.message}</div>;
  }

  if (!article) {
    return <div className="text-center mt-10">Article non trouvé.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{article.title}</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">{article.date}</p>
      <img src={article.imageUrl} alt={article.title} className="w-full rounded-lg shadow-lg mb-8" />
      <article className="prose lg:prose-xl dark:prose-invert max-w-none">
        {article.content}
      </article>
      <AdBanner />
      <div className="flex justify-between items-center mt-8 py-4 border-t border-b border-gray-200 dark:border-gray-700">
        <LikeButton likes={likes} onClick={likeArticle} />
        <ShareButtons article={article} />
      </div>
      <CommentList comments={comments} />
      <CommentForm onSubmit={addComment} />
    </div>
  );
};

export default Article;
