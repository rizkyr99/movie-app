import { useAppDispatch, useAppSelector } from '../../../shared/store/hooks';
import {
  fetchMovies,
  resetMovies,
  setQuery,
} from '../../movies/store/moviesSlice';
import AutoCompleteList from './AutoCompleteList';
import { Loader2, Search, X } from 'lucide-react';
import { useMovieSearchAutocomplete } from '../hooks/useMovieSearchAutocomplete';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const globalQuery = useAppSelector((state) => state.movies.query);

  const {
    inputValue,
    setInputValue,
    autoCompleteResults,
    isLoading,
    handleInteraction,
    clearResults,
  } = useMovieSearchAutocomplete(globalQuery);

  const executeSearch = (query: string) => {
    dispatch(resetMovies());
    dispatch(setQuery(query));
    dispatch(fetchMovies({ query, page: 1 }));
    clearResults();
    handleInteraction(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;
    executeSearch(inputValue);
  };

  const handleSelectSuggestion = (value: string) => {
    setInputValue(value);
    executeSearch(value);
  };

  const handleClearInput = () => {
    setInputValue('');
    clearResults();
  };

  return (
    <div className='relative p-6 flex items-center justify-center'>
      <form
        onSubmit={handleSubmit}
        className='flex items-center gap-2 max-w-xl w-full'>
        <div className='relative flex-1'>
          <input
            aria-label='Search movies'
            className='bg-gray-700 pl-4 pr-8 py-2 rounded-lg w-full'
            placeholder='Search movies (e.g. Batman)...'
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              handleInteraction(true);
            }}
          />
          {isLoading && (
            <Loader2 className='size-4 absolute top-3 right-3 animate-spin' />
          )}

          {!isLoading && inputValue && (
            <X
              className='size-4 absolute top-3 right-3'
              onClick={handleClearInput}
            />
          )}

          {autoCompleteResults.length > 0 && (
            <AutoCompleteList
              results={autoCompleteResults}
              onSelect={handleSelectSuggestion}
            />
          )}
        </div>
        <button
          className='bg-amber-500 hover:bg-amber-400 text-black cursor-pointer px-4 py-2 rounded-lg'
          type='submit'>
          <Search className='size-6 stroke-3' />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
