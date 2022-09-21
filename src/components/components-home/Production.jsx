import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import placeholder from '../../assets/placeholder.png';
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

function Production() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data.production_companies);
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?${apiKey}`;

    getMovie(movieUrl);
  }, []);

  return (
    <div style={{ display: 'flex' }} key={movie.id}>
      {movie &&
        movie.map((movie) => (
          <div key={movie.id}>
            <p>
              {movie.name}&nbsp; <span>|</span> &nbsp;
            </p>
          </div>
        ))}
    </div>
  );
}

export default Production;
