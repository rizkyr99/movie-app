import axios from 'axios';
import type { Movie } from '../types/movie';

const API_KEY = '21a13816';

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

export const autocompleteSearch = async (query: string) => {
  const data = await searchMovies({ query, page: 1 });
  if (data.Response === 'True') {
    return data.Search?.slice(0, 5);
  }
  return [];
};
