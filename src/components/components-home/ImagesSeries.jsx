import { useState, useEffect, Component } from 'react';
import { renderMatches, useParams } from 'react-router-dom';
import Iframe from 'react-iframe';
import Posters from './PostersSeries';
import Loading from '../../assets/Infinity-1s-200px.svg';
const SeriesURL = import.meta.env.VITE_API_SERIES;

const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_URL_BACKGROUND;

import { BsPlayFill } from 'react-icons/bs';

function ImageSeries() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // backdrops

  /*const getBackdrop = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data.backdrops);
  };
  useEffect(() => {
    const movieUrl = `${SeriesURL}${id}/images?${apiKey}`;
    console.log(movieUrl);
    getBackdrop(movieUrl);
  }, []);*/

  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch(`${SeriesURL}${id}/images?${apiKey}`);
      const data = await res.json();
      setMovie(data.backdrops);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      {isLoading ? null : (
        <>
          <h1
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '10px',
            }}
          >
            Backdrops
          </h1>
          <div
            style={{
              marginLeft: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {movie &&
              movie.map((movie) => (
                <img
                  style={{
                    marginLeft: 1,
                    marginBottom: 10,
                    width: 300,
                    height: '180px',
                    bacgkroundColor: '#202124',
                  }}
                  src={imageUrl + movie.file_path}
                  alt=''
                />
              ))}
          </div>
        </>
      )}

      <Posters />
    </div>
  );
}

export default ImageSeries;
