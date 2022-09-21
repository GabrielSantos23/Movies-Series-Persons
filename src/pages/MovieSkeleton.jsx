import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
export default function MovieSkeleton() {
  return (
    <div>
      <div
        style={{
          backgroundColor: '#000',
          height: '76vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            maxWidth: '1600px',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <h1>
              <Skeleton width={'60vw'} height={80} />
            </h1>
            <p>
              <Skeleton width={'10vw'} height={20} />
            </p>
            <p style={{ marginTop: '20px' }}>
              <Skeleton width={'50vw'} height={20} count={3} />
            </p>
          </div>
        </div>
      </div>
      <div>
        <ul
          style={{
            display: 'flex',
            marginTop: 10,
            justifyContent: 'center',
          }}
        >
          <li style={{ marginRight: 10 }}>
            {' '}
            <Skeleton height={30} width={85} />
          </li>
          <li style={{ marginRight: 10 }}>
            {' '}
            <Skeleton height={30} width={85} />
          </li>
          <li>
            {' '}
            <Skeleton height={30} width={85} />
          </li>
        </ul>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 100,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '1600px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          <ul style={{ marginRight: '20px' }}>
            <li>
              <Skeleton height={300} width={250} />
            </li>
          </ul>
          <ul>
            <li>
              <Skeleton height={20} width={200} />
            </li>
            <ul style={{ marginTop: '20px' }}>
              <li>
                <Skeleton height={20} width={'50vw'} count={3} />
              </li>
            </ul>
            <ul>
              <li style={{ marginTop: '50px' }}>
                <Skeleton height={20} width={400} count={5} />
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
}
