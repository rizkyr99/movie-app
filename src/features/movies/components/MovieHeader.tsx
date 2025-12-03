import { Dot } from 'lucide-react';
import MovieRatings from './MovieRatings';

interface MovieHeaderProps {
  Title?: string;
  Poster?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  imdbRating?: string;
  imdbVotes?: string;
  Ratings?: { Source: string; Value: string }[];
}

const MovieHeader = ({
  Title,
  Poster,
  Rated,
  Released,
  Runtime,
  Genre,
  imdbRating,
  imdbVotes,
  Ratings,
}: MovieHeaderProps) => {
  const safePoster =
    Poster && Poster !== 'N/A'
      ? Poster
      : 'https://placehold.co/300x450?text=No+Poster';

  const genres = Genre?.split(',')
    .filter((g) => g.trim())
    .map((g) => g.trim());

  return (
    <div className='flex flex-col lg:flex-row items-center lg:items-end gap-12'>
      <img
        src={safePoster}
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
          {genres?.map((genre, index) => (
            <div
              key={index}
              className='bg-gray-700 px-3 py-1 rounded text-sm whitespace-nowrap'>
              {genre}
            </div>
          ))}
        </div>

        <MovieRatings
          imdbRating={imdbRating}
          imdbVotes={imdbVotes}
          Ratings={Ratings}
        />
      </div>
    </div>
  );
};

export default MovieHeader;
