import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from "../button/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './DetailsComp.css';

function DetailsComp() {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();
  const API_KEY = '1298ed7795eb650972b37610d4e5d86a';

  useEffect(() => {
    // Get main movie
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => { setMovie(data); console.log("Main Movie:", data); })
      .catch(error => console.log(error));

    // Get similar movies
    fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        // Remove duplicates
        const uniqueSimilar = Array.from(new Map(data.results.map(item => [item.id, item])).values());
        setSimilar(uniqueSimilar);
      })
      .catch(error => console.log(error));
  }, [id]);

  const handleVideo = () => {
    setShowVideo(true);
  };

  const goHome = () => {
    navigate('/');
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="details">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 p-0">
            <div className="poster-img position-relative">
              <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="backdrop" />
            </div>
          </div> 
        </div>
      </div>

      <div className="details-content position-relative">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-12">
              <div className="card-img">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="poster" />
                <Button 
                  text='Watch Now' className='btn' width='100%' height='50px'
                  border='0' margin="15px" bgColor='#780101' radius="5px"
                  onClick={handleVideo}
                />
              </div>
            </div>

            <div className="col-lg-9 col-md-8 col-sm-12">
              <div className="details-desc">
                <h2 className="text-white">{movie.title}</h2>
                <div className="d-flex flex-wrap">
                  {movie.genres.map(item => (
                    <Button 
                      key={item.id} text={item.name} className='btn'
                      width='100px' height='40px' border='1px solid #fff'
                      margin="15px" bgColor='transparent' radius="20px"
                    />
                  ))}
                </div>
                <div className="desc mt-4">
                  <p className="text-white">{movie.overview}</p>
                  <p className='text-light'><strong>Release Date:</strong> {movie.release_date}</p>
                  <p className='text-light'><strong>Duration:</strong> {(movie.runtime / 60).toFixed(2)} hr</p>
                  <p className='text-light'><strong>Rating:</strong> {movie.vote_average}</p>
                  <Button 
                    text='Back' className='btn' width='200px' height='50px'
                    border='0' margin="15px" bgColor='#555' radius="5px"
                    onClick={goHome}
                  />
                </div>
              </div>

              {showVideo && (
                <div className="video-overlay" style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "rgba(0,0,0,0.9)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999,
                }}>
                  <iframe
                    src={movie.homepage}
                    title="YouTube video"
                    frameBorder="0"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <FontAwesomeIcon icon={faCircleXmark} className='close-icon'
                    onClick={() => setShowVideo(false)}
                  />
                </div>
              )}
            </div>
          </div>

          
          <div className="row mt-5">
            <h3 className='text-white'>Similar Movies</h3>
            {similar.slice(0, 8).map(item => (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={item.id}>
                <div className="card h-100 bg-dark text-white p-2">
                  <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="card-img-top" alt={item.title} />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <Link to={`/movie/${item.id}`}>
                      <Button 
                        text="Show Details"  className='btn'
                        width='100%' height='40px' bgColor='#780101'
                        border='none' radius='5px'
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default DetailsComp;
