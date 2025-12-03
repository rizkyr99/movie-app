import { Star } from 'lucide-react';

interface MovieRatingsProps {
  imdbRating?: string;
  imdbVotes?: string;
  Ratings?: { Source: string; Value: string }[];
}

const MovieRatings = ({
  imdbRating,
  imdbVotes,
  Ratings,
}: MovieRatingsProps) => {
  const filteredRatings =
    Ratings?.filter((r) => r.Source !== 'N/A' && r.Value !== 'N/A') ?? [];

  return (
    <>
      <div>
        <h2 className='text-xl font-black mb-1'>IMDb Rating</h2>
        <div className='flex items-center gap-2'>
          <Star className='size-8 text-amber-500 fill-amber-500' />
          <div>
            <p className='text-xl font-bold'>{imdbRating}</p>
            <p className='text-xs text-gray-300'>{imdbVotes}</p>
          </div>
        </div>
      </div>

      {filteredRatings.length > 0 && (
        <div className='flex items-center gap-8 pt-2'>
          {filteredRatings.map((rating, index) => (
            <div key={index}>
              <p className='text-gray-300 text-sm mb-1'>{rating.Source}</p>
              <p className='text-xl font-bold'>{rating.Value}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MovieRatings;
