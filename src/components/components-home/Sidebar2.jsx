import React from 'react';
import styled from 'styled-components';
import { FiHome } from 'react-icons/fi';
import { BiMovie } from 'react-icons/bi';
import { BsTv } from 'react-icons/bs';
import { Link, NavLink } from 'react-router-dom';

import './Sidebar.css';
const Nav = styled.div`
  background-color: #000000;
  width: 3%;
  height: 100vh;
  border-right: 0.1px solid #99999916;
  color: #fff;

  justify-content: flex-start;
  align-items: center;
  position: fixed;
  flex-direction: column;

  @media (max-width: 1268px) {
    height: 100%;
    width: 50px;
    display: none;
  }
`;
const Navink = styled(NavLink)``;

const Container = styled.div`
  position: absolute;
  z-index: 2;
`;
const ContainerMobile = styled.div`
  position: absolute;
  z-index: 100;
`;
const NavMobile = styled.div`
  display: none;

  @media (max-width: 1268px) {
    display: flex;
    position: fixed;
    bottom: 0;
    flex-direction: row;
    width: 100%;
    background-color: #000;
    height: 50px;
    align-items: center;
    justify-content: center;
  }
`;
const Sidebar2 = () => {
  return (
    <div>
      <Container className='container'>
        <Nav className='nav' style={{}}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '22px',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <NavLink
              className={(navData) =>
                navData.isActive ? 'link-active' : 'link'
              }
              to='/'
            >
              <FiHome />
            </NavLink>
            <NavLink
              to='MoviePages'
              className={(navData) =>
                navData.isActive ? 'link-active' : 'link'
              }
            >
              <BiMovie />
            </NavLink>
            <NavLink
              to='SeriesPage'
              className={(navData) =>
                navData.isActive ? 'link-active' : 'link'
              }
            >
              <BsTv />
            </NavLink>
          </div>
        </Nav>
      </Container>
      <ContainerMobile className='container-Mobile'>
        <NavMobile className='nav' style={{}}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              fontSize: '22px',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <NavLink
              className={(navData) =>
                navData.isActive ? 'link-active' : 'link'
              }
              to='/'
            >
              <FiHome />
            </NavLink>
            <NavLink
              to='MoviePages'
              className={(navData) =>
                navData.isActive ? 'link-active' : 'link'
              }
            >
              <BiMovie />
            </NavLink>
            <NavLink
              to='SeriesPage'
              className={(navData) =>
                navData.isActive ? 'link-active' : 'link'
              }
            >
              <BsTv />
            </NavLink>
          </div>
        </NavMobile>
      </ContainerMobile>
    </div>
  );
};
export default Sidebar2;
