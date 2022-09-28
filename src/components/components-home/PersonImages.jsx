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
    flex-direction: column;
  }
`;
const Image = styled.div`
  @media (max-width: 1268px) {
    display: flex;

    align-items: center;
    justify-content: center;
  }
`;
const PersonImages = () => {
  const [movie, setMovie] = useState([]);

  function Count() {
    const results = movie.length;
    return results;
  }
  useEffect(() => {
    axios.get(`${MovieUrl}/person/${id}/images?${apiKey}`).then((response) => {
      const results = response.data.profiles;
      setMovie(results);
    });
  }, []);

  const { id } = useParams();

  return (
    <Movies key={movie.id}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <h2 style={{ fontWeight: '300' }}>Photos</h2>
        <p style={{ color: '#999', height: '12px' }}> {Count()} Images</p>
      </div>
      <Image style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap' }}>
        {movie.map((movie, index) => (
          <div key={index} style={{ margin: '5px' }}>
            <img
              style={{ width: '220px' }}
              src={imageUrl + movie.file_path}
              alt=''
            />
          </div>
        ))}
      </Image>
    </Movies>
  );
};

export default PersonImages;
