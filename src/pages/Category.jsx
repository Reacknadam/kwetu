import { useParams } from 'react-router-dom';

const Category = () => {
  const { category } = useParams();
  return (
    <div>
      <h1>Category Page</h1>
      <p>Category: {category}</p>
    </div>
  );
};

export default Category;
