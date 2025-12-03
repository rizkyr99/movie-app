interface InfoTileProps {
  title: string;
  value: string | undefined;
}

const InfoTile = ({ title, value }: InfoTileProps) => {
  const displayValue = value && value !== 'N/A' ? value : 'Not Available';

  const content =
    title === 'Website' &&
    displayValue !== 'Not Available' &&
    displayValue !== 'N/A' ? (
      <a
        href={displayValue}
        target='_blank'
        rel='noopener noreferrer'
        className='text-sm text-blue-400 hover:underline transition'>
        {displayValue}
      </a>
    ) : (
      <p className='text-sm text-gray-300'>{displayValue}</p>
    );

  return (
    <div>
      <h2 className='text-xl font-bold'>{title}</h2>
      {content}
    </div>
  );
};

export default InfoTile;
