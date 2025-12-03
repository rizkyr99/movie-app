import { Link } from 'react-router';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onClick: (posterUrl: string, title: string) => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  return (
    <div className='cursor-pointer h-full flex flex-col'>
      <img
        src={movie?.Poster || ''}
        alt={movie?.Title}
        className='rounded-xl w-full hover:scale-105 transition flex-1'
        onClick={() => onClick(movie.Poster, movie.Title)}
      />
      <div className=''>
        <p className='text-lg font-bold mt-4 mb-1'>{movie?.Title}</p>
        <p className='text-sm text-gray-500'>{movie?.Year}</p>
      </div>
      <Link
        to={`/movie/${movie.imdbID}`}
        className='mt-4 inline-block border border-gray-500 px-4 py-2 text-sm rounded'>
        View details
      </Link>
    </div>
  );
};

export default MovieCard;
