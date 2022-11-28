import Skeleton from 'react-loading-skeleton';
import React, { useState, useEffect } from 'react';
import image from '../assets/posterbackdrop.png';
import { FiSearch } from 'react-icons/fi';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';
import 'react-loading-skeleton/dist/skeleton.css';
import loadingimg from '../assets/PikPng.com_microsoft-edge-logo-png_2006386.png';
import TesTEp from '../assets/posterbackdrop.png';
import styled from '@emotion/styled';
import '../components/components-home/PaginationCss.css';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Transitions from '../components/Transitions';

const Input1 = styled.input`
  width: 400px;
  height: 40px;
  border: none;
  padding: 2%;
  border-radius: 0px 5px 5px 0;
  border-bottom: 3px solid #337ab7;
  background-color: #343434;
  color: #fff;
  @media (max-width: 468px) {
    width: 200px;
  }
`;

const Button1 = styled.button`
  width: 50px;
  height: 40px;

  border-bottom: 3px solid #337ab7;
  padding: 2%;
  border: none;
  border-bottom: 3px solid #337ab7;
  background-color: #343434;

  border-radius: 5px 0 0 5px;
`;

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '281d112a5f3e634a22a7bbe6657f040d';
const IMAGE_BASE_URL = 'https://www.themoviedb.org/t/p/';
const ORIGINAL = 'https://image.tmdb.org/t/p/original';
const formatAsPercentage = (x) => `${(Math.round(x * 10) * 5) / 100}`;

function Backdrop({ image, children }) {
  return (
    <div
      style={{
        width: '100%',
        height: '200px',
        backgroundImage: image ? `url(${image}` : undefined,
        backgroundColor: 'lightgrey',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: '-moz-initial',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  );
}

const SearchMenu = ({ mode, value, onChange }) => {
  return (
    <div className='searchMenu' style={{ display: 'flex' }}>
      <Button1 className=''>
        {' '}
        <FiSearch color='#999' fontSize={15} />
      </Button1>
      <Input1
        value={value}
        placeholder='What are you looking for?'
        type='search'
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

function PopularMovies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [counts, setCounts] = useState({
    total_pages: 3500,
    total_results: 100000,
  });
  const hasNext = counts.total_pages > currentPage;

  const loadMoreItems = () => {
    if (hasNext) {
      setCurrentPage((page) => page + 1);
    }
  };
  const onChangeSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };
  useEffect(() => {
    const endpoint =
      searchTerm === ''
        ? `${API_URL}movie/popular?language=en-US&include_adult=false&api_key=${API_KEY}&language=en-US&page=${currentPage}`
        : `${API_URL}search/movie?language=en-US&include_adult=false&api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
            searchTerm
          )}&page=${currentPage}`;

    setLoading(true);
    setIsLoading(true);
    fetch(endpoint)
      .then((response) => response.json())
      .then((json) => {
        if (!json?.results) {
          throw new Error(json?.statusMessage ?? 'Error');
        }

        setMovies((previous) =>
          currentPage === 1 ? json.results : [...previous, ...json.results]
        );
        setCounts({
          total_pages: json.total_pages,
          total_results: json.total_results,
        });
      })
      .catch((error) => console.error('Error', error))
      .finally(() => setLoading(false))
      .finally(() => setIsLoading(true));
  }, [searchTerm, currentPage]);

  const handleScroll = () => {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 1) {
      loadMoreItems();
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const animations = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
  return (
    <Transitions>
      <motion.div
        style={{}}
        variants={animations}
        initial='initial'
        animate='animate'
        exit='exit'
      >
        <Backdrop
          image={
            movies[0] ? `${ORIGINAL}${movies[0]?.backdrop_path}` : undefined
          }
        >
          <SearchMenu
            mode='horizontal'
            value={searchTerm}
            onChange={onChangeSearch}
          />
        </Backdrop>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: '90%' }}>
            <div
              level={2}
              style={{
                margin: '1%',
                marginLeft: '2.9%',
                fontSize: '20px',
                fontWeight: '500',
              }}
            >
              {searchTerm
                ? `Results for: ${searchTerm}`
                : 'Most Popular Movies'}
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                paddingLeft: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {movies &&
                movies.map((movie) => (
                  <div className='index' key={movie.id}>
                    {isLoading ? (
                      <Link to={`/movie/${movie.id}`}>
                        <LazyLoadImage
                          effect='blur'
                          className='Card'
                          src={`${IMAGE_BASE_URL}w500${movie.poster_path}`}
                          style={{
                            backgroundColor: '#202124',
                            width: '200px',
                            border: 'none',
                            height: '300px',
                          }}
                        />
                      </Link>
                    ) : (
                      <img width={200} src={TesTEp} />
                    )}

                    <div style={{}}>
                      <motion.p
                        variants={animations}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                        style={{ marginBottom: '10px', marginTop: '5px' }}
                      >
                        {movie.title}
                      </motion.p>

                      <Rating
                        precision={0.5}
                        readOnly
                        width={10}
                        size='small'
                        sx={{
                          fontSize: '13px',
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
                      <p style={{ color: '#999' }}>{movie.vote_average}</p>
                    </div>
                  </div>
                ))}
            </div>

            {loading && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <img
                  style={{ width: 50 }}
                  className='img360'
                  src={loadingimg}
                  alt='loading'
                />
              </div>
            )}

            <br />
            <HelmetProvider>
              <Helmet>
                <meta charSet='utf-8' />
                <title>Most Popular Movies</title>
              </Helmet>
            </HelmetProvider>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {hasNext ? (
                <a
                  className='loadMore'
                  onClick={loadMoreItems}
                  disabled={loading}
                >
                  <img
                    src={loading}
                    alt=''
                    style={{ marginTop: '30px', marginBottom: '50px' }}
                  />
                </a>
              ) : (
                <div>
                  Showing {counts.total_results} of {counts.total_results}{' '}
                  Movies
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Transitions>
  );
}
export default PopularMovies;
