import { useState, useEffect, Component } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../pages/Movie.css';
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const ImgUrl = import.meta.env.VITE_IMG;

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data.results);
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}/similar?${apiKey}`;
    console.log(movieUrl);
    getMovie(movieUrl);
  }, []);
  return (
    <div>
      <h2>Similar</h2>
      <div className='similar'>
        {movie &&
          movie.map((movie) => (
            <a href={`/movie/${movie.id}`}>
              <img
                className='img-recommendations'
                src={ImgUrl + movie.poster_path}
                alt=''
              />
            </a>
          ))}
      </div>
    </div>
  );
}

export default Movie;
