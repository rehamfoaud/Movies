import React, {useState} from "react";
import Button from '../button/Button';
import './HCarousel.css';


function HCarousel(){
    const [imgArr,setImgArr]=useState([
       {id:1,img:'./images/7.jpg'},
       {id:2,img:'./images/8.jpg'},
       {id:3,img:'./images/1.jpg'},
       {id:4,img:'./images/3.jpeg'},
       {id:5,img:'./images/2.jpg'}
    ]);
    return(
        <div className="hcarousel">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0">
                        <div className="carousel-content">
                            <div id="carouselExampleIndicators" className="carousel slide carousel-fade"  data-bs-ride="carousel">
                                <div class="carousel-inner">
                                    {imgArr.map(item=>{
                                        return(
                                            <div className={`carousel-item ${item.id ===1 ? 'active' : ''} position-relative`} data-bs-interval="2000" key={item.id}>
                                               <img src={item.img} className="d-block w-100"/>
                                               <div className="carousel-caption position-absolute">
                                                    <h2>discover movies that match your mood,
                                                    everything new is here!</h2>
                                                    <p>everything you’r looking for the newest and most popular movies in one place</p>
                                                    <h3>jurassic world</h3>
                                                    <Button text="Watch Now" btnClass="btn" radius="20px" height="45px"
                                                    width="200px" margin="40px" border="1px solid #fff" bgColor="#1a1a1a"
                                                    />
                                               </div>
                                               <div className="overlay position-absolute"></div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HCarousel;