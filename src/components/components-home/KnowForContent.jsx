const imageUrl = import.meta.env.VITE_IMG;
import backgroundImg from '../../assets/imagebackground.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Pa = styled.p`
  white-space: nowrap;
  width: 300px;
  overflow: -moz-hidden-unscrollable;
`;

const KnowForContent = ({ movie }) => {
  return (
    <div className='' style={{ marginLeft: '10px', marginBottom: '20px' }}>
      <img
        style={{ width: '300px' }}
        src={imageUrl + movie.poster_path}
        alt=''
        onError={(e) => {
          if (e.target.src !== movie.profile_path) {
            e.target.onerror = null;
            e.target.src = 'https://i.mydramalist.com/vEAp2_4f.jpg';
          }
        }}
      />
      <Link to={`/movie/${movie.id}`} href={`Movie/${movie.id}`}>
        <Pa className='index' style={{ maxWidth: '200px' }}>
          {movie.title}
        </Pa>
      </Link>
      <Link to={`/serie/${movie.id}`}>
        <Pa style={{ maxWidth: '200px' }}>{movie.name}</Pa>
      </Link>
    </div>
  );
};

export default KnowForContent;
