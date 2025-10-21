import { useParams } from 'react-router-dom';

const Article = () => {
  const { slug } = useParams();
  return (
    <div>
      <h1>Article Page</h1>
      <p>Slug: {slug}</p>
    </div>
  );
};

export default Article;
