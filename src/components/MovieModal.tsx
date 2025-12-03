import { X } from 'lucide-react';

interface MovieModalProps {
  isOpen: boolean;
  posterUrl: string;
  title: string;
  onClose: () => void;
}

const MovieModal = ({ isOpen, posterUrl, title, onClose }: MovieModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className='fixed inset-0 bg-black/90 flex items-center justify-center'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='relative bg-gray-900 p-6 rounded-xl w-full max-w-xl max-h-screen overflow-y-auto'
        role='dialog'
        aria-modal='true'>
        <button
          className='absolute top-6 right-6 cursor-pointer p-1 bg-white/25 rounded-full'
          onClick={onClose}>
          <X className='size-4' />
        </button>
        <p className='text-xl font-bold mb-4 pr-8'>{title}</p>
        <img src={posterUrl} alt={title} className='w-full rounded-lg' />
      </div>
    </div>
  );
};

export default MovieModal;
