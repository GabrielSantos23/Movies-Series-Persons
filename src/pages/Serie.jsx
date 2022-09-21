import { useState, useEffect, Component } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {
  STabs,
  StabList,
  STab,
  STabPanel,
} from '../components/components-home/StyledTab';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Credits from '../components/components-home/Credits';
import Genere from '../components/seriesGenere';
import Actors from '../components/components-home/ActorsSeries';
import Videos from '../components/components-home/VideosSeries';
import Images from '../components/components-home/ImagesSeries';
import SeriesLenguage from '../components/components-home/SerieLenguage';
import SerieProduction from '../components/components-home/SerieProduction';
import MovieSkeleton from './MovieSkeleton';
import ImageSeries from '../components/components-home/ImagesSeries';

const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_IMG;
const Background = import.meta.env.VITE_URL_BACKGROUND;
const SeriesURL = import.meta.env.VITE_API_SERIES;

const SeriesCard = () => {
  const [series, setSeries] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch(`${SeriesURL}${id}?${apiKey}`);
      const data = await res.json();
      setSeries(data);
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

  const formatAsPercentage = (x) => `${Math.round(x * 10)}`;

  return (
    <div>
      {isLoading ? (
        <MovieSkeleton />
      ) : (
        <>
          {series && (
            <>
              <div
                className='banner-title'
                style={{
                  height: '76vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <HelmetProvider>
                  <Helmet>
                    <meta charSet='utf-8' />
                    <title>{series.name}</title>
                  </Helmet>
                </HelmetProvider>
                <img
                  style={{}}
                  src={Background + series.backdrop_path}
                  alt=''
                />
                <div
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
                  <h1>{series.name}</h1>
                  <p>{series.vote_count} Reviews</p>
                  <p style={{ maxWidth: '50%', marginTop: '10px' }}>
                    {series.overview}
                  </p>
                </div>
              </div>

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
                  <STabPanel>
                    <ul>
                      <li>
                        <img
                          src={imageUrl + series.poster_path}
                          alt=''
                          style={{
                            width: 300,
                            marginRight: 20,
                            backgroundColor: '#202124',
                            height: 450,
                          }}
                        />
                      </li>
                    </ul>
                    <ul className='description'>
                      <li>
                        <h2 style={{ paddingBottom: 20 }}>Storyline</h2>
                        <p className='overviewbottom' style={{ fontSize: 15 }}>
                          {series.overview}
                        </p>
                      </li>
                      <div style={{ display: 'flex' }}>
                        <ul style={{ marginTop: 10 }}>
                          <li style={{ marginTop: 10 }}>
                            <p>First Aired</p>
                          </li>
                          <li style={{ marginTop: 10 }}>
                            <p>Runtime</p>
                          </li>
                          <li style={{ marginTop: 10 }}>
                            <p>Number of Episodes</p>
                          </li>
                          <li style={{ marginTop: 10 }}>
                            <p>Number of Seasons</p>
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
                          <li style={{ marginTop: 10 }}>
                            <p>Last Aired</p>
                          </li>
                          <li style={{ marginTop: 10 }}></li>
                        </ul>
                        <ul style={{ marginLeft: 40, marginTop: 10 }}>
                          <li style={{ marginTop: 10 }}>
                            <p>{series.first_air_date}</p>
                          </li>
                          <li style={{ marginTop: 10 }}>
                            <p>{timeConvert(series.episode_run_time)}</p>
                          </li>
                          <li style={{ marginTop: 10 }}>
                            <p>{series.number_of_episodes}</p>
                          </li>
                          <li style={{ marginTop: 10 }}>
                            <p>{series.number_of_seasons}</p>
                          </li>
                          <li style={{ marginTop: 10 }}>
                            <Genere />
                          </li>
                          <li style={{ marginTop: 10 }}>
                            <p>{series.status}</p>
                          </li>
                          <li style={{ marginTop: 10 }}>
                            <SeriesLenguage />
                          </li>
                          <li style={{ marginTop: 10 }}>
                            <SerieProduction />
                          </li>
                          <li style={{ marginTop: 10 }}>
                            <p>{series.last_air_date}</p>
                          </li>
                        </ul>
                      </div>
                    </ul>
                    <Actors />
                  </STabPanel>

                  <TabPanel>
                    <Videos />
                  </TabPanel>

                  <TabPanel>
                    <ImageSeries />
                  </TabPanel>
                </STabs>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SeriesCard;
