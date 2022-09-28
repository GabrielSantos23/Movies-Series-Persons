import { useState, useEffect, Component } from 'react';
import { renderMatches, useParams } from 'react-router-dom';
import Iframe from 'react-iframe';
const SeriesURL = import.meta.env.VITE_API_SERIES;

const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_URL_BACKGROUND;
import Loading from '../../assets/Infinity-1s-200px.svg';

import { BsPlayFill } from 'react-icons/bs';

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // posters

  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch(`${SeriesURL}${id}/images?${apiKey}`);
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
          <img loading='lazy' width={100} src={Loading} />
        </div>
      ) : (
        <>
          <h1
            style={{
              marginTop: '40px',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '10px',
            }}
          >
            Posters
          </h1>
          <div
            style={{
              marginLeft: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginRight: '50px',
            }}
          >
            {movie &&
              movie.map((movie, index) => (
                <img
                  loading='lazy'
                  key={index}
                  style={{
                    marginLeft: 3,

                    marginBottom: 50,
                    backgroundColor: '#202124',
                    width: 200,
                    height: 300,
                  }}
                  src={imageUrl + movie.file_path}
                  alt=''
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Movie;
