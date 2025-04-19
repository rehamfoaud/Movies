import React, { useState } from 'react';
import Header from '../components/header/Header';
import MovieList from '../components/typesmovie/TypeMovie';
import ResponsiveSlider from '../components/moviestrending/MoviesTrending';
import Reviews from '../components/reviews/Reviews';
import Footer from '../components/footer/Footer';


function Home(){
    const [searchTerm,setSearchTerm]=useState("");
    return(
        <div className='home'>
            <Header onSearch={setSearchTerm}/>
            <ResponsiveSlider searchTerm={searchTerm}/>
            <MovieList />
            <Reviews/>
            <Footer/>
        </div>
    )
}
export default Home;