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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{article.date}</p>
      <img src={article.imageUrl} alt={article.title} className="rounded-md mb-8" />
      <div className="prose dark:prose-dark max-w-none">{article.content}</div>
      <AdBanner />
      <div className="flex justify-between items-center mt-8">
        <LikeButton likes={likes} onClick={likeArticle} />
        <ShareButtons article={article} />
      </div>
      <CommentList comments={comments} />
      <CommentForm onSubmit={addComment} />
    </div>
  );
};

export default Article;
