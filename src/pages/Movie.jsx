import { useState, useEffect, Component } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { STabs, StabList, STab } from '../components/components-home/StyledTab';
import 'react-tabs/style/react-tabs.css';
import Credits from '../components/components-home/Credits';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { IoIosArrowBack } from 'react-icons/io';
import { Rating } from '@mui/material';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/styles';
import { BsPlayCircle } from 'react-icons/bs';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import './Movie.css';
import Genere from '../components/Genere';
import Production from '../components/components-home/Production';
import Actors from '../components/Actors';
import Videos from '../components/components-home/Videos';
import Images from '../components/components-home/Images';
import Lenguage from '../components/components-home/Lenguage';
import { BsImages } from 'react-icons/bs';
import MovieSkeleton from './MovieSkeleton';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LinesEllipsis from 'react-lines-ellipsis';
import Director from '../components/components-home/director';
import Recommendations from '../components/Recommendations';
import Skeleton from 'react-loading-skeleton';
import zIndex from '@mui/material/styles/zIndex';
const imageUrl = import.meta.env.VITE_IMG;
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const Background = import.meta.env.VITE_URL_BACKGROUND;

const MovieDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Content = styled.div`
  width: 97vw;
  height: 100vh;
  position: absolute;
  right: 0;
`;
const Banner = styled.div`
  height: 74%;
  width: 100%;
  background-color: #202124;
  @media (max-width: 1268px) {
    height: 50vh;
  }
`;

const Back = styled.div`
  display: none;
  @media (max-width: 1268px) {
    display: flex;
    width: 100%;
    background-color: black;
    top: 0;
    z-index: 10;
    height: 3rem;
    position: fixed;
  }
`;
const Overview = styled.p`
  max-width: 700px;
  margin-top: 20px;
  letter-spacing: 0px;
  font-size: 17px;
  line-height: 27.6px;
  maxwidth: '100%';
  display: -webkit-box;
  webkitboxorient: vertical;
  webkitlineclamp: 2;
  overflow: hidden;
  textoverflow: ellipsis;

  @media (max-width: 868px) {
    display: none;
  }
`;
const TextDiv = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
  background: linear-gradient(
    89.59deg,
    #000000 37.32%,
    rgba(0, 0, 0, 0.73) 58%,
    rgba(0, 0, 0, 0) 79.86%
  );
  height: 74vh;
  width: 100%;
  @media (max-width: 1268px) {
    background: none;

    z-index: 1;
  }
`;
const Title = styled.h1`
  font-size: 60px;
  font-weight: 300;
  @media (max-width: 868px) {
    font-size: 30px;
  }
`;
const FilterDiv = styled.div`
  width: 74vw;
  height: 74vh;
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
const STabPanel = styled(TabPanel)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 1468px) {
    align-items: center;
    justify-content: center;
  }
