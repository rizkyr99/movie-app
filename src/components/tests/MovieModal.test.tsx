// src/components/tests/MovieModal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import MovieModal from '../MovieModal';

vi.mock('lucide-react', () => ({
  X: (props: any) => <svg data-testid='close-icon' {...props} />,
}));

describe('MovieModal', () => {
  const defaultProps = {
    isOpen: true,
    posterUrl: 'https://example.com/poster.jpg',
    title: 'Batman Begins',
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns null when isOpen is false', () => {
    const { container } = render(
      <MovieModal
        isOpen={false}
        posterUrl={defaultProps.posterUrl}
        title={defaultProps.title}
        onClose={defaultProps.onClose}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders title and image when open', () => {
    render(<MovieModal {...defaultProps} />);

    expect(screen.getByText('Batman Begins')).toBeInTheDocument();

    const img = screen.getByAltText('Batman Begins') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(defaultProps.posterUrl);
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();

    render(<MovieModal {...defaultProps} onClose={onClose} />);

    const dialog = screen.getByRole('dialog');
    const backdrop = dialog.parentElement as HTMLElement;

    fireEvent.click(backdrop);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside dialog content', () => {
    const onClose = vi.fn();

    render(<MovieModal {...defaultProps} onClose={onClose} />);

    const dialog = screen.getByRole('dialog');

    fireEvent.click(dialog);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();

    render(<MovieModal {...defaultProps} onClose={onClose} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('uses fallback image when posterUrl is missing', () => {
    render(
      <MovieModal
        isOpen={true}
        // force undefined through TS
        posterUrl={undefined as unknown as string}
        title='No Poster Movie'
        onClose={vi.fn()}
      />
    );

    const img = screen.getByAltText('No Poster Movie') as HTMLImageElement;
    expect(img.src).toBe('https://placehold.co/200x300?text=No+Image');
  });

  it('uses fallback image when image load fails (onError)', () => {
    render(<MovieModal {...defaultProps} />);

    const img = screen.getByAltText('Batman Begins') as HTMLImageElement;

    fireEvent.error(img);

    expect(img.src).toBe('https://placehold.co/200x300?text=No+Image');
  });
});
