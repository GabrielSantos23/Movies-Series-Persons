import { useState, useEffect, Component } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { STabs, StabList, STab } from '../components/components-home/StyledTab';
import 'react-tabs/style/react-tabs.css';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';
import { Rating } from '@mui/material';
import { BiPlay } from 'react-icons/bi';
import './Movie.css';

import MovieSkeleton from './MovieSkeleton';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Skeleton from 'react-loading-skeleton';
import ActorsSerie from '../components/components-home/ActorsSeries';
import RecommendationsSeries from '../components/SerieRecommendations';
import SerieGenre from '../components/seriesGenere';
import SeriesLenguage from '../components/components-home/SerieLenguage';
import SerieProduction from '../components/components-home/SerieProduction';
import SerieDirector from '../components/components-home/SerieDirector';
import Network from '../components/components-home/NetworkSeries';
import ImageSeries from '../components/components-home/ImagesSeries';
import VideoSeries from '../components/components-home/VideosSeries';
const imageUrl = import.meta.env.VITE_IMG;
const SeriesUrl = import.meta.env.VITE_API_SERIES;
const apiKey = import.meta.env.VITE_API_KEY;
const Background = import.meta.env.VITE_URL_BACKGROUND;
const Video = import.meta.env.VITE_VIDEO_LINK;

import Episodes from './../components/Episodes';
import Transitions from '../components/Transitions';
import axios from 'axios';
import LinesEllipsis from 'react-lines-ellipsis';

const SerieDiv = styled.div`
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
    width: 100vw;
    background-color: black;
    top: 0;
    z-index: 10;
    height: 3rem;
    position: fixed;
  }
`;
const Overview = styled(LinesEllipsis)`
  margin-bottom: 20px;
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
  @media (max-width: 1268px) {
    margin-bottom: 40px;
  }
`;

const ContentPrinc = styled.div``;

const TrailerDiv = styled.div`
  a {
    margin-top: 10px;
    display: flex;
    font-size: 15px;
    align-items: center;
    justify-content: center;
    background-color: #202124;
    width: 150px;
    height: 40px;
    font-weight: bold;
  }
`;

const Serie = () => {
  const { id } = useParams();
  const [serie, setSerie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [trailer, setTrailer] = useState([]);
  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch(`${SeriesUrl}${id}?${apiKey}`);
      const data = await res.json();
      setSerie(data);

      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    axios.get(`${SeriesUrl}${id}/videos?${apiKey}`).then((response) => {
      const results = response.data.results;
      setTrailer(results);
    });
  }, []);

  const filter = trailer?.filter((e) => {
    return e?.type === 'Trailer' && e?.site === 'YouTube';
  });

  const filter2 = filter[0];

  function timeConvert(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + 'h ' + rminutes + 'm';
  }

  const formatAsPercentage = (x) => `${(Math.round(x * 10) * 5) / 100}`;
  const navigate = useNavigate();
  return (
    <Transitions>
      <SerieDiv>
        {isLoading ? (
          <MovieSkeleton />
        ) : (
          <>
            {serie && (
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
                        style={{
                          color: 'white',
                          fontSize: '2rem',
                          zIndex: '10',
                        }}
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
                    <p>{serie.name}</p>
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
                            {serie.name || <Skeleton width={200} height={20} />}
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
                              value={formatAsPercentage(serie.vote_average)}
                            />
                            <p style={{}}>{serie.vote_count} Reviews</p>
                            <p>{serie.release_date}</p>
                          </div>

                          <Overview
                            style={{
                              maxWidth: '600px',
                              fontSize: '15px',
                              marginTop: '20px',
                            }}
                            text={serie.overview}
                            maxLine='3'
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                          />

                          <TrailerDiv style={{}}>
                            {filter2 && (
                              <a
                                rel='noopener noreferrer'
                                target='_blank'
                                href={Video + filter2.key}
                              >
                                <BiPlay width={40} />
                                Watch Trailer
                              </a>
                            )}
                          </TrailerDiv>
                        </TextAll>
                      </div>
                    </TextDiv>
                    <FilterDiv
                      style={{
                        backgroundImage: `url(${
                          Background + serie.backdrop_path
                        })`,
                      }}
                    >
                      <HelmetProvider>
                        <Helmet>
                          <title>{serie.name}</title>
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
                          EPISODES
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
                              src={imageUrl + serie.poster_path}
                              alt=''
                              style={{
                                width: '300px',
                                marginRight: 20,
                                backgroundColor: '#202124',
                              }}
                            />
                          </li>
                        </ul>
                        <ul className='description'>
                          <li style={{ maxWidth: '1000px' }}>
                            <h2 style={{ paddingBottom: 20 }}>Storyline</h2>
                            <p
                              style={{
                                fontSize: 15,
                                maxWidth: '70%',
                              }}
                            >
                              {serie.overview}
                            </p>
                          </li>
                          <div style={{ display: 'flex' }}>
                            <ul style={{ marginTop: 10 }}>
                              <li style={{ marginTop: 10 }}>
                                <p>First Air Date</p>
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <p>Last Air Date</p>
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <p>Creators</p>
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <p>Duration</p>
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <p>Genre</p>
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <p>Status</p>
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <p>Lenguage</p>
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <p>Production</p>
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <p>Company</p>
                              </li>
                            </ul>
                            <ul style={{ marginLeft: 40, marginTop: 10 }}>
                              <li style={{ marginTop: 10 }}>
                                <p>{serie.first_air_date}</p>
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <p>{serie.last_air_date}</p>
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <SerieDirector />
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <p>{timeConvert(serie.episode_run_time)}</p>
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <p>{serie.revenue}</p>
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <SerieGenre />
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <p>{serie.status}</p>
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <SeriesLenguage />
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <Network />
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <SerieProduction />
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
                          <ActorsSerie />
                        </div>
                        <div>
                          <RecommendationsSeries />
                        </div>
                      </STabPanel>
                      <TabPanel>
                        <Episodes />
                      </TabPanel>
                      <TabPanel>
                        <VideoSeries />
                      </TabPanel>
                      <TabPanel>
                        <ImageSeries />
                      </TabPanel>
                    </STabs>
                  </div>

                  <ContentPrinc></ContentPrinc>
                </Content>
              </>
            )}
          </>
        )}
      </SerieDiv>
    </Transitions>
  );
};

export default Serie;
