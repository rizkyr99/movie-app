import { Link, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../shared/store/hooks';
import { useEffect } from 'react';
import { fetchMovieDetail } from '../features/movies/store/movieDetailSlice';
import { ArrowLeft, Dot, Loader2, Star } from 'lucide-react';

interface InfoTileProps {
  title: string;
  value: string | undefined;
}

const InfoTile = ({ title, value }: InfoTileProps) => {
  const displayValue = value && value !== 'N/A' ? value : 'Not Available';

  const content =
    title === 'Website' &&
    displayValue !== 'Not Available' &&
    displayValue !== 'N/A' ? (
      <a
        href={displayValue}
        target='_blank'
        rel='noopener noreferrer'
        className='text-sm text-blue-400 hover:underline transition'>
        {displayValue}
      </a>
    ) : (
      <p className='text-sm text-gray-300'>{displayValue}</p>
    );

  return (
    <div>
      <h2 className='text-xl font-bold'>{title}</h2>
      {content}
    </div>
  );
};

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
      <p className='status-message text-center p-12 text-red-500'>
        Failed to load movie details or movie not found.
      </p>
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
      <Link
        to='/'
        className='bg-gray-700 px-6 py-3 rounded-xl mb-6 cursor-pointer hover:bg-gray-600 transition inline-flex items-center gap-2'>
        <ArrowLeft className='size-4' />
        Back
      </Link>
      <div className='space-y-24'>
        <div className='flex flex-col lg:flex-row items-center lg:items-end gap-12'>
          <img
            src={
              Poster && Poster !== 'N/A'
                ? Poster
                : 'https://placehold.co/300x450?text=No+Poster'
            }
            alt={Title}
            className='w-full max-w-xs sm:max-w-sm rounded-xl shadow-2xl shadow-gray-900'
          />
          <div className='flex flex-col items-center lg:items-start space-y-4 text-center lg:text-left'>
            <h1 className='text-5xl md:text-6xl font-black'>{Title}</h1>

            <div className='flex items-center text-amber-500 text-sm gap-2'>
              <p>{Rated}</p>
              <Dot className='size-6' />
              <p>{Released}</p>
              <Dot className='size-6' />
              <p>{Runtime}</p>
            </div>

            <div className='flex flex-wrap items-center gap-2'>
              {Genre?.split(',')
                .filter((g) => g.trim())
                .map((genre, index) => (
                  <div
                    key={index}
                    className='bg-gray-700 px-3 py-1 rounded text-sm whitespace-nowrap'>
                    {genre.trim()}
                  </div>
                ))}
            </div>

            <div>
              <h2 className='text-xl font-black mb-1'>IMDb Rating</h2>
              <div className='flex items-center gap-2'>
                <Star className='size-8 text-amber-500 fill-amber-500' />
                <div>
                  <p className='text-xl font-bold'>{imdbRating}</p>
                  <p className='text-xs text-gray-300'>{imdbVotes}</p>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-8 pt-2'>
              {Ratings?.filter(
                (r) => r.Source !== 'N/A' && r.Value !== 'N/A'
              ).map((rating, index) => (
                <div key={index}>
                  <p className='text-gray-300 text-sm mb-1'>{rating.Source}</p>
                  <p className='text-xl font-bold'>{rating.Value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          <div className='col-span-2'>
            <h2 className='text-3xl font-black mb-4'>Plot Summary</h2>
            <p className='text-gray-300'>
              {Plot && Plot !== 'N/A' ? Plot : 'No plot summary available.'}
            </p>
          </div>
          <div className='space-y-6 lg:border-l lg:border-gray-700 lg:pl-6'>
            <div>
              <h2 className='text-xl font-black'>Director</h2>
              <p className='text-gray-300'>{Director}</p>
            </div>
            <div>
              <h2 className='text-xl font-black'>Writers</h2>
              <p className='text-gray-300'>{Writer}</p>
            </div>
            <div>
              <h2 className='text-xl font-black'>Lead Actors</h2>
              <p className='text-gray-300'>{Actors}</p>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6'>
          <InfoTile title='Box Office' value={BoxOffice} />
          <InfoTile title='Awards' value={Awards} />
          <InfoTile title='Production' value={Production} />
          <InfoTile title='Website' value={Website} />
          <InfoTile title='Metascore' value={Metascore} />
          <InfoTile title='DVD Release' value={DVD} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
