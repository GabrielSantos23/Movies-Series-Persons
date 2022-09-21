import React from 'react';
import styled from 'styled-components';
import { FiHome } from 'react-icons/fi';
import { BiMovie } from 'react-icons/bi';
import { BsTv } from 'react-icons/bs';
import { Link, NavLink } from 'react-router-dom';
import '../../pages/Card.css';
import './Sidebar.css';
const Nav = styled.div`
  display: flex;
  background-color: #000000;
  width: 100px;
  height: 100vh;
  border-right: 0.1px solid #99999916;
  color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  flex-direction: column;

  @media (max-width: 1268px) {
    height: 100%;
    width: 50px;
  }
`;
const Navink = styled(NavLink)``;

const Container = styled.div`
  position: absolute;
  z-index: 2;
`;

const Sidebar2 = () => {
  return (
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
            className={(navData) => (navData.isActive ? 'link-active' : 'link')}
            to='/'
          >
            <FiHome />
          </NavLink>
          <NavLink
            to='MoviePages'
            className={(navData) => (navData.isActive ? 'link-active' : 'link')}
          >
            <BiMovie />
          </NavLink>
          <NavLink
            to='SeriesPage'
            className={(navData) => (navData.isActive ? 'link-active' : 'link')}
          >
            <BsTv />
          </NavLink>
        </div>
      </Nav>
    </Container>
  );
};
export default Sidebar2;
