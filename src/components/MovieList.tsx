import MovieCard from './MovieCard';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useCallback, useEffect } from 'react';
import MovieModal from './MovieModal';
import { fetchMovies } from '../store/moviesSlice';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import MovieCardSkeleton from './MovieCardSkeleton';
import { useModal } from '../hooks/useModal';

const MovieList = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.items);
  const page = useAppSelector((state) => state.movies.page);
  const query = useAppSelector((state) => state.movies.query);
  const status = useAppSelector((state) => state.movies.status);
  const totalResults = useAppSelector((state) => state.movies.totalResults);

  const { isOpen, posterUrl, title, openModal, closeModal } = useModal();

  const loading = status === 'loading';
  const hasMore = movies.length < totalResults && movies.length > 0;

  useEffect(() => {
    if (status === 'idle' && query) {
      dispatch(fetchMovies({ query, page: 1 }));
    }
  }, [dispatch, status, query]);

  const handleLoadMore = useCallback(() => {
    if (!query || loading || !hasMore) return;

    dispatch(fetchMovies({ query, page: page + 1 }));
  }, [dispatch, query, page, loading, hasMore]);

  const sentinelRef = useInfiniteScroll({
    hasMore,
    loading,
    onLoadMore: handleLoadMore,
    threshold: 1.0,
  });

  if (status === 'failed') {
    return <p>Failed to load movies.</p>;
  }

  const skeletonCount = 8;

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6'>
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} onClick={openModal} />
        ))}

        {loading &&
          Array.from({ length: skeletonCount }).map((_, idx) => (
            <MovieCardSkeleton key={`skeleton-${idx}`} />
          ))}
      </div>

      {loading && movies.length > 0 && (
        <p className='text-center text-gray-400 my-2'>Loading more movies...</p>
      )}

      {hasMore && (
        <div
          ref={sentinelRef}
          className='h-4 w-fit bg-transparent mx-auto my-4 opacity-0'>
          Load More
        </div>
      )}

      {!movies.length && status === 'succeeded' && (
        <p className='status-message text-center p-8'>
          No movies found. Try a different search.
        </p>
      )}

      <MovieModal
        isOpen={isOpen}
        posterUrl={posterUrl}
        title={title}
        onClose={closeModal}
      />
    </>
  );
};

export default MovieList;
