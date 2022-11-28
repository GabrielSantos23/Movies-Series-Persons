import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
const imageUrl = import.meta.env.VITE_IMG;
const SeriesUrl = import.meta.env.VITE_API_SERIES;
const apiKey = import.meta.env.VITE_API_KEY;
const Background = import.meta.env.VITE_URL_BACKGROUND;
import LinesEllipsis from 'react-lines-ellipsis';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import template from '../assets/backgroundbackdrop.png';
import RecommendationsSeries from './SerieRecommendations';
const Div = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  @media only screen and (max-width: 1250px) {
    justify-content: center;
  }
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 400;
    max-width: 350px;
  }
  .overview {
    font-size: 12px;
    color: #ffffffe8;
  }
  .date {
    font-weight: 400;
    color: #999;
    font-size: 14px;
    max-width: 350px;
    margin-top: 10px;
    margin-bottom: 15px;
  }
  p {
    max-width: 400px;
    font-size: 18px;
  }
  div {
    display: flex;
    flex-direction: column;
    img {
      width: 400px;
      background-color: #222222;
      height: 230px;
      @media only screen and (max-width: 500px) {
        width: 350px;
        height: 230px;
      }
    }
  }
`;
const Select = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  p {
    margin-top: -15px;
    color: #999;
    font-size: 13px;
  }
  select {
    z-index: 100;
    background-color: #202124;
    border: none;
    color: white;
    padding: 12px;
    margin-bottom: 15px;
  }
`;

const Episodes = () => {
  const [serie, setSerie] = useState(null);
  const [episodes, setEpisodes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [teste, setTeste] = useState(1);
  const id = useParams();
  const id2 = id.id;
  useEffect(() => {
    axios.get(`${SeriesUrl}${id2}?${apiKey}`).then((response) => {
      const results = response.data.seasons;
      setIsLoading(false);
      setSerie(results);
    });
  }, []);
  useEffect(() => {
    axios
      .get(`${SeriesUrl}${id2}/season/${teste}?${apiKey}`)
      .then((response) => {
        const results2 = response.data.episodes;
        setEpisodes(results2);
        setIsLoading(false);
      });
  }, []);

  const handleChange = () => {
    axios
      .get(`${SeriesUrl}${id2}/season/${teste}?${apiKey}`)
      .then((response) => {
        const results2 = response.data.episodes;
        setEpisodes(results2);
        setIsLoading(false);
      });
  };
  function Count() {
    const results = episodes?.length;
    return results;
  }
  return (
    <>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <>
          <Select>
            <select
              onClick={handleChange}
              onChange={(e) => setTeste(e.target.value)}
              value={teste || 1}
            >
              {serie?.map((e) => (
                <option
                  onClick={handleChange}
                  value={e.season_number}
                  key={e.id}
                >
                  {e.name}
                </option>
              ))}
            </select>
            <p>{Count()} Episodes</p>
          </Select>
          <Div>
            {episodes?.map((e) => (
              <div key={e.id}>
                <div>
                  <img
                    src={e.still_path ? imageUrl + e.still_path : template}
                    alt=''
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <p style={{ color: '#1D9BF0' }}>
                      E0{e.episode_number} &nbsp;
                    </p>
                    <h3>{e.name}</h3>
                  </div>
                  <LinesEllipsis
                    style={{
                      maxWidth: '400px',
                      fontSize: '12px',
                      marginTop: '5px',
                    }}
                    text={e.overview}
                    maxLine='3'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                  />
                  <span className='date'>{e.air_date}</span>
                </div>
              </div>
            ))}
          </Div>
          <div style={{ position: 'absolute' }}>
            <RecommendationsSeries />
          </div>
        </>
      )}
    </>
  );
};

export default Episodes;
