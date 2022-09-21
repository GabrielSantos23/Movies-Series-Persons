import { useState, useEffect, Component } from 'react';
import './banner.css';
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const ImageUrl = import.meta.env.VITE_URL_BACKGROUND;

import { AiOutlineCalendar, AiFillStar } from 'react-icons/ai';
import { MdHowToVote } from 'react-icons/md';

function Banner() {
  const [movie, setMovie] = useState([]);
  const [Random, setrandom] = useState(1);

  const randomN = (e) => {
    const len = movie.length;
    setrandom(Math.floor(Math.random() * len));
  };
  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data.results[5]);
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}popular?${apiKey}`;
    console.log(movieUrl);
    getMovie(movieUrl);
  }, []);

  return (
    <div className='container'>
      {movie && (
        <>
          <div
            className='banner-title'
            style={{
              height: '76vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img style={{}} src={ImageUrl + movie.backdrop_path} alt='' />
            <div
              className='text-center'
              style={{
                width: '100%',
                height: '100%',
                maxWidth: '1600px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <h1>{movie.title}</h1>
              <p>{movie.vote_count} Reviews</p>
              <p style={{ maxWidth: '50%', marginTop: '10px' }}>
                {movie.overview}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Banner;
