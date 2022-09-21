import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import image from '../../assets/imagebackground.png';
import { motion } from 'framer-motion';
const SeriesURL = import.meta.env.VITE_API_SERIES;
const apiKey = import.meta.env.VITE_API_KEY;
const Video = import.meta.env.VITE_VIDEO_LINK;

const animations = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0 },
};

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  const getBackdrop = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data.results);
  };

  useEffect(() => {
    const movieUrl = `${SeriesURL}${id}/videos?${apiKey}`;
    console.log(movieUrl);
    getBackdrop(movieUrl);
  }, []);
  return (
    <div
      style={{
        marginLeft: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      {movie &&
        movie.map((movie, index) => (
          <a
            key={index}
            href={Video + movie.key}
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src={`https://img.youtube.com/vi/${movie.key}/mqdefault.jpg`}
              style={{
                backgroundColor: '#202124',
                height: '180px',
                width: '300px',
              }}
              alt=''
            />
          </a>
        ))}
    </div>
  );
}

export default Movie;
