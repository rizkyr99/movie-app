import MovieCard from './MovieCard';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect, useRef, useState } from 'react';
import MovieModal from './MovieModal';
import { fetchMovies } from '../store/moviesSlice';

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

  const sentinelRef = useRef(null);
  const hasMore = movies.length < totalResults && movies.length >= 5;

  const openModal = (posterUrl: string, title: string) => {
    setModalPoster(posterUrl);
    setModalTitle(title);
    setModalOpen(true);
  };

  useEffect(() => {
    console.log(hasMore);
    if (!hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && status !== 'loading') {
          dispatch(fetchMovies({ query, page: page + 1 }));
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [dispatch, query, page, status, hasMore]);

  if (status === 'failed') {
    return <p>Failed to load movies.</p>;
  }

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6'>
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} onClick={openModal} />
        ))}
      </div>

      {status === 'loading' && <p>Loading more movies...</p>}

      {hasMore && <div ref={sentinelRef} />}

      {!movies.length && status === 'succeeded' && (
        <p className='status-message'>No movies found.</p>
      )}

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
