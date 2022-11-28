import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import KnowFor from '../components/components-home/KnowFor';
import SocialMedia from '../components/components-home/socialMedia';
import {
  STabs,
  StabList,
  STab,
  STabPanel,
} from '../components/components-home/StyledTab';
import { TabPanel } from 'react-tabs';
import TesTEp from '../assets/posterbackdrop.png';
import styled from 'styled-components';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import CreditsPerson from '../components/components-home/CreditsPerson';
import PersonImages from '../components/components-home/PersonImages';
import Poster from '../assets/posterbackdrop.png';
import Transitions from '../components/Transitions';
const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_IMG;
const MovieUrl = import.meta.env.VITE_API_PERSON;
const PersonDiv = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const Content = styled.div`
  max-width: 85%;
  width: 100vw;
  height: 100vh;
`;
const PersonInfo = styled.div``;
const Person = () => {
  const [movie, setMovie] = useState([]);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data);
  };
  const { id } = useParams();
  useEffect(() => {
    const movieUrl = `https://api.themoviedb.org/3/person/${id}?${apiKey}`;

    getMovie(movieUrl);
  }, []);
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <Transitions>
      <PersonDiv>
        <Content>
          <PersonInfo>
            <HelmetProvider>
              <Helmet>
                <title>{movie.name}</title>
              </Helmet>
            </HelmetProvider>
            <ul
              style={{ marginTop: '3rem', display: 'flex', flexWrap: 'wrap' }}
            >
              <ul>
                {movie.profile_path ? (
                  <li>
                    <img
                      src={imageUrl + movie.profile_path}
                      style={{ width: '320px' }}
                      alt=''
                    />
                  </li>
                ) : (
                  <li>
                    <img src={Poster} style={{ width: '320px' }} alt='' />
                  </li>
                )}
              </ul>
              <ul style={{ margin: '20px' }}>
                <li>
                  <h2 style={{ fontWeight: '300' }}>{movie.name}</h2>
                </li>
                <li style={{ maxWidth: '800px', marginTop: '40px' }}>
                  <p style={{ fontSize: '16px' }}>{movie.biography}</p>
                </li>
                <ul
                  style={{
                    display: 'flex',
                    gap: '20px',
                    marginTop: '40px',
                  }}
                >
                  <ul>
                    <li style={{ marginBottom: 10 }}>Know for</li>
                    <li style={{ marginBottom: 10 }}>Born</li>
                    <li style={{ marginBottom: 10 }}>Place Of Birth</li>
                  </ul>
                  <ul>
                    {movie.known_for_department ? (
                      <li style={{ marginBottom: 10 }}>
                        {movie.known_for_department}
                      </li>
                    ) : (
                      <p style={{ marginBottom: '10px' }}>No info</p>
                    )}
                    {movie.birthday ? (
                      <li style={{ marginBottom: 10 }}>
                        {movie.birthday}&nbsp; (age {getAge(movie.birthday)})
                      </li>
                    ) : (
                      <p style={{ marginBottom: '10px' }}>No info</p>
                    )}
                    {movie.place_of_birth ? (
                      <li style={{ marginBottom: 10 }}>
                        {movie.place_of_birth}
                      </li>
                    ) : (
                      <p>No info</p>
                    )}
                  </ul>
                </ul>
                <SocialMedia />
              </ul>
            </ul>
          </PersonInfo>
          <div style={{}}>
            <STabs style={{ width: '' }}>
              <StabList
                id='TabList'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <STab style={{ zIndex: '2' }} selectedClassName='is-selected'>
                  KNOW FOR
                </STab>

                <STab style={{ zIndex: '2' }} selectedClassName='is-selected'>
                  CREDITS
                </STab>
                <STab style={{ zIndex: '2' }} selectedClassName='is-selected'>
                  PHOTOS
                </STab>
              </StabList>
              <TabPanel style={{}}>
                {' '}
                <KnowFor />
              </TabPanel>

              <TabPanel>
                <CreditsPerson />
              </TabPanel>
              <TabPanel>
                <PersonImages />
              </TabPanel>
            </STabs>
          </div>
        </Content>
      </PersonDiv>
    </Transitions>
  );
};

export default Person;
