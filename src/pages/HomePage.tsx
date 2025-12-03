import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  return (
    <div className='min-h-screen bg-gray-900'>
      <SearchBar />
      <MovieList />
    </div>
  );
};

export default HomePage;
