import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import movieDetailReducer from './movieDetailSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieDetails: movieDetailReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
