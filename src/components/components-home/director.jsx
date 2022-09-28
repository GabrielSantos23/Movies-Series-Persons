import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios, { Axios } from 'axios';
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

function Director() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}/credits?${apiKey}`)
      .then((response) => {
        const results = response.data.crew.filter(
          ({ job }) => job === 'Director'
        );

        setMovie(results);
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }} key={movie.id}>
      {movie.map((movies, index) => (
        <Link to={`/person/${movies.id}`} key={index}>
          <p
            style={{ textDecoration: 'underline', color: '#1d9bf0' }}
            key={index}
          >
            {movies.name}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default Director;
