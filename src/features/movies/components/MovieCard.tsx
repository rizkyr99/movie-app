import type { Movie } from '../types';
import { ArrowRight } from 'lucide-react';
import Button from '../../../shared/components/Button';
import { Link } from 'react-router';

interface MovieCardProps {
  movie: Movie;
  onClick: (posterUrl: string, title: string) => void;
}

const NO_IMAGE_URL = 'https://placehold.co/200x300?text=No+Image';

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  return (
    <div className='h-full flex flex-col'>
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : NO_IMAGE_URL}
        alt={movie?.Title}
        className='rounded-xl w-full object-cover aspect-2/3 hover:scale-105 transition cursor-pointer'
        loading='lazy'
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = NO_IMAGE_URL;
        }}
        onClick={() => onClick(movie.Poster, movie.Title)}
        role='button'
        aria-label={`Open large view for ${movie.Title} poster`}
      />
      <Link
        to={`/movie/${movie.imdbID}`}
        className='mt-4 flex flex-col group flex-1'>
        <div className='flex-1'>
          <p className='text-lg font-bold mb-1 group-hover:text-amber-400 transition'>
            {movie.Title}
          </p>
          <p className='text-sm text-gray-500'>{movie.Year}</p>
        </div>

        <Button variant='link' className='mt-2 p-0'>
          View details
          <ArrowRight className='size-4 group-hover:translate-x-2 transition group-hover:text-amber-500' />
        </Button>
      </Link>
    </div>
  );
};

export default MovieCard;
