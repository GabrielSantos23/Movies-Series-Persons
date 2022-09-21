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

    setMovie(data.genres);
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?${apiKey}`;

    getMovie(movieUrl);
  }, []);

  return (
    <div style={{ display: 'flex' }} key={movie.id}>
      {movie.map((movies, index) => (
        <p key={index}>{movies.name} , | </p>
      ))}
    </div>
  );
}

export default Genere;
