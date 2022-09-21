import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_URL_BACKGROUND;
import { Link, useParams } from 'react-router-dom';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  color: '#000',
  p: 4,
};

function BasicModal() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getBackdrop = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data.backdrops);
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}/images?${apiKey}`;
    console.log(movieUrl);
    getBackdrop(movieUrl);
  }, []);
  return (
    <div style={{ width: '100%' }}>
      {movie &&
        movie.map((movie) => (
          <Button onClick={handleOpen}>
            <img
              style={{ width: '100px' }}
              src={imageUrl + movie.file_path}
              alt=''
            />
          </Button>
        ))}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {movie &&
            movie.map((movie) => (
              <a
                href={`https://image.tmdb.org/t/p/original/${movie.file_path}`}
              >
                <img
                  style={{ width: '500px' }}
                  src={`https://image.tmdb.org/t/p/original/${movie.file_path}`}
                  alt=''
                />
              </a>
            ))}
        </Box>
      </Modal>
    </div>
  );
}
export default BasicModal;
