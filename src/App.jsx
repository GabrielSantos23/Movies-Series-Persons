import { Outlet } from 'react-router-dom';

import Sidebar2 from './components/components-home/Sidebar2';
import Sidebar from './components/components-home/Sidebar';

function App() {
  return (
    <div className='App'>
      <Sidebar2 />

      <Outlet />
    </div>
  );
}

export default App;
