import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import './MoviesTrending.css';

const ResponsiveSlider = ({ searchTerm }) => {
  const [images, setImages] = useState([]); 
  const apiKey = "e2b6c30df53812086264623027acb1bb";

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        setImages(data.results);
      })
      .catch(error => console.log("Error fetching images:", error));
  }, []);

  const filteredImages = images.filter(img =>
    img.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="trending-movies">
      <div className="container my-5">
        <h2 className="mb-4 text-light">Trending Movies</h2>

        {filteredImages.length > 0 ? (
          <Swiper 
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Navigation]}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              992: { slidesPerView: 4 },
              1200: { slidesPerView: 5 },
            }}
          >
            {filteredImages.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${img.poster_path}`}
                  alt={img.title}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </SwiperSlide>
            ))}
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </Swiper>
        ) : (
          <div className="text-center py-5">
            <h4 className="text-light">No movies found.</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponsiveSlider;
