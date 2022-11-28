import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';

import Home from './pages/Home';
import Movie from './pages/Movie';
import Serie from './pages/Serie';
import App from './App';
import PopularSeries from './pages/PopularSeries';
import PopularMovies from './pages/PopularMovies';
import MovieSkeleton from './pages/MovieSkeleton';
import CustomSwitch from './components/components-home/CustomSwitch ';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Person from './pages/PersonDetails';
import './index.css';

import { motion } from 'framer-motion';
import Modal from 'react-modal';
import ScrollToTop from './components/components-home/ScrollToTop';
import { AnimatePresence } from 'framer-motion';

const PageLayout = ({ children }) => children;

const pageVariantes = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'linear',
  duration: 0.5,
};

Modal.setAppElement('#root');
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SkeletonTheme baseColor='#202020' highlightColor='#444'>
      <Router>
        <ScrollToTop />
        <AnimatePresence exitBeforeEnter>
          <CustomSwitch>
            <Route element={<App />}>
              <Route path='/' element={<Home />} />
              <Route path='/movie/:id' element={<Movie />} />
              <Route path='/person/:id' element={<Person />} />
              <Route path='/serie/:id' element={<Serie />} />
              <Route path='MoviePages' element={<PopularMovies />} />
              <Route path='SeriesPage' element={<PopularSeries />} />
              <Route path='MovieSkeleton' element={<MovieSkeleton />} />
            </Route>
          </CustomSwitch>
        </AnimatePresence>
      </Router>
    </SkeletonTheme>
  </React.StrictMode>
);
