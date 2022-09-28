import { useState, useEffect, Component } from 'react';
import './banner.css';
import axios from 'axios';
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const ImageUrl = import.meta.env.VITE_URL_BACKGROUND;
import styled from 'styled-components';
import { AiOutlineCalendar, AiFillStar } from 'react-icons/ai';
import { MdHowToVote } from 'react-icons/md';
import { Rating } from '@mui/material';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/styles';
const formatAsPercentage = (x) => `${(Math.round(x * 10) * 5) / 100}`;
import { motion } from 'framer-motion';
import { BsPlayCircle } from 'react-icons/bs';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
function toHoursAndMinutes(totalMinutes) {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

const Container = styled.div`
  width: 100%;
  min-height: 76%;
  max-height: 76%;
`;
const BannerP = styled.div`
  height: 76vh;
  width: 100%;
  background-color: #202124;
  @media (max-width: 1268px) {
    height: 50vh;
  }
`;

const ImgT = styled.img`
  @media (max-width: 1268px) {
  }
`;

const TextDiv = styled.div`
  position: absolute;
  z-index: 1;
  background: linear-gradient(
    89.59deg,
    #000000 37.32%,
    rgba(0, 0, 0, 0.73) 58%,
    rgba(0, 0, 0, 0) 79.86%
  );
  height: 76%;
  width: 100%;
  @media (max-width: 1268px) {
    background: none;
    z-index: 3;
  }
`;
const Emoji = styled.div`
  display: none;
  @media (max-width: 1268px) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 50px;
  }
`;

const ImgDiv = styled.div`
  @media (max-width: 1268px) {
    z-index: 2;
    position: absolute;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      1.16deg,
      #000000 1.1%,
      rgba(0, 0, 0, 0.86) 33.68%,
      rgba(0, 0, 0, 0.61) 68.78%,
      rgba(217, 217, 217, 0.09) 99.12%
    );
  }
`;
const FilterDiv = styled.div`
  width: 76vw;
  height: 76vh;
  display: flex;
  position: absolute;
  right: 0;

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @media (max-width: 1268px) {
    width: 100vw;
    max-height: 50vh;
  }
`;
const Title = styled(motion.h1)`
  font-size: 60px;
  font-weight: 300;
  @media (max-width: 868px) {
    font-size: 30px;
  }
`;
const Overview = styled.div`
  max-width: 700px;
  margin-top: 20px;
  letter-spacing: 0px;
  font-size: 17px;
  line-height: 27.6px;
  @media (max-width: 868px) {
    display: none;
  }
`;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',

    gap: 10,
    '& > * + *': {
      marginTop: 10,
    },
  },
  emptyStar: {
    color: '#1d9bf0',
  },
}));
function Banner() {
  const [movie, setMovie] = useState([]);

  /*const randomN = (e) => {
    const len = movie.length;
    setrandom(Math.floor(Math.random() * len));
  };
  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data.results[2]);
     const element2 = data.results
      .sort(() => Math.random() - Math.random())
      .find(() => true);
    console.log(element2);*/
  /*};
  useEffect(() => {
    const movieUrl = `${moviesURL}popular?${apiKey}`;
    console.log(movieUrl);
    getMovie(movieUrl);
  }, []);
*/
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/all/day?${apiKey}`)
      .then((response) => {
        const results = response.data.results;

        const newIndex = Math.floor(Math.random() * results.length);
        setMovie(results[newIndex]);
      });
  }, []);
  const classes = useStyles();

  return (
    <Container>
      <BannerP>
        {movie && (
          <>
            <TextDiv>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'absolute',
                  right: 0,
                  width: '97%',
                  height: '100%',
                }}
              >
                {movie.title ? (
                  <div style={{ maxWidth: '1650px', marginLeft: '50px' }}>
                    <Link to={`/movie/${movie.id}`}>
                      <Title>{movie.title}</Title>
                    </Link>
                    <div
                      style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        color: '#999',
                      }}
                    >
                      <Rating
                        precision={0.5}
                        readOnly
                        size='small'
                        sx={{
                          fontSize: '20px',
                          color: '#1d9bf0',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        emptyIcon={
                          <StarBorderIcon
                            fontSize='inherit'
                            className={classes.emptyStar}
                          />
                        }
                        value={formatAsPercentage(movie.vote_average)}
                      />
                      <p style={{}}>{movie.vote_count} Reviews</p>
                      <p>{movie.release_date}</p>
                    </div>

                    <Overview style={{ width: '600px', marginTop: '20px' }}>
                      {movie.overview}
                    </Overview>
                  </div>
                ) : (
                  <div style={{ maxWidth: '1650px', marginLeft: '50px' }}>
                    <Link to={`/serie/${movie.id}`}>
                      <Title style={{}}>{movie.name}</Title>
                    </Link>
                    <div
                      style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        color: '#999',
                      }}
                    >
                      <Rating
                        precision={0.5}
                        readOnly
                        size='small'
                        sx={{
                          fontSize: '20px',
                          color: '#1d9bf0',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        emptyIcon={
                          <StarBorderIcon
                            fontSize='inherit'
                            className={classes.emptyStar}
                          />
                        }
                        value={formatAsPercentage(movie.vote_average)}
                      />
                      <p style={{}}>{movie.vote_count} Reviews</p>
                      <p>{movie.first_air_date}</p>
                    </div>
                    <Overview>{movie.overview}</Overview>
                  </div>
                )}
              </div>
            </TextDiv>
            <FilterDiv
              style={{
                backgroundImage: `url(${ImageUrl + movie.backdrop_path})`,
              }}
            >
              <ImgDiv>
                <Emoji>
                  <BsPlayCircle />
                </Emoji>
              </ImgDiv>
            </FilterDiv>
          </>
        )}
      </BannerP>
    </Container>
  );
}

export default Banner;
