import { Link } from 'react-router';
import type { Movie } from '../types/movie';
import { ArrowRight } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  onClick: (posterUrl: string, title: string) => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  return (
    <div className='cursor-pointer h-full flex flex-col'>
      <img
        src={
          movie.Poster !== 'N/A'
            ? movie.Poster
            : 'https://placehold.co/200x300?text=No+Image'
        }
        alt={movie?.Title}
        className='rounded-xl w-full hover:scale-105 transition flex-1'
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            'https://placehold.co/200x300?text=No+Image';
        }}
        onClick={() => onClick(movie.Poster, movie.Title)}
      />
      <div className=''>
        <p className='text-lg font-bold mt-4 mb-1'>{movie?.Title}</p>
        <p className='text-sm text-gray-500'>{movie?.Year}</p>
      </div>
      <Link
        to={`/movie/${movie.imdbID}`}
        className='group mt-4 w-fit flex items-center gap-2 text-sm hover:font-semibold transition'>
        View details
        <ArrowRight className='size-4 group-hover:translate-x-2 transition group-hover:text-amber-500' />
      </Link>
    </div>
  );
};

export default MovieCard;
