import { useState, useEffect } from 'react';

const Img = 'https://image.tmdb.org/t/p/w500';
import { useHorizontalScroll } from '../components/components-home/HorizontalScroll';

import '../pages/Card.css';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import SerieCardContent from './SeriesCardContent';
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
const SeriesCard = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: false,
    autoplaySpeed: 2500,
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

  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/tv/day?${apiKey}`
      );
      const data = await res.json();
      setSeries(data.results);
      setIsLoading(false);
    });
  }, []);

  /*const getTopRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setSeries(data.results);
  };

  useEffect(() => {
    const topRatedUrl = `https://api.themoviedb.org/3/trending/tv/day?${apiKey}`;
    console.log(topRatedUrl);
    getTopRatedMovies(topRatedUrl);
  }, []);
*/
  return (
    <div className='container' style={{ marginBottom: '50px' }}>
      {isLoading ? null : (
        <div style={{}}>
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
                Trending Series
              </h1>
              <Link to={'/SeriesPage'}>See More</Link>
            </div>
            <Slider {...settings}>
              {series.map((item) => (
                <SerieCardContent item={item} key={item.id} />
              ))}
              <div style={{ height: '200px' }}>
                <Link to={'/SeriesPage'}>
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
          <div
            style={{
              display: 'flex',
              backgroundImage: 'red',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                color: '#999',

                width: '100%',
                marginTop: '20px',
              }}
            >
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
        </div>
      )}
    </div>
  );
};

export default SeriesCard;
