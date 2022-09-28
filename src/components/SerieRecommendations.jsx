import { useState, useEffect, Component } from 'react';
import { useParams } from 'react-router-dom';
import '../pages/Card.css';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Rating } from '@mui/material';
import TesTEp from '../assets/posterbackdrop.png';

const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_IMG;

const SeriesUrl = import.meta.env.VITE_API_SERIES;
const RecommendationsSeries = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
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
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch(
        `${SeriesUrl}${id}/recommendations?language=en-US&include_adult=false&${apiKey}`
      );
      const data = await res.json();
      setMovie(data.results);
      setIsLoading(false);
    }, 100);
  }, []);
  const formatAsPercentage = (x) => `${(Math.round(x * 10) * 5) / 100}`;

  return (
    <div className='aaa' key={movie.id}>
      {isLoading ? null : (
        <>
          <h2
            style={{
              marginTop: '40px',

              fontWeight: '300',
            }}
          >
            More Like This
          </h2>
          <Slider {...settings}>
            {movie.map((item, index) => (
              <div key={index} className='card-home'>
                <div className='card-top'>
                  <Link to={`/serie/${item.id}`}>
                    {item.poster_path ? (
                      <div>
                        <img
                          loading='lazy'
                          style={{
                            width: '98%',
                            backgroundColor: '#202124',
                            height: '100%',
                          }}
                          src={imageUrl + item.poster_path}
                          alt=''
                        />
                        <p style={{ marginTop: '5px' }}>{item.title}</p>
                        <p style={{ marginTop: '5px' }}>{item.name}</p>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
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
                            value={formatAsPercentage(item.vote_average)}
                          />
                          <p style={{ fontSize: '12px', color: '#999' }}>
                            {item.vote_average}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <img
                        loading='lazy'
                        style={{
                          width: '98%',
                          backgroundColor: '#202124',
                          height: '100%',
                        }}
                        src={TesTEp}
                      />
                    )}
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </>
      )}
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
            marginBottom: '20px',
          }}
        >
          <p>
            &copy; {new Date().getFullYear()} Gabriel Santos. All rights
            reserved
          </p>
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
  );
};

export default RecommendationsSeries;
