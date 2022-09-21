import { useState, useEffect, Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { STabs, StabList, STab } from '../components/components-home/StyledTab';
import 'react-tabs/style/react-tabs.css';
import Credits from '../components/components-home/Credits';
import styled from 'styled-components';
import { motion } from 'framer-motion';
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
const imageUrl = import.meta.env.VITE_IMG;
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const Background = import.meta.env.VITE_URL_BACKGROUND;

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
    }, 1000);
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
  const formatAsPercentage = (x) => `${Math.round(x * 10)}`;
  return (
    <div>
      <>
        {isLoading ? (
          <MovieSkeleton />
        ) : (
          <>
            {movie && (
              <>
                <motion.div
                  className='banner-title'
                  style={{
                    height: '76vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div className='application'></div>
                  <motion.img
                    style={{}}
                    src={Background + movie.backdrop_path}
                    alt=''
                    variants={animations}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                  />
                  <motion.div
                    variants={animations}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                    transition={{ duration: 1 }}
                    className='text-center'
                    style={{
                      width: '100%',
                      height: '100%',
                      maxWidth: '1600px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <h1>{movie.title}</h1>
                    <p>{movie.vote_count} Reviews</p>
                    <p style={{ maxWidth: '50%', marginTop: '10px' }}>
                      {movie.overview}
                    </p>
                  </motion.div>
                </motion.div>
                <div>
                  <STabs>
                    <StabList
                      id='TabList'
                      style={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <STab selectedClassName='is-selected'>OVERVIEW</STab>
                      <STab selectedClassName='is-selected'>VIDEOS</STab>
                      <STab selectedClassName='is-selected'>PHOTOS</STab>
                    </StabList>
                    <TabPanel
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 80,
                        flexWrap: 'wrap',
                      }}
                    >
                      <div
                        className='movie-center'
                        style={{
                          maxWidth: '1600px',
                          display: 'flex',
                          flexWrap: 'wrap',
                        }}
                      >
                        <ul>
                          <li>
                            <img
                              src={imageUrl + movie.poster_path}
                              alt=''
                              style={{
                                width: 300,
                                marginRight: 20,
                                borderRadius: 5,
                              }}
                            />
                          </li>
                        </ul>
                        <HelmetProvider>
                          <Helmet>
                            <title>{movie.title}</title>
                            <link
                              rel='canonical'
                              href='https://www.tacobell.com/'
                            />
                          </Helmet>
                        </HelmetProvider>
                        <ul className='description'>
                          <li>
                            <h2 style={{ paddingBottom: 20 }}>Storyline</h2>
                            <p
                              className='overviewbottom'
                              style={{ fontSize: 15 }}
                            >
                              {movie.overview}
                            </p>
                          </li>
                          <div style={{ display: 'flex' }}>
                            <ul style={{ marginTop: 10 }}>
                              <li style={{ marginTop: 10 }}>
                                <p>Relaase</p>
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <p>Runtime</p>
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
                                <p>Language </p>
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <p>Production</p>
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <Credits />
                              </li>
                            </ul>
                            <ul style={{ marginLeft: 40, marginTop: 10 }}>
                              <li style={{ marginTop: 10 }}>
                                <p>{movie.release_date}</p>
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <p>{timeConvert(movie.runtime)}</p>
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <p>{formatCurrency(movie.budget)}</p>
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <p>{formatCurrency(movie.revenue)}</p>
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <Genere key={movie.id} />
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <p>{movie.status}</p>
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <Lenguage key={movie.id} />
                              </li>
                              <li style={{ marginTop: 10 }}>
                                <Production key={movie.id} />
                              </li>
                            </ul>
                          </div>
                        </ul>
                      </div>
                      <Actors key={movie.id} />
                    </TabPanel>

                    <TabPanel>
                      <Videos />
                    </TabPanel>

                    <TabPanel>
                      <Images />
                    </TabPanel>
                  </STabs>
                </div>
              </>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default Movie;
