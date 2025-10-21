import { useLocation } from 'react-router-dom';

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  return (
    <div>
      <h1>Search Page</h1>
      <p>Query: {query}</p>
    </div>
  );
};

export default Search;
