import MovieCard from './MovieCard';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useState } from 'react';
import MovieModal from './MovieModal';

const MovieList = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.items);
  const page = useAppSelector((state) => state.movies.page);
  const query = useAppSelector((state) => state.movies.query);
  const status = useAppSelector((state) => state.movies.status);
  const totalResults = useAppSelector((state) => state.movies.totalResults);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalPoster, setModalPoster] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const openModal = (posterUrl: string, title: string) => {
    setModalPoster(posterUrl);
    setModalTitle(title);
    setModalOpen(true);
  };

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6'>
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} onClick={openModal} />
        ))}
      </div>
      <MovieModal
        isOpen={modalOpen}
        posterUrl={modalPoster}
        title={modalTitle}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default MovieList;
