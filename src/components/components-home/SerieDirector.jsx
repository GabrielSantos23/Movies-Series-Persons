import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios, { Axios } from 'axios';
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

function SerieDirector() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/tv/${id}?${apiKey}`)
      .then((response) => {
        const results = response.data.created_by;

        if (results === undefined || results.length == 0) {
        } else {
          setMovie(results);
        }
      });
  }, []);
  if (movie === undefined || movie.length === false) {
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }} key={movie.id}>
      {movie.length >= 0 ? (
        <>
          {movie.map((movies, index) => (
            <Link to={`/person/${movies.id}`} key={index}>
              <p
                style={{ textDecoration: 'underline', color: '#1d9bf0' }}
                key={index}
              >
                {movies.name}&nbsp;,&nbsp;
              </p>
            </Link>
          ))}
        </>
      ) : (
        <div>
          <p>No Info</p>
        </div>
      )}
    </div>
  );
}

export default SerieDirector;
