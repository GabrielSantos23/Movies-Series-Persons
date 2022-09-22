import StarBorderIcon from '@material-ui/icons/StarBorder';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
const imageUrl = import.meta.env.VITE_IMG;

import Rating from '@mui/material/Rating';

const formatAsPercentage = (x) => `${(Math.round(x * 10) * 5) / 100}`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',

    gap: 10,
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  emptyStar: {
    color: '#1d9bf0',
  },
}));

const MovieCard = ({ item }) => {
  const classes = useStyles();
  return (
    <div className='card' key={item.id}>
      <div className='card-top'>
        <Link to={`movie/${item.id}`}>
          <img
            style={{ width: '98%', height: '300px ' }}
            src={imageUrl + item.poster_path}
            alt=''
          />
        </Link>
        <h2 style={{ width: '98%', marginTop: '10px' }}>{item.title}</h2>
        <div className={classes.root}>
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
            }}
            emptyIcon={
              <StarBorderIcon
                fontSize='inherit'
                className={classes.emptyStar}
              />
            }
            value={formatAsPercentage(item.vote_average)}
          />
          <p
            style={{
              marginTop: '0px',
              fontSize: 13,
              color: '#999',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {item.vote_average}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
