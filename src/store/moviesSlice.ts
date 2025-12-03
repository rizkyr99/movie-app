import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { searchMovies } from '../api/omdb';
import type { Movie } from '../types/movie';

export const fetchMovies = createAsyncThunk<
  {
    movies: Movie[];
    totalResults: number;
    page: number;
    query: string;
  },
  { query: string; page: number },
  { rejectValue: string }
>('movies/fetchMovies', async ({ query, page }, { rejectWithValue }) => {
  try {
    const data = await searchMovies({ query, page });
    if (data.Response === 'False') {
      return rejectWithValue(data.Error || 'No results');
    }
    return {
      movies: data?.Search || [],
      totalResults: Number(data.totalResults),
      page,
      query,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue('Unknown error');
  }
});

interface MoviesState {
  query: string;
  items: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  totalResults: number;
  page: number;
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  query: 'Batman',
  items: [],
  status: 'idle',
  totalResults: 0,
  page: 1,
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.items = [];
      state.page = 1;
      state.totalResults = 0;
      state.status = 'idle';
      state.error = null;
    },
    resetMovies(state) {
      state.items = [];
      state.page = 1;
      state.totalResults = 0;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';

        const { movies, totalResults, page, query } = action.payload;

        state.query = query;
        state.totalResults = totalResults;
        state.page = page;

        if (page > 1) {
          state.items = [...state.items, ...movies];
        } else {
          state.items = movies;
        }
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload ?? 'Something went wrong';
      });
  },
});

export const { setQuery, resetMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
