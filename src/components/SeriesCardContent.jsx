import { Rating } from '@mui/material';
import { useHorizontalScroll } from './components-home/HorizontalScroll';
const imageUrl = import.meta.env.VITE_IMG;
const formatAsPercentage = (x) => `${(Math.round(x * 10) * 5) / 100}`;
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
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

const SerieCardContent = ({ item }) => {
  const classes = useStyles();

  return (
    <div className='card'>
      <div className='card-top'>
        <Link to={`/serie/${item.id}`}>
          <img
            loading='lazy'
            style={{ width: '98%' }}
            src={imageUrl + item.poster_path}
            alt=''
          />
        </Link>
        <h2 style={{ width: '98%', marginTop: '10px' }}>{item.name}</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
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

export default SerieCardContent;
