import { display } from '@mui/system';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import KnowForContent from './KnowForContent';

const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_IMG;
const MovieUrl = import.meta.env.VITE_API_PERSON;
const KnowFor = () => {
  const [movie, setMovie] = useState(null);

  const { id } = useParams();
  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data.cast);
    console.log(data.cast);
  };

  useEffect(() => {
    const movieUrl = `${MovieUrl}/person/${id}/combined_credits?${apiKey}`;
    getMovie(movieUrl);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',

        flexWrap: 'wrap',
      }}
    >
      {movie &&
        movie.map((movie) => <KnowForContent movie={movie} key={movie.id} />)}
    </div>
  );
};

export default KnowFor;
