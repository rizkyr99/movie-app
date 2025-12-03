import axios from 'axios';
import type { Movie, MovieDetail } from '../../features/movies/types';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const omdbClient = axios.create({
  baseURL: 'https://www.omdbapi.com',
  params: {
    apiKey: API_KEY,
  },
});

export interface OmdbSearchResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: 'True' | 'False';
  Error?: string;
}

export interface SearchMoviesParams {
  query: string;
  page?: number;
}

export const searchMovies = async ({
  query,
  page = 1,
}: SearchMoviesParams): Promise<OmdbSearchResponse> => {
  if (!query) return { Search: [], totalResults: '0', Response: 'False' };

  const res = await omdbClient.get('', {
    params: { s: query, page },
  });

  return res.data;
};

export const getMovieById = async (imdbID: string): Promise<MovieDetail> => {
  const res = await omdbClient.get('', {
    params: { i: imdbID, plot: 'full' },
  });
  return res.data;
};

export const autocompleteSearch = async (query: string) => {
  const data = await searchMovies({ query, page: 1 });
  if (data.Response === 'True') {
    return data.Search?.slice(0, 5);
  }
  return [];
};
