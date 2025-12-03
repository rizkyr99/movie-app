import { Clapperboard } from 'lucide-react';

interface MovieEmptyProps {
  title: string;
  description: string;
}

const MovieEmpty = ({ title, description }: MovieEmptyProps) => {
  return (
    <div className='flex flex-col items-center gap-y-4'>
      <div className='size-24 rounded-full bg-gray-800 flex items-center justify-center'>
        <Clapperboard className='size-12 text-gray-300' />
      </div>
      <p className='text-3xl font-black'>{title}</p>
      <p className='text-center text-gray-300 max-w-sm'>{description}</p>
    </div>
  );
};

export default MovieEmpty;
