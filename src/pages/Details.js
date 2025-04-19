import React from "react";
import Navbar from "../components/navbar/Navbar";
import DetailsComp from "../components/details/DetailsComp";
import Footer from "../components/footer/Footer";

function Details(){
    return(
        <div className="details">
            <Navbar/>
            <DetailsComp/>
            <Footer/>
        </div>
    )
}
export default Details;