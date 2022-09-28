import { useState, useEffect, Component } from 'react';
import { renderMatches, useParams } from 'react-router-dom';
import Iframe from 'react-iframe';
import Posters from './Posters';
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_URL_BACKGROUND;
import Modal from 'react-modal';
import image from '../../assets/backgroundbackdrop.png';
import { Link } from 'react-router-dom';
import { BsPlayFill } from 'react-icons/bs';
import Skeleton from 'react-loading-skeleton';
import BasicModal from './Modal';
function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch(`${moviesURL}${id}/images?${apiKey}`);
      const data = await res.json();
      setMovie(data.backdrops);
      setIsLoading(false);
    });
  }, []);
  /*const getBackdrop = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setIsLoading(false);
    setMovie(data.backdrops);
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}/images?${apiKey}`;
    console.log(movieUrl);
    getBackdrop(movieUrl);
  }, []);
*/
  return (
    <div>
      {isLoading ? null : (
        <>
          <h1
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '10px',
              alignItems: 'flex-start',
            }}
          >
            Backdrops
          </h1>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            {movie &&
              movie.map((movie, index) => (
                <div key={index} style={{ marginLeft: '10px' }}>
                  {isLoading ? (
                    <Skeleton width={300} height={180} />
                  ) : (
                    <a
                      href={`https://image.tmdb.org/t/p/original${movie.file_path}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <img
                        loading='lazy'
                        style={{
                          marginLeft: 2,
                          marginBottom: 0,
                          height: '180px',
                          backgroundColor: '#202124',
                          width: 300,
                          backgroundImage: `url(${image}`,
                        }}
                        src={
                          imageUrl + movie.file_path || (
                            <Skeleton count={4} width={200} height={200} />
                          )
                        }
                        alt=''
                      />
                    </a>
                  )}
                </div>
              ))}
          </div>
        </>
      )}

      <Posters />
    </div>
  );
}

export default Movie;
