import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const imageUrl = import.meta.env.VITE_IMG;
import '../../pages/Card.css';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const apiKey = import.meta.env.VITE_API_KEY;
import TesTEp from '../../assets/posterbackdrop.png';
const SeriesURL = import.meta.env.VITE_API_SERIES;

const ActorsSerie = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
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

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data.cast);
  };
  const { id } = useParams();
  useEffect(() => {
    const movieUrl = `${SeriesURL}${id}/credits?${apiKey}`;

    getMovie(movieUrl);
  }, []);

  return (
    <div className='aaa' key={movie.id}>
      <Slider {...settings}>
        {movie.map((item, index) => (
          <div key={index} className='card-home'>
            <div className='card-top'>
              <Link to={`/person/${item.id}`}>
                {item.profile_path ? (
                  <img
                    loading='lazy'
                    style={{
                      width: '98%',
                      backgroundColor: '#202124',
                      height: '100%',
                    }}
                    src={imageUrl + item.profile_path}
                    alt=''
                  />
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
              <p>{item.name}</p>
              <p style={{ color: '#999' }}>{item.character}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ActorsSerie;
