import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SeriesURL = import.meta.env.VITE_API_SERIES;

const apiKey = import.meta.env.VITE_API_KEY;

function SerieProduction() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data.production_companies);
  };

  useEffect(() => {
    const movieUrl = `${SeriesURL}${id}?${apiKey}`;

    getMovie(movieUrl);
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {movie &&
        movie.map((movie) => (
          <div key={movie.id}>
            <p>
              {movie.name}&nbsp; <span>|</span> &nbsp;{' '}
            </p>
          </div>
        ))}
    </div>
  );
}

export default SerieProduction;
