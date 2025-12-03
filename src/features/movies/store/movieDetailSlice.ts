import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMovieById } from '../../../shared/api/omdb';
import type { MovieDetail } from '../types';

interface MovieDetailState {
  movie: MovieDetail | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MovieDetailState = {
  movie: null,
  status: 'idle',
  error: null,
};

export const fetchMovieDetail = createAsyncThunk<
  MovieDetail,
  string,
  { rejectValue: string }
>(
  'movieDetail/fetchMovieDetail',
  async (imdbID: string, { rejectWithValue }) => {
    try {
      const data = await getMovieById(imdbID);
      if (data.Response === 'False') {
        return rejectWithValue(data.Error || 'No results');
      }

      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Unknown error');
    }
  }
);

const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState,
  reducers: {
    clearMovieDetail(state) {
      state.movie = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetail.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movie = action.payload;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { clearMovieDetail } = movieDetailSlice.actions;
export default movieDetailSlice.reducer;
