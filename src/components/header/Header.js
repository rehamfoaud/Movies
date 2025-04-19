import React from 'react';
import Navbar from '../navbar/Navbar';
import HCarousel from '../carousel/HCarousel';
import './Header.css';

function Header({onSearch}){
    return(
        <div className='header'>
           <Navbar onSearch={onSearch}/>
           <HCarousel/>
        </div>
    )
}
export default Header;