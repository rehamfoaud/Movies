import React from 'react';
import Home from './pages/Home';
import Details from './pages/Details';
import {  Route ,Routes} from 'react-router-dom';
import Login from './components/login/Login';
import './App.css';

function App() {
  return(
    <div className='app'>
      {/* here routing of project */}
      {/* <Home/> */}
      {/* <Details/> */}
            {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes> */}
      {/* <Login/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Details/>} />
        <Route path='/login' element={<Login/>}/>
      </Routes>


    </div>
  )
}
export default App;
