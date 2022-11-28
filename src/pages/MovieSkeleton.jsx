import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import 'react-loading-skeleton/dist/skeleton.css';
import Transitions from '../components/Transitions';

const All = styled.div`
  width: 100%;
  height: 100vh;
`;
const Content = styled.div`
  width: 94%;
  position: absolute;
  right: 0;

  height: 100vh;
`;
const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;
const Ula = styled.ul`
  @media (max-width: 1268px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const SkeletonDiv = styled.div`
  background-color: black;
  height: 76vh;
  width: 92%;
  display: flex;
  align-items: center;
  margin-left: 100px;
`;
const Title = styled(Skeleton)`
  width: 30vw;
  height: 65px;
  margin-bottom: 10px;
`;
const Info = styled(Skeleton)`
  width: 25vw;
  height: 20px;
  margin-bottom: 10px;
`;
const Overview = styled(Skeleton)`
  width: 250px;
  height: 20px;
  @media (max-width: 1268px) {
    display: none;
  }
`;
const Ulan = styled.ul`
  @media (max-width: 1268px) {
    display: flex;
    justify-content: center;
  }
`;
const Actors = styled(Skeleton)`
  width: 250px;
  height: 350px;
`;

export default function MovieSkeleton() {
  return (
    <All>
      <Banner>
        <SkeletonDiv>
          <div>
            <Title />
            <Info />
            <Overview count={3} />
          </div>
        </SkeletonDiv>
      </Banner>
      <Content>
        <div
          style={{
            justifyContent: 'center',
            marginTop: '20px',
            gap: 20,
            display: 'flex',
          }}
        >
          <Skeleton width={100} height={30} />
          <Skeleton width={100} height={30} />
          <Skeleton width={100} height={30} />
        </div>
        <Ula
          style={{
            marginTop: '20px',
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <ul>
            <li>
              <Skeleton width={350} height={550} />
            </li>
          </ul>
          <ul>
            <li>
              <Skeleton
                width={150}
                height={20}
                style={{ marginBottom: '20px' }}
              />
            </li>
            <li>
              <Skeleton width={450} height={20} count={4} />
            </li>
            <Ulan style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
              <li>
                <Skeleton
                  width={100}
                  height={20}
                  count={9}
                  style={{ marginBottom: '20px' }}
                />
              </li>
              <li>
                <Skeleton
                  width={100}
                  height={20}
                  count={9}
                  style={{ marginBottom: '20px' }}
                />
              </li>

              <li></li>
            </Ulan>
          </ul>
        </Ula>
        <Skeleton
          width={150}
          height={40}
          style={{ marginTop: '30px', marginBottom: '30px' }}
        />
        <div></div>
        <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
          <Actors />
          <Actors />
          <Actors />
          <Actors />
          <Actors />
          <Actors />
        </div>
      </Content>
    </All>
  );
}
