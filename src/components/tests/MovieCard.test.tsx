import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';
import MovieCard from '../MovieCard';
import type { Movie } from '../../types/movie';

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

const baseMovie: Movie = {
  imdbID: 'tt0372784',
  Title: 'Batman Begins',
  Year: '2005',
  Poster: 'https://example.com/poster.jpg',
  Type: 'movie',
};

describe('MovieCard', () => {
  it('renders movie title, year, and poster', () => {
    const handleClick = vi.fn();

    renderWithRouter(<MovieCard movie={baseMovie} onClick={handleClick} />);

    expect(screen.getByText('Batman Begins')).toBeInTheDocument();
    expect(screen.getByText('2005')).toBeInTheDocument();

    const img = screen.getByAltText('Batman Begins') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(baseMovie.Poster);
  });

  it('calls onClick with poster and title when image is clicked', () => {
    const handleClick = vi.fn();

    renderWithRouter(<MovieCard movie={baseMovie} onClick={handleClick} />);

    const img = screen.getByAltText('Batman Begins');

    fireEvent.click(img);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(baseMovie.Poster, baseMovie.Title);
  });

  it('uses fallback image when Poster is "N/A"', () => {
    const handleClick = vi.fn();

    const movieWithNoPoster: Movie = {
      ...baseMovie,
      Poster: 'N/A',
    };

    renderWithRouter(
      <MovieCard movie={movieWithNoPoster} onClick={handleClick} />
    );

    const img = screen.getByAltText('Batman Begins') as HTMLImageElement;

    expect(img.src).toBe('https://placehold.co/200x300?text=No+Image');
  });

  it('uses fallback image when image loading fails (onError)', () => {
    const handleClick = vi.fn();

    renderWithRouter(<MovieCard movie={baseMovie} onClick={handleClick} />);

    const img = screen.getByAltText('Batman Begins') as HTMLImageElement;

    // Simulate image error
    fireEvent.error(img);

    expect(img.src).toBe('https://placehold.co/200x300?text=No+Image');
  });

  it('renders a link to the movie details page', () => {
    const handleClick = vi.fn();

    renderWithRouter(<MovieCard movie={baseMovie} onClick={handleClick} />);

    const link = screen.getByRole('link', { name: /view details/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/movie/${baseMovie.imdbID}`);
  });
});
