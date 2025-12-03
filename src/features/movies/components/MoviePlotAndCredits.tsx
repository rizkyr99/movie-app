interface MoviePlotAndCreditsProps {
  Plot?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
}

const MoviePlotAndCredits = ({
  Plot,
  Director,
  Writer,
  Actors,
}: MoviePlotAndCreditsProps) => {
  const plotText = Plot && Plot !== 'N/A' ? Plot : 'No plot summary available.';

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
      <div className='col-span-2'>
        <h2 className='text-3xl font-black mb-4'>Plot Summary</h2>
        <p className='text-gray-300'>{plotText}</p>
      </div>
      <div className='space-y-6 lg:border-l lg:border-gray-700 lg:pl-6'>
        <div>
          <h2 className='text-xl font-black'>Director</h2>
          <p className='text-gray-300'>{Director}</p>
        </div>
        <div>
          <h2 className='text-xl font-black'>Writers</h2>
          <p className='text-gray-300'>{Writer}</p>
        </div>
        <div>
          <h2 className='text-xl font-black'>Lead Actors</h2>
          <p className='text-gray-300'>{Actors}</p>
        </div>
      </div>
    </div>
  );
};

export default MoviePlotAndCredits;
