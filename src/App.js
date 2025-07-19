import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import ErrorPage from './Pages/ErrorPage';
function App() {
  return (
      <Routes>
            
                <Route path=''  element={<Home/>} />   
                <Route path='about-us'  element={<AboutUs/>} />
                <Route path='*'  element={<ErrorPage/>} />
                
      </Routes>
  );
}

export default App;
