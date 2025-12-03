import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../shared/store/hooks';
import { useEffect } from 'react';
import { fetchMovieDetail } from '../features/movies/store/movieDetailSlice';
import { ArrowLeft, Loader2 } from 'lucide-react';
import MovieHeader from '../features/movies/components/MovieHeader';
import MovieInfoGrid from '../features/movies/components/MovieInfoGrid';
import MoviePlotAndCredits from '../features/movies/components/MoviePlotAndCredits';
import MovieEmpty from '../features/movies/components/MovieEmpty';
import Button from '../shared/components/Button';

const MovieDetailPage = () => {
  const { imdbID } = useParams();
  const dispatch = useAppDispatch();
  const movie = useAppSelector((state) => state.movieDetails.movie);
  const status = useAppSelector((state) => state.movieDetails.status);

  useEffect(() => {
    if (imdbID) {
      dispatch(fetchMovieDetail(imdbID));
    }
  }, [imdbID, dispatch]);

  if (status === 'loading' || status === 'idle') {
    return (
      <div className='flex items-center h-screen w-screen justify-center text-xl'>
        <Loader2 className='size-6 animate-spin mr-2 text-amber-500' />
        Loading movie details...
      </div>
    );
  }

  if (status === 'failed' || !movie) {
    return (
      <MovieEmpty title='Something went wrong' description='Please try again' />
    );
  }

  const {
    Title,
    Poster,
    Rated,
    Released,
    Runtime,
    Genre,
    imdbRating,
    imdbVotes,
    Ratings,
    Plot,
    Director,
    Writer,
    Actors,
    BoxOffice,
    Awards,
    Production,
    Website,
    Metascore,
    DVD,
  } = movie;

  return (
    <div className='py-40 px-12 relative'>
      <Button variant='secondary' to='/' className='mb-6'>
        <ArrowLeft className='size-4' />
        Back
      </Button>

      <div className='space-y-24'>
        <MovieHeader
          Title={Title}
          Poster={Poster}
          Rated={Rated}
          Released={Released}
          Runtime={Runtime}
          Genre={Genre}
          imdbRating={imdbRating}
          imdbVotes={imdbVotes}
          Ratings={Ratings}
        />

        <MoviePlotAndCredits
          Plot={Plot}
          Director={Director}
          Writer={Writer}
          Actors={Actors}
        />

        <MovieInfoGrid
          BoxOffice={BoxOffice}
          Awards={Awards}
          Production={Production}
          Website={Website}
          Metascore={Metascore}
          DVD={DVD}
        />
      </div>
    </div>
  );
};

export default MovieDetailPage;
