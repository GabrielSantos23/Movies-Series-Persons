import { useState, useEffect, Component } from 'react';
import { renderMatches, useParams } from 'react-router-dom';
import Iframe from 'react-iframe';
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const Video = import.meta.env.VITE_VIDEO_LINK;
import { BsPlayFill } from 'react-icons/bs';

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data.results[1]);
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}/videos?${apiKey}`;

    getMovie(movieUrl);
  }, []);
  return (
    <div>
      <div className='btns'>
        <a href={Video + movie.key} target='_blank' className='btn1'>
          <BsPlayFill />
        </a>
        <button className='btn2'>+</button>
      </div>
    </div>
  );
}

export default Movie;
