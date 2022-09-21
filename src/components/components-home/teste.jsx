import React, { useEffect } from 'react';
import '../Actors.css';
const ActorsCard = (movies) => {
  return (
    <div className='seriescontainer' id='container'>
      {movies
        .filter((movie) => {
          if (movies === '') {
            return movie;
          } else if (movie.title) {
            return movie;
          }
        })
        .map((movie, index) => (
          <div style={{ display: 'flex' }}>
            <p>{movie.title}</p>
          </div>
        ))}
    </div>
  );
};

export default ActorsCard;
