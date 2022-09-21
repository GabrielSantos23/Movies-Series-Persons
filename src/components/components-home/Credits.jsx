import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

function Genere() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data.Crew);
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?${apiKey}`;

    getMovie(movieUrl);
  }, []);

  return (
    <div style={{ display: 'flex', opacity: '0.8' }}>
      {movie &&
        movie.map((movie) => (
          <p>
            {movie.name}&nbsp; <span style={{ opacity: 0.5 }}>|</span> &nbsp;{' '}
          </p>
        ))}
    </div>
  );
}

export default Genere;
