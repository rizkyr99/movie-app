import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../../features/movies/store/moviesSlice';
import movieDetailReducer from '../../features/movies/store/movieDetailSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieDetails: movieDetailReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
