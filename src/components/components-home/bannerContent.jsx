import React from 'react';

export function BannerContent() {
  return (
    <div>
      <div
        className='banner-title'
        style={{
          height: '76vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img style={{}} src={ImageUrl + item.backdrop_path} alt='' />
        <div
          className='text-center'
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '1600px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h1>a</h1>
          <p>{item.vote_count} Reviews</p>
          <p style={{ maxWidth: '50%', marginTop: '10px' }}>{item.overview}</p>
        </div>
      </div>
    </div>
  );
}
