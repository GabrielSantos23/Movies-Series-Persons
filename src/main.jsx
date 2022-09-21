import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';
import Home from './pages/Home';
import Movie from './pages/Movie';

import Serie from './pages/Serie';
import App from './App';
import PopularSeries from './pages/PopularSeries';

import PopularMovies from './pages/PopularMovies';
import './index.css';
import MovieSkeleton from './pages/MovieSkeleton';
import CustomSwitch from './components/components-home/CustomSwitch ';
import Person from './pages/PersonDetails';
import Modal from 'react-modal';
Modal.setAppElement('#root');
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SkeletonTheme baseColor='#202020' highlightColor='#444'>
      <Router>
        <CustomSwitch>
          <Route element={<App />}>
            <Route path='/' element={<Home />} />
            <Route path='movie/:id' element={<Movie />} />
            <Route path='/person/:id' element={<Person />} />
            <Route path='serie/:id' element={<Serie />} />
            <Route path='MoviePages' element={<PopularMovies />} />
            <Route path='SeriesPage' element={<PopularSeries />} />
            <Route path='MovieSkeleton' element={<MovieSkeleton />} />
          </Route>
        </CustomSwitch>
      </Router>
    </SkeletonTheme>
  </React.StrictMode>
);
