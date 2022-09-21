import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const Video = import.meta.env.VITE_VIDEO_LINK;
import Skeleton from 'react-loading-skeleton';

import { BsPlayFill } from 'react-icons/bs';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import image from '../../assets/imagebackground.png';

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getBackdrop = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data.results);
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}/videos?${apiKey}`;
    console.log(movieUrl);
    getBackdrop(movieUrl);
    setIsLoading(false);
  }, []);
  /* useEffect(() => {
    setTimeout(async () => {
      const res = await fetch(`${moviesURL}${id}/videos?${apiKey}`);
      const data = await res.json();
      setMovie(data.results);
      setIsLoading(false);
    });
  });
  */
  const animations = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0 },
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxwidth: '1900px',
          }}
        >
          {isLoading ? (
            <Skeleton width={320} height={180} />
          ) : (
            <>
              {movie &&
                movie.map((movie) => (
                  <div className='' style={{ margin: '0.1%' }} key={movie.id}>
                    <a
                      href={Video + movie.key}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <img
                        src={`https://img.youtube.com/vi/${movie.key}/mqdefault.jpg`}
                        alt=''
                      />
                    </a>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Movie;
