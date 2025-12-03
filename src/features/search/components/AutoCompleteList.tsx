import type { Movie } from '../../movies/types';

interface AutoCompleteListProps {
  results: Movie[];
  onSelect: (title: string) => void;
}

const AutoCompleteList = ({ results, onSelect }: AutoCompleteListProps) => {
  if (!results.length) return null;

  return (
    <ul className='absolute left-0 right-0 top-full mt-4 bg-gray-800 p-4 rounded-lg space-y-2 z-50'>
      {results.map((movie) => (
        <li
          key={movie.imdbID}
          onMouseDown={() => onSelect(movie.Title)}
          className='text-sm px-2 py-1 hover:bg-gray-700 rounded cursor-pointer'>
          {movie.Title}
        </li>
      ))}
    </ul>
  );
};

export default AutoCompleteList;
