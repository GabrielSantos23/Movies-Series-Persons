import { useState, useEffect, Component } from 'react';
import { renderMatches, useParams } from 'react-router-dom';
import Iframe from 'react-iframe';
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_IMG;

import { BsPlayFill } from 'react-icons/bs';
import Skeleton from 'react-loading-skeleton';
import Loading from '../../assets/Infinity-1s-200px.svg';

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // posters

  /* const getBackdrop = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data.posters);
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}/images?${apiKey}`;
    console.log(movieUrl);
    getBackdrop(movieUrl);
    setIsLoading(false);
  });
*/
  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch(`${moviesURL}${id}/images?${apiKey}`);
      const data = await res.json();
      setMovie(data.posters);

      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <div>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '10px',
          }}
        >
          <img style={{ width: '100px' }} src={Loading} />
        </div>
      ) : (
        <>
          <h1
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '10px',
            }}
          >
            Posters
          </h1>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginLeft: '10px',
            }}
          >
            {movie &&
              movie.map((movie, index) => (
                <div key={index} style={{ marginLeft: '10px' }}>
                  {movie.file_path ? (
                    <img
                      style={{
                        marginLeft: 2,
                        marginBottom: 50,
                        width: 200,
                        height: '300px',
                        backgroundColor: '#202124',
                      }}
                      src={
                        imageUrl + movie.file_path || (
                          <Skeleton count={4} width={200} height={200} />
                        )
                      }
                      alt=''
                    />
                  ) : (
                    <p>loading..</p>
                  )}
                </div>
              ))}
          </div>
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
            {!movie && <div> </div>}
          </div>
        </>
      )}
    </div>
  );
}

export default Movie;
