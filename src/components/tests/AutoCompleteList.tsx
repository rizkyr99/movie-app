import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import AutoCompleteList from '../AutoCompleteList';
import type { Movie } from '../../types/movie';

const mockResults: Movie[] = [
  {
    imdbID: 'tt0372784',
    Title: 'Batman Begins',
    Year: '2005',
    Poster: 'https://example.com/batman.jpg',
    Type: 'movie',
  },
  {
    imdbID: 'tt0468569',
    Title: 'The Dark Knight',
    Year: '2008',
    Poster: 'https://example.com/dark-knight.jpg',
    Type: 'movie',
  },
];

describe('AutoCompleteList', () => {
  it('returns null when results list is empty', () => {
    const { container } = render(
      <AutoCompleteList results={[]} onSelect={vi.fn()} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders list items for each result', () => {
    render(<AutoCompleteList results={mockResults} onSelect={vi.fn()} />);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(mockResults.length);

    expect(screen.getByText('Batman Begins')).toBeInTheDocument();
    expect(screen.getByText('The Dark Knight')).toBeInTheDocument();
  });

  it('calls onSelect with movie title when an item is clicked (mouse down)', () => {
    const handleSelect = vi.fn();

    render(<AutoCompleteList results={mockResults} onSelect={handleSelect} />);

    const firstItem = screen.getByText('Batman Begins');

    fireEvent.mouseDown(firstItem);

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith('Batman Begins');
  });
});
