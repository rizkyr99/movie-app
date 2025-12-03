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
      className='fixed inset-0 bg-black/50 flex items-center justify-center'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='relative bg-gray-800 p-6 rounded-xl w-full max-w-xl max-h-screen overflow-y-auto'
        role='dialog'
        aria-modal='true'>
        <button
          className='absolute top-4 right-4 cursor-pointer'
          onClick={onClose}>
          X
        </button>
        <img src={posterUrl} alt={title} className='w-full' />
        <p className='text-lg font-bold mt-2'>{title}</p>
      </div>
    </div>
  );
};

export default MovieModal;
