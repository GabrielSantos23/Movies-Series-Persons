import { useState, useEffect } from 'react';
import loading from '../assets/PikPng.com_microsoft-edge-logo-png_2006386.png';
const Img = 'https://image.tmdb.org/t/p/w500';

import Banner from '../components/components-home/banner';
import './Card.css';
import MovieCard from '../components/MovieCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { CaretLeft } from 'phosphor-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from 'react-icons/fa';
import SeriesCard from '../components/SeriesCard';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
const moviesURL = import.meta.env.VITE_API_PERSON;
const apiKey = import.meta.env.VITE_API_KEY;

/*const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FontAwesomeIcon icon={Icons.FaAngleLeft} color='#000' size='2x' />
    </div>
  );
};
*/

const Home = () => {
  <Helmet>
    <meta charSet='utf-8' />
    <title>Movies,Series,Persons</title>
  </Helmet>;
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setTopMovies(data.results);
  };

  useEffect(() => {
    const topRatedUrl = `https://api.themoviedb.org/3/trending/movie/day?${apiKey}`;
    console.log(topRatedUrl);
    getTopRatedMovies(topRatedUrl);
  }, []);
  const animations = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
  return (
    <motion.div
      variants={animations}
      initial='initial'
      animate='animate'
      exit='exit'
      className='container'
    >
      <Banner />
      <div>
        <div className='card-home'>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <h1 style={{ fontWeight: '300', fontSize: '24px' }}>
              Trending Movies
            </h1>
            <Link to={'/MoviePages'}>See More</Link>
          </div>
          <Slider {...settings}>
            {topMovies.map((item) => (
              <MovieCard item={item} key={item.id} />
            ))}
            <div style={{ height: '200px' }}>
              <Link to={'/MoviePages'}>
                <p
                  style={{
                    display: 'flex',
                    backgroundColor: '#202124',
                    width: '200px',
                    height: '300px',
                    borderRadius: '5px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  See More
                </p>
              </Link>
            </div>
          </Slider>
        </div>
      </div>

      <SeriesCard />
      <div
        style={{
          display: 'flex',

          justifyContent: 'center',
        }}
      >
        <div style={{ color: '#999', width: '1650px', marginBottom: '20px' }}>
          <p>&copy; 2022 Gabriel Santos. All rights reserved</p>
          <p>
            Designed and built by me, data provided by{' '}
            <a
              style={{ color: '#999', textDecoration: 'underline' }}
              href='https://www.themoviedb.org/'
            >
              TMDb
            </a>
            .
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
