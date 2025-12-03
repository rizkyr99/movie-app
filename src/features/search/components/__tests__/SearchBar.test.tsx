import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, type Mock } from 'vitest';

import SearchBar from '../SearchBar';
import { useAppDispatch, useAppSelector } from '../../../../shared/store/hooks';
import useDebounce from '../../../../shared/hooks/useDebounce';
import {
  fetchMovies,
  resetMovies,
  setQuery,
} from '../../../movies/store/moviesSlice';
import { autocompleteSearch } from '../../../../shared/api/omdb';

vi.mock('../../../../shared/store/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../../../../shared/hooks/useDebounce', () => ({
  default: vi.fn(),
}));

vi.mock('../../../movies/store/moviesSlice', () => ({
  resetMovies: vi.fn(() => ({ type: 'movies/resetMovies' })),
  setQuery: vi.fn((payload: string) => ({
    type: 'movies/setQuery',
    payload,
  })),
  fetchMovies: vi.fn((payload: { query: string; page: number }) => ({
    type: 'movies/fetchMovies',
    payload,
  })),
}));

vi.mock('../../../../shared/api/omdb', () => ({
  autocompleteSearch: vi.fn(),
}));

vi.mock('../AutoCompleteList', () => ({
  default: ({ results, onSelect }: any) => (
    <ul data-testid='autocomplete-list'>
      {results.map((movie: any) => (
        <li
          key={movie.imdbID}
          onClick={() => onSelect(movie.Title)}
          data-testid='autocomplete-item'>
          {movie.Title}
        </li>
      ))}
    </ul>
  ),
}));

const mockedUseAppSelector = useAppSelector as unknown as Mock;
const mockedUseAppDispatch = useAppDispatch as unknown as Mock;
const mockedUseDebounce = useDebounce as unknown as Mock;
const mockedAutocompleteSearch = autocompleteSearch as unknown as Mock;
const mockedResetMovies = resetMovies as unknown as Mock;
const mockedSetQuery = setQuery as unknown as Mock;
const mockedFetchMovies = fetchMovies as unknown as Mock;

function mockState(state: any) {
  mockedUseAppSelector.mockImplementation((selector: any) => selector(state));
}

describe('SearchBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseAppDispatch.mockReturnValue(vi.fn());
    mockedUseDebounce.mockImplementation((value: string) => value);
  });

  it('renders with initial global query from store', () => {
    mockState({
      movies: {
        query: 'Batman',
      },
    });

    render(<SearchBar />);

    const input = screen.getByLabelText('Search movies') as HTMLInputElement;
    expect(input.value).toBe('Batman');
  });

  it('fetches autocomplete suggestions when typing (debounced)', async () => {
    mockState({
      movies: {
        query: '',
      },
    });

    mockedAutocompleteSearch.mockResolvedValue([
      {
        Title: 'Batman Begins',
        Year: '2005',
        imdbID: 'tt0372784',
        Poster: 'poster-url',
        Type: 'movie',
      },
    ]);

    render(<SearchBar />);

    const input = screen.getByLabelText('Search movies') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Bat' } });

    await waitFor(() => {
      expect(mockedAutocompleteSearch).toHaveBeenCalledWith('Bat');
    });

    const list = await screen.findByTestId('autocomplete-list');
    expect(list).toBeInTheDocument();

    const items = screen.getAllByTestId('autocomplete-item');
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent('Batman Begins');
  });

  it('submits search and dispatches actions on form submit', () => {
    const mockDispatch = vi.fn();
    mockedUseAppDispatch.mockReturnValue(mockDispatch);

    mockState({
      movies: {
        query: '',
      },
    });

    mockedResetMovies.mockReturnValue({ type: 'movies/resetMovies' });
    mockedSetQuery.mockImplementation((payload: string) => ({
      type: 'movies/setQuery',
      payload,
    }));
    mockedFetchMovies.mockImplementation((payload: any) => ({
      type: 'movies/fetchMovies',
      payload,
    }));

    render(<SearchBar />);

    const input = screen.getByLabelText('Search movies') as HTMLInputElement;
    const submitButton = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'Inception' } });
    fireEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalledTimes(3);

    expect(mockDispatch).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ type: 'movies/resetMovies' })
    );

    expect(mockDispatch).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: 'movies/setQuery',
        payload: 'Inception',
      })
    );

    expect(mockDispatch).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        type: 'movies/fetchMovies',
        payload: { query: 'Inception', page: 1 },
      })
    );
  });

  it('selecting an autocomplete suggestion dispatches search with that value', async () => {
    const mockDispatch = vi.fn();
    mockedUseAppDispatch.mockReturnValue(mockDispatch);

    mockState({
      movies: {
        query: '',
      },
    });

    mockedAutocompleteSearch.mockResolvedValue([
      {
        Title: 'The Dark Knight',
        Year: '2008',
        imdbID: 'tt0468569',
        Poster: 'poster-url',
        Type: 'movie',
      },
    ]);

    render(<SearchBar />);

    const input = screen.getByLabelText('Search movies') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Dark' } });

    await waitFor(() => {
      expect(mockedAutocompleteSearch).toHaveBeenCalledWith('Dark');
    });

    const item = await screen.findByTestId('autocomplete-item');
    fireEvent.click(item);

    expect(mockDispatch).toHaveBeenCalledTimes(3);

    expect(mockDispatch).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ type: 'movies/resetMovies' })
    );

    expect(mockDispatch).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: 'movies/setQuery',
        payload: 'The Dark Knight',
      })
    );

    expect(mockDispatch).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        type: 'movies/fetchMovies',
        payload: { query: 'The Dark Knight', page: 1 },
      })
    );
  });
});
