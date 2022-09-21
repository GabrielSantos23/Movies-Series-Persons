import { display } from '@mui/system';
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
import { Helmet } from 'react-helmet';

const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_IMG;
const MovieUrl = import.meta.env.VITE_API_PERSON;
const Person = () => {
  const [movie, setMovie] = useState([]);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data);
    console.log(data);
  };
  const { id } = useParams();
  useEffect(() => {
    const movieUrl = `https://api.themoviedb.org/3/person/${id}?${apiKey}`;
    console.log(movieUrl);
    getMovie(movieUrl);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        letterSpacing: 1,
      }}
      key={movie.id}
    >
      <Helmet>
        <meta charSet='utf-8' />
        <title>{movie.name}</title>
      </Helmet>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          maxWidth: '1900px',
          width: '85%',
          alignItems: 'center',
          marginTop: '3rem',
        }}
      >
        <ul>
          <li style={{ marginRight: '0' }}>
            <img
              onError={(e) => {
                if (e.target.src !== movie.profile_path) {
                  e.target.onerror = null;
                  e.target.src =
                    'https://signwayonline.net/wp-content/uploads/2018/02/PROFILE-PHOTO-PLACEHOLDER-300x300.png';
                }
              }}
              style={{ width: '80%', borderRadius: 5 }}
              src={imageUrl + movie.profile_path}
              alt=''
            />
          </li>
        </ul>
        <ul>
          <li style={{ marginBottom: '2rem' }}>
            <h3>{movie.name}</h3>
          </li>
          <li style={{ maxWidth: '1000px', letterSpacing: 1 }}>
            {movie.biography}
          </li>
          <div style={{ display: 'flex', marginTop: '2rem' }}>
            <ul>
              <li>Know for</li>
              <li>Born</li>
              <li>Place of Birth</li>
            </ul>
            <ul style={{ marginLeft: '5rem' }}>
              <li>{movie.known_for_department}</li>
              <li>{movie.birthday}</li>
              <li>{movie.place_of_birth}</li>
            </ul>
          </div>
          <SocialMedia />
        </ul>
        <div style={{ width: '100%' }}>
          <STabs style={{ display: 'flex', flexDirection: 'column' }}>
            <StabList
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <STab
                style={{ fontSize: '17px' }}
                selectedClassName='is-selected'
              >
                KNOW FOR
              </STab>
              <STab
                style={{ fontSize: '17px' }}
                selectedClassName='is-selected'
              >
                CREDITS
              </STab>
              <STab
                style={{ fontSize: '17px' }}
                selectedClassName='is-selected'
              >
                PHOTOS
              </STab>
            </StabList>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <STabPanel>
                <KnowFor />
              </STabPanel>
            </div>

            <STabPanel>
              <p>a</p>
            </STabPanel>
            <STabPanel>
              <p>a</p>
            </STabPanel>
          </STabs>
        </div>
      </div>
    </div>
  );
};

export default Person;
