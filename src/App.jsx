import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar2 from './components/components-home/Sidebar2';
import Sidebar from './components/components-home/Sidebar';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
const pageTransition = {
  type: 'tween',
  ease: 'linear',
  duration: 0.5,
};
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

function App() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const { pathname } = useLocation();

  return (
    <PageLayout>
      <motion.div
        className='App'
        key={pathname}
        initial='initial'
        animate='in'
        variants={pageVariantes}
        transition={pageTransition}
      >
        <Sidebar2 />
        <Outlet />
      </motion.div>
    </PageLayout>
  );
}

export default App;
