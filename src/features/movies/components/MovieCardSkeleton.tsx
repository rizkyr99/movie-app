const MovieCardSkeleton = () => {
  return (
    <div className='animate-pulse bg-gray-900 rounded-xl overflow-hidden flex flex-col'>
      <div className='bg-gray-800 aspect-2/3' />
      <div className='p-4 space-y-2'>
        <div className='h-4 bg-gray-800 rounded' />
        <div className='h-3 bg-gray-800 rounded w-2/3' />
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
