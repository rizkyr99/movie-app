import { useEffect, useState } from 'react';
import useDebounce from '../../../shared/hooks/useDebounce';
import { autocompleteSearch } from '../../../shared/api/omdb';
import type { Movie } from '../../movies/types';

interface AutoCompleteHook {
  inputValue: string;
  setInputValue: (value: string) => void;
  autoCompleteResults: Movie[];
  isLoading: boolean;
  handleInteraction: (isInteracting: boolean) => void;
  clearResults: () => void;
}

export const useMovieSearchAutocomplete = (
  initialValue: string
): AutoCompleteHook => {
  const [inputValue, setInputValue] = useState(initialValue || '');
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
      } catch (error) {
        console.error('Autocomplete fetch failed:', error);
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

  const handleInteraction = (isInteracting: boolean) => {
    setHasInteracted(isInteracting);
  };

  const clearResults = () => {
    setAutoCompleteResults([]);
  };

  return {
    inputValue,
    setInputValue,
    autoCompleteResults,
    isLoading,
    handleInteraction,
    clearResults,
  };
};
