import type { Movie } from '../types';
import { ArrowRight } from 'lucide-react';
import Button from '../../../shared/components/Button';

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
        className='rounded-xl w-full hover:scale-105 transition flex-1 cursor-pointer'
        loading='lazy'
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = NO_IMAGE_URL;
        }}
        onClick={() => onClick(movie.Poster, movie.Title)}
        role='button'
        aria-label={`Open large view for ${movie.Title} poster`}
      />
      <div className=''>
        <p className='text-lg font-bold mt-4 mb-1'>{movie?.Title}</p>
        <p className='text-sm text-gray-500'>{movie?.Year}</p>
      </div>
      <Button variant='link' to={`/movie/${movie.imdbID}`}>
        View details
        <ArrowRight className='size-4 group-hover:translate-x-2 transition group-hover:text-amber-500' />
      </Button>
    </div>
  );
};

export default MovieCard;
