import MovieList from '../features/movies/components/MovieList';
import SearchBar from '../features/search/components/SearchBar';

const HomePage = () => {
  return (
    <div className='min-h-screen bg-gray-900'>
      <SearchBar />
      <MovieList />
    </div>
  );
};

export default HomePage;
