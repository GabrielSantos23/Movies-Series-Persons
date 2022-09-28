import { display } from '@mui/system';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import posterBaground from '../../assets/posterbackdrop.png';
import styled from 'styled-components';

const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_IMG;
const MovieUrl = import.meta.env.VITE_API_PERSON;

const Movies = styled.div`
  @media (max-width: 1268px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const KnowFor = () => {
  const [movie, setMovie] = useState([]);
  const [serie, setSerie] = useState([]);

  useEffect(() => {
    axios
      .get(`${MovieUrl}/person/${id}/movie_credits?${apiKey}`)
      .then((response) => {
        const results = response.data.cast;

        setMovie(results);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${MovieUrl}/person/${id}/tv_credits?${apiKey}`)
      .then((response) => {
        const results = response.data.cast;

        setSerie(results);
      });
  }, []);

  const { id } = useParams();

  return (
    <Movies
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px',
        alignItems: 'center',
      }}
    >
      {movie.map((movie) => (
        <div key={movie.id} style={{ marginBottom: '10px' }}>
          {movie.poster_path ? (
            <Link to={`/movie/${movie.id}`}>
              <img
                width={220}
                style={{ height: '350px', backgroundColor: '#202124' }}
                src={imageUrl + movie.poster_path}
                alt=''
              />
            </Link>
          ) : (
            <Link to={`/movie/${movie.id}`}>
              <img
                width={220}
                style={{ height: '350px', backgroundColor: '#202124' }}
                src={posterBaground}
                alt=''
              />
            </Link>
          )}

          <p style={{ maxWidth: '220px' }}>{movie.name}</p>
          <p style={{ maxWidth: '220px' }}>{movie.title}</p>
        </div>
      ))}

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',

          gap: '5px',
          alignItems: 'center',
        }}
      >
        {serie.map((movie) => (
          <div key={movie.id} style={{ marginBottom: '10px' }}>
            {movie.poster_path ? (
              <Link to={`/serie/${movie.id}`}>
                <img
                  width={220}
                  style={{ height: '350px', backgroundColor: '#202124' }}
                  src={imageUrl + movie.poster_path}
                  alt=''
                />
              </Link>
            ) : (
              <Link to={`/serie/${movie.id}`}>
                <img
                  width={220}
                  style={{ height: '350px', backgroundColor: '#202124' }}
                  src={posterBaground}
                  alt=''
                />
              </Link>
            )}

            <p style={{ maxWidth: '220px' }}>{movie.name}</p>
          </div>
        ))}
      </div>
    </Movies>
  );
};

export default KnowFor;
