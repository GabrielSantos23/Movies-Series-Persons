import { display } from '@mui/system';
import { FacebookLogo, InstagramLogo, TwitchLogo } from 'phosphor-react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaImdb, FaTwitter } from 'react-icons/fa';
const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_IMG;
const MovieUrl = import.meta.env.VITE_API_PERSON;
const SocialMedia = () => {
  const [movie, setMovie] = useState([]);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data);
    console.log(data);
  };
  const { id } = useParams();
  useEffect(() => {
    const movieUrl = `https://api.themoviedb.org/3/person/${id}/external_ids?${apiKey}`;
    console.log(movieUrl);
    getMovie(movieUrl);
  }, []);

  return (
    <div style={{ marginTop: '2rem', color: '#fff' }}>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href={`https://instagram.com/${movie.instagram_id}`}
      >
        <InstagramLogo size={30} />
      </a>
      <a
        target='_blank'
        rel='noopener noreferrer'
        style={{ marginLeft: '1rem' }}
        href={`https://facebook.com/${movie.facebook_id}`}
      >
        <FacebookLogo size={30} />
      </a>
      <a
        target='_blank'
        rel='noopener noreferrer'
        style={{ marginLeft: '1rem' }}
        href={`https://twitter.com/${movie.twitter_id}`}
      >
        <FaTwitter size={30} />
      </a>
      <a
        target='_blank'
        rel='noopener noreferrer'
        style={{ marginLeft: '1rem' }}
        href={`https://www.imdb.com/name/${movie.imdb_id}`}
      >
        <FaImdb size={30} />
      </a>
    </div>
  );
};

export default SocialMedia;
