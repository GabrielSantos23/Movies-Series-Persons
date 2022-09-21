import { useHorizontalScroll } from './components-home/HorizontalScroll';
const imageUrl = import.meta.env.VITE_IMG;

const SearchResults = ({ movie, movies, showLink = true }) => {
  return (
    <div className='moviescontainer'>
      <div className='img-div'>
        <a href={`/serie/${movie.id}`}>
          <img
            onError={(e) => {
              if (e.target.src !== movie.poster_path) {
                e.target.onerror = null;
                e.target.src = 'https://i.mydramalist.com/vEAp2_4f.jpg';
              }
            }}
            style={{ borderRadius: 5 }}
            src={imageUrl + movie.poster_path}
            alt=''
          />
        </a>
      </div>
      <p style={{ fontSize: '15px', marginTop: '10px' }}>{movie.name}</p>
      <p style={{ fontSize: '12px' }}>{movie.vote_count} Reviews</p>
    </div>
  );
};

export default SearchResults;
