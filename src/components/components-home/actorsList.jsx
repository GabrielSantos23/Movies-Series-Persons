const imageUrl = import.meta.env.VITE_IMG;

const ActorsCard = ({ movie }) => {
  return (
    <div className='card'>
      <div className='card-top'>
        <a href={`movie/${movie.id}`}>
          <img
            style={{ width: '200px' }}
            src={imageUrl + movie.profile_path}
            alt=''
          />
        </a>
        <h2>{movie.name}</h2>
      </div>
    </div>
  );
};

export default ActorsCard;
