import { Link, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect } from 'react';
import { fetchMovieDetail } from '../store/movieDetailSlice';
import { ArrowLeft, Dot, Star } from 'lucide-react';

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

  if (status === 'loading' || !movie) {
    return (
      <div className='flex items-center h-screen w-screen justify-center'>
        Loading movie details...
      </div>
    );
  }

  if (status === 'failed') {
    return <p className='status-message'>Failed to load movie details.</p>;
  }
  return (
    <div className='py-40 px-12 relative'>
      <Link
        to='/'
        className='bg-gray-700 px-6 py-3 rounded-xl mb-6 cursor-pointer hover:bg-gray-600 transition inline-flex items-center gap-2'>
        <ArrowLeft className='size-4' />
        Back
      </Link>
      <div className='flex flex-col lg:flex-row items-center lg:items-end gap-6'>
        <img
          src={movie.Poster}
          alt={movie.Title}
          className='w-full max-w-sm rounded-xl'
        />
        <div className='flex flex-col items-center lg:items-start space-y-4'>
          <h1 className='text-6xl font-black text-center'>{movie.Title}</h1>
          <div className='flex items-center text-amber-500 text-sm gap-2'>
            <p>{movie.Rated}</p>
            <Dot className='size-6' />
            <p>{movie.Released}</p>
            <Dot className='size-6' />
            <p>{movie.Runtime}</p>
          </div>
          <div className='flex items-center gap-2'>
            {movie.Genre.split(',').map((genre) => (
              <div className='bg-gray-700 px-3 py-1 rounded text-sm'>
                {genre.trim()}
              </div>
            ))}
          </div>
          <div>
            <h2 className='text-xl font-black mb-1'>IMDb Rating</h2>
            <div className='flex items-center gap-2'>
              <Star className='size-8 text-amber-500 fill-amber-500' />
              <div>
                <p className='text-xl font-bold'>{movie.imdbRating}</p>
                <p className='text-xs text-gray-300'>{movie.imdbVotes}</p>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-8'>
            {movie.Ratings.map((rating) => (
              <div>
                <p className='text-gray-300 text-sm mb-1'>{rating.Source}</p>
                <p className='text-xl font-bold'>{rating.Value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 mt-24'>
        <div className='col-span-2'>
          <h2 className='text-3xl font-black mb-4'>Plot Summary</h2>
          <p className='text-gray-300'>{movie.Plot}</p>
        </div>
        <div className='space-y-4'>
          <div>
            <h2 className='text-xl font-black'>Director</h2>
            <p className='text-gray-300'>{movie.Director}</p>
          </div>
          <div>
            <h2 className='text-xl font-black'>Writers</h2>
            <p className='text-gray-300'>{movie.Writer}</p>
          </div>
          <div>
            <h2 className='text-xl font-black'>Lead Actors</h2>
            <p className='text-gray-300'>{movie.Actors}</p>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-6 gap-6 mt-12'>
        <div>
          <h2 className='text-xl font-bold'>Box Office</h2>
          <p className='text-sm text-gray-300'>{movie.BoxOffice}</p>
        </div>
        <div>
          <h2 className='text-xl font-bold'>Awards</h2>
          <p className='text-sm text-gray-300'>{movie.Awards}</p>
        </div>
        <div>
          <h2 className='text-xl font-bold'>Production</h2>
          <p className='text-sm text-gray-300'>{movie.Production}</p>
        </div>
        <div>
          <h2 className='text-xl font-bold'>Website</h2>
          <p className='text-sm text-gray-300'>{movie.Website}</p>
        </div>
        <div>
          <h2 className='text-xl font-bold'>Response</h2>
          <p className='text-sm text-gray-300'>{movie.Response}</p>
        </div>
        <div>
          <h2 className='text-xl font-bold'>DVD</h2>
          <p className='text-sm text-gray-300'>{movie.DVD}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
