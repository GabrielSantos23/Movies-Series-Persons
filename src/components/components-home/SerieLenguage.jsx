import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SeriesURL = import.meta.env.VITE_API_SERIES;

const apiKey = import.meta.env.VITE_API_KEY;

function SeriesLenguage() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data.spoken_languages);
  };

  useEffect(() => {
    const movieUrl = `${SeriesURL}${id}?${apiKey}`;

    getMovie(movieUrl);
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      {movie &&
        movie.map((movie, index) => (
          <div key={index}>
            <p>{movie.name}&nbsp; &nbsp; </p>
          </div>
        ))}
    </div>
  );
}

export default SeriesLenguage;
