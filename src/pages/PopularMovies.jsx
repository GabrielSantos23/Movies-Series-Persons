import Skeleton from 'react-loading-skeleton';
import React, { useState, useEffect } from 'react';

import image from '../assets/posterbackdrop.png';

import { FiSearch } from 'react-icons/fi';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { motion } from 'framer-motion';
import 'react-loading-skeleton/dist/skeleton.css';
import loadingimg from '../assets/PikPng.com_microsoft-edge-logo-png_2006386.png';

import '../components/components-home/PaginationCss.css';
import { Link } from 'react-router-dom';
const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '281d112a5f3e634a22a7bbe6657f040d';
const IMAGE_BASE_URL = 'https://www.themoviedb.org/t/p/';
const ORIGINAL = 'https://image.tmdb.org/t/p/original';

function GridCard({ image, movieName }) {
  return (
    <div
      className='Card'
      hoverable
      style={{ margin: '1.5%' }}
      cover={
        <img
          alt={movieName}
          src={image}
          onError={(e) => {
            if (e.target.src !== image.poster_path) {
              e.target.onerror = null;
              e.target.src = 'https://i.mydramalist.com/vEAp2_4f.jpg';
            }
          }}
        />
      }
    ></div>
  );
}
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
      <input
        className='input-popular'
        value={value}
        placeholder='What are you looking for?'
        type='search'
        style={{ width: 400 }}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className='popular-button'>
        <FiSearch />
      </button>
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
        ? `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}&include_adult=false`
        : `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
            searchTerm
          )}&page=${currentPage}&include_adult=false`;

    setLoading(true);
    setIsLoading(true);
    fetch(endpoint)
      .then((response) => response.json())
      .then((json) => {
        if (!json?.results) {
          throw new Error(json?.statusMessage ?? 'Error');
        }
        console.log(json);

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
    <motion.div
      style={{}}
      variants={animations}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <Backdrop
        image={movies[0] ? `${ORIGINAL}${movies[0]?.backdrop_path}` : undefined}
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
            {searchTerm ? `Results for: ${searchTerm}` : 'Most Popular Movies'}
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
              movies.map((movie, index) => (
                <div className='index' key={index}>
                  {isLoading ? (
                    <Link to={`/movie/${movie.id}`}>
                      <motion.img
                        initial={{ opacity: 0, scale: 0.99 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{
                          backgroundColor: '#202124',
                          width: '200px',
                          border: 'none',
                          height: '300px',
                        }}
                        className='Card'
                        src={`${IMAGE_BASE_URL}w500${movie.poster_path}`}
                        alt=''
                      />
                    </Link>
                  ) : (
                    <img
                      width={200}
                      src='https://i.mydramalist.com/vEAp2_4f.jpg'
                    />
                  )}

                  <div>
                    <motion.p
                      variants={animations}
                      initial='initial'
                      animate='animate'
                      exit='exit'
                      style={{ marginBottom: '10px', marginTop: '5px' }}
                    >
                      {movie.title}
                    </motion.p>
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
                Showing {counts.total_results} of {counts.total_results} Movies
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
export default PopularMovies;