`;
const ImgDiv = styled.div`
  @media (max-width: 1268px) {
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
const TextAll = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ContentPrinc = styled.div``;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch(`${moviesURL}${id}?${apiKey}`);
      const data = await res.json();
      setMovie(data);

      setIsLoading(false);
    }, 500);
  }, []);

  const formatCurrency = (number) => {
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };
  function timeConvert(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + 'h ' + rminutes + 'm';
  }
  const animations = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0 },
  };

  const formatAsPercentage = (x) => `${(Math.round(x * 10) * 5) / 100}`;
  const navigate = useNavigate();
  return (
    <MovieDiv>
      {isLoading ? (
        <MovieSkeleton />
      ) : (
        <>
          {movie && (
            <>
              <Back>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => navigate(-1)}
                  >
                    <IoIosArrowBack
                      style={{ color: 'white', fontSize: '2rem', zIndex: '10' }}
                    />
                  </button>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 400,
                    width: '100%',
                  }}
                >
                  <p>{movie.title}</p>
                </div>
              </Back>
              <Content>
                <Banner>
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
                      <TextAll style={{}}>
                        <Title style={{}}>
                          {movie.title || <Skeleton width={200} height={20} />}
                        </Title>
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
                              '& .MuiRating-iconEmpty': {
                                color: '#1d9bf0',
                              },
                            }}
                            value={formatAsPercentage(movie.vote_average)}
                          />
                          <p style={{}}>{movie.vote_count} Reviews</p>
                          <p>{movie.release_date}</p>
                        </div>

                        <Overview
                          style={{
                            width: '600px',
                            height: '100px',
                            marginTop: '20px',
                          }}
                        >
                          {movie.overview}
                        </Overview>
                      </TextAll>
                    </div>
                  </TextDiv>
                  <FilterDiv
                    style={{
                      backgroundImage: `url(${
                        Background + movie.backdrop_path
                      })`,
                    }}
                  >
                    <HelmetProvider>
                      <Helmet>
                        <title>{movie.title}</title>
                      </Helmet>
                    </HelmetProvider>
                    <ImgDiv></ImgDiv>
                  </FilterDiv>
                </Banner>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'absolute',
                    right: 0,
                    width: '97%',
                  }}
                >
                  <STabs style={{ width: '100%' }}>
                    <StabList
                      id='TabList'
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <STab
                        style={{ zIndex: '2' }}
                        selectedClassName='is-selected'
                      >
                        OVERVIEW
                      </STab>
                      <STab
                        style={{ zIndex: '2' }}
                        selectedClassName='is-selected'
                      >
                        VIDEOS
                      </STab>
                      <STab
                        style={{ zIndex: '2' }}
                        selectedClassName='is-selected'
                      >
                        PHOTOS
                      </STab>
                    </StabList>
                    <STabPanel>
                      <ul>
                        <li>
                          <img
                            src={imageUrl + movie.poster_path}
                            alt=''
                            style={{
                              width: 350,
                              marginRight: 20,
                              backgroundColor: '#202124',
                              height: 530,
                              marginTop: 30,
                            }}
                          />
                        </li>
                      </ul>
                      <ul className='description'>
                        <li>
                          <h2 style={{ paddingBottom: 20 }}>Storyline</h2>
                          <p
                            className='overviewbottom'
                            style={{
                              fontSize: 15,
                              maxWidth: '70%',
                            }}
                          >
                            {movie.overview}
                          </p>
                        </li>
                        <div style={{ display: 'flex' }}>
                          <ul style={{ marginTop: 10 }}>
                            <li style={{ marginTop: 10 }}>
                              <p>Released</p>
                            </li>
                            <li style={{ marginTop: 10 }}>
                              <p>Runtime</p>
                            </li>
                            <li style={{ marginTop: 10 }}>
                              <p>Director</p>
                            </li>
                            <li style={{ marginTop: 10 }}>
                              <p>Budget</p>
                            </li>
                            <li style={{ marginTop: 10 }}>
                              <p>Revenue</p>
                            </li>
                            <li style={{ marginTop: 10 }}>
                              <p>Genre</p>
                            </li>
                            <li style={{ marginTop: 10 }}>
                              <p>Status</p>
                            </li>
                            <li style={{ marginTop: 10 }}>
                              <p>Language</p>
                            </li>
                            <li style={{ marginTop: 10 }}>
                              <p>Production</p>
                            </li>
                          </ul>
                          <ul style={{ marginLeft: 40, marginTop: 10 }}>
                            <li style={{ marginTop: 10 }}>
                              <p>{movie.status}</p>
                            </li>
                            <li style={{ marginTop: 10 }}>
                              <p>{timeConvert(movie.runtime)}</p>
                            </li>
                            <li style={{ marginTop: 10 }}>
                              <Director />
                            </li>
                            <li style={{ marginTop: 10 }}>
                              <p>{formatCurrency(movie.budget)}</p>
                            </li>
                            <li style={{ marginTop: 10 }}>
                              <p>{formatCurrency(movie.revenue)}</p>
                            </li>
                            <li style={{ marginTop: 10 }}>
                              <Genere />
                            </li>
                            <li style={{ marginTop: 10 }}>
                              <p>{movie.status}</p>
                            </li>
                            <li style={{ marginTop: 10 }}>
                              <Lenguage />
                            </li>
                            <li style={{ marginTop: 10 }}>
                              <Production />
                            </li>
                            <li style={{ marginTop: 10 }}>
                              <p>{movie.last_air_date}</p>
                            </li>
                          </ul>
                        </div>
                      </ul>
                      <div>
                        <h2
                          style={{
                            marginTop: '40px',
                            marginBottom: '-50px',
                            fontWeight: '300',
                          }}
                        >
                          Cast
                        </h2>
                        <Actors />
                      </div>
                      <div>
                        <Recommendations />
                      </div>
                    </STabPanel>
                    <TabPanel>
                      <Videos />
                    </TabPanel>
                    <TabPanel>
                      <Images />
                    </TabPanel>
                  </STabs>
                </div>

                <ContentPrinc></ContentPrinc>
              </Content>
            </>
          )}
        </>
      )}
    </MovieDiv>
  );
};

export default Movie;
