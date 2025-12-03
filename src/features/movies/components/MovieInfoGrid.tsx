import InfoTile from './InfoTile';

interface MovieInfoGridProps {
  BoxOffice?: string;
  Awards?: string;
  Production?: string;
  Website?: string;
  Metascore?: string;
  DVD?: string;
}

const MovieInfoGrid = ({
  BoxOffice,
  Awards,
  Production,
  Website,
  Metascore,
  DVD,
}: MovieInfoGridProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6'>
      <InfoTile title='Box Office' value={BoxOffice} />
      <InfoTile title='Awards' value={Awards} />
      <InfoTile title='Production' value={Production} />
      <InfoTile title='Website' value={Website} />
      <InfoTile title='Metascore' value={Metascore} />
      <InfoTile title='DVD Release' value={DVD} />
    </div>
  );
};

export default MovieInfoGrid;
