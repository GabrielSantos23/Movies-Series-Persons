import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

function Lenguage() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data.spoken_languages);
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?${apiKey}`;

    getMovie(movieUrl);
  }, []);

  return (
    <div style={{ display: 'flex' }} key={movie.id}>
      {movie &&
        movie.map((movie, index) => (
          <div key={index}>
            <p>
              {movie.name}&nbsp; <span>|</span> &nbsp;
            </p>
          </div>
        ))}
    </div>
  );
}

export default Lenguage;
