import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import useDebounce from '../hooks/useDebounce';
import { fetchMovies, resetMovies, setQuery } from '../store/moviesSlice';
import { autocompleteSearch } from '../api/omdb';
import type { Movie } from '../types/movie';
import AutoCompleteList from './AutoCompleteList';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const globalQuery = useAppSelector((state) => state.movies.query);
  const [inputValue, setInputValue] = useState(globalQuery || '');
  const [autoCompleteResults, setAutoCompleteResults] = useState<Movie[]>([]);
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (!debouncedValue) return;

    dispatch(setQuery(debouncedValue));
    dispatch(fetchMovies({ query: debouncedValue, page: 1 }));
  }, [debouncedValue, dispatch]);

  useEffect(() => {
    const fetchAutocomplete = async () => {
      if (debouncedValue.length < 3) {
        setAutoCompleteResults([]);
        return;
      }
      try {
        const results = await autocompleteSearch(debouncedValue);
        setAutoCompleteResults(results || []);
      } catch (err) {
        setAutoCompleteResults([]);
      }
    };
    fetchAutocomplete();
  }, [debouncedValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetMovies());
    dispatch(setQuery(inputValue));
    dispatch(fetchMovies({ query: inputValue, page: 1 }));
    setAutoCompleteResults([]);
  };

  const handleSelectSuggestion = (value: string) => {
    setInputValue(value);
    dispatch(resetMovies());
    dispatch(setQuery(value));
    dispatch(fetchMovies({ query: value, page: 1 }));
    setAutoCompleteResults([]);
  };

  return (
    <div className='relative p-6 flex items-center justify-center'>
      <form
        onSubmit={handleSubmit}
        className='flex items-center gap-2 max-w-xl'>
        <input
          aria-label='Search movies'
          className='bg-gray-700 px-4 py-2 flex-1 rounded-lg'
          placeholder='Search movies (e.g. Batman)...'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className='bg-blue-500 hover:bg-blue-400 cursor-pointer px-4 py-2 rounded-lg'
          type='submit'>
          Search
        </button>
      </form>
      <AutoCompleteList
        results={autoCompleteResults}
        onSelect={handleSelectSuggestion}
      />
    </div>
  );
};

export default SearchBar;
