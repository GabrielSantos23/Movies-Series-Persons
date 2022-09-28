import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import image from '../../assets/imagebackground.png';
import { motion } from 'framer-motion';
import axios from 'axios';
const SeriesURL = import.meta.env.VITE_API_SERIES;
const apiKey = import.meta.env.VITE_API_KEY;
const Video = import.meta.env.VITE_VIDEO_LINK;

const animations = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0 },
};

function Episodes() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}?${apiKey}&append_to_response=season/1,season/2,season/3,season/4,season/5,season/6,season/7,season/8,season/9,season/10,season/11,`
      )
      .then((response) => {
        const results = response.data;
        setEpisodes(results);
        console.log(results);
      });
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
        gap: '10px',
      }}
    >
      {episodes.map((episodes) => (
        <>
          <p>{episodes.air_date}</p>
        </>
      ))}
    </div>
  );
}

export default Episodes;
