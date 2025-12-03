import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import useDebounce from '../hooks/useDebounce';
import { fetchMovies, resetMovies, setQuery } from '../store/moviesSlice';
import { autocompleteSearch } from '../api/omdb';
import type { Movie } from '../types/movie';
import AutoCompleteList from './AutoCompleteList';
import { Loader2, Search, X } from 'lucide-react';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const globalQuery = useAppSelector((state) => state.movies.query);
  const [inputValue, setInputValue] = useState(globalQuery || '');
  const [autoCompleteResults, setAutoCompleteResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (!hasInteracted) return;

    let ignore = false;

    const fetchAutocomplete = async () => {
      if (!debouncedValue || debouncedValue.length < 3) {
        setAutoCompleteResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const results = await autocompleteSearch(debouncedValue);
        if (!ignore) {
          setAutoCompleteResults(results || []);
        }
      } catch {
        if (!ignore) {
          setAutoCompleteResults([]);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchAutocomplete();

    return () => {
      ignore = true;
    };
  }, [debouncedValue, hasInteracted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetMovies());
    dispatch(setQuery(inputValue));
    dispatch(fetchMovies({ query: inputValue, page: 1 }));
    setAutoCompleteResults([]);
    setHasInteracted(false);
  };

  const handleSelectSuggestion = (value: string) => {
    setInputValue(value);
    dispatch(resetMovies());
    dispatch(setQuery(value));
    dispatch(fetchMovies({ query: value, page: 1 }));
    setAutoCompleteResults([]);
    setHasInteracted(false);
  };

  const handleClearInput = () => {
    setInputValue('');
    setAutoCompleteResults([]);
  };

  return (
    <div className='relative p-6 flex items-center justify-center'>
      <form
        onSubmit={handleSubmit}
        className='flex items-center gap-2 max-w-xl'>
        <div className='relative flex-1'>
          <input
            aria-label='Search movies'
            className='bg-gray-700 pl-4 pr-8 py-2 rounded-lg'
            placeholder='Search movies (e.g. Batman)...'
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setHasInteracted(true);
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
        </div>
        <button
          className='bg-amber-500 hover:bg-amber-400 text-black cursor-pointer px-4 py-2 rounded-lg'
          type='submit'>
          <Search className='size-6 stroke-3' />
        </button>
      </form>
      {hasInteracted && autoCompleteResults.length > 0 && (
        <AutoCompleteList
          results={autoCompleteResults}
          onSelect={handleSelectSuggestion}
        />
      )}
    </div>
  );
};

export default SearchBar;
