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
const getFirstWord = (str) => {
  let strArr = str.split('-');
  if (strArr.length > 0) {
    return strArr[0];
  }
  return '';
};
const CreditsPerson = () => {
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
        console.log(results);
        setSerie(results);
      });
  }, []);

  const { id } = useParams();

  return (
    <div style={{}}>
      <h2 style={{ marginBottom: '20px', fontWeight: '300' }}>Movies</h2>

      <>
        {movie &&
          movie
            .sort((a, b) => (a.release_date < b.release_date ? 1 : -1))
            .map((movie, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  gap: '10px',
                  width: '100%',
                  height: 'auto',
                  backgroundColor: '#202124',
                  marginBottom: '4px',
                  alignItems: 'center',
                  padding: '20px',
                }}
              >
                {movie.release_date.length > 0 ? (
                  <>
                    {' '}
                    <p>{getFirstWord(movie.release_date)}</p>
                    <Link to={`/movie/${movie.id}`}>
                      <p>{movie.title}</p>
                    </Link>
                    <p style={{ color: '#999' }}>{movie.character}</p>
                  </>
                ) : (
                  <>
                    <p style={{ marginRight: '20px', fontSize: '20px' }}>-</p>
                    <Link to={`/movie/${movie.id}`}>
                      <p>{movie.title}</p>
                    </Link>
                    <p style={{ color: '#999' }}>{movie.character}</p>
                  </>
                )}
              </div>
            ))}
      </>

      <>
        <h2
          style={{ marginTop: '20px', marginBottom: '20px', fontWeight: '300' }}
        >
          Series
        </h2>
        {serie &&
          serie
            .sort((a, b) => (a.first_air_date < b.first_air_date ? 1 : -1))
            .map((serie, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  gap: '10px',
                  width: '100%',
                  height: 'auto',
                  backgroundColor: '#202124',
                  marginBottom: '4px',
                  alignItems: 'center',
                  padding: '20px',
                }}
              >
                <>
                  {' '}
                  <p>{getFirstWord(serie.first_air_date)}</p>
                  <Link to={`/serie/${serie.id}`}>
                    <p>{serie.name}</p>
                  </Link>
                  <p style={{ color: '#999' }}>{serie.character}</p>
                </>
              </div>
            ))}
      </>
    </div>
  );
};

export default CreditsPerson;
