import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import './TypeMovie.css';


const API_KEY = 'e2b6c30df53812086264623027acb1bb'
const MovieList = () => {
  const [allMovies, setAllMovies] = useState([])
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [sortBy,setSortBy]= useState('default')
  const [selectedGenre, setSelectedGenre] = useState('All Movies');

  const GENRE_API_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(GENRE_API_URL);
        const data = await res.json();
        setGenres([{ id: 'All Movies', name: 'All Movies' }, ...data.genres]);
      } catch (err) {
        console.error('Error fetching genres:', err);
      }
    };

    fetchGenres();
  }, []);

  //  Get movies (first 4 pages)
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let allResults = [];

        for (let page = 1; page <= 4; page++) {
          const res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`
          );
          const data = await res.json();
          allResults = [...allResults, ...data.results];
        }

        setAllMovies(allResults);
        setMovies(allResults); // Default view: all movies
      } catch (err) {
        console.error('Error fetching movies:', err);
      }
    };

    fetchMovies();
  }, []);
  useEffect(() => {
    let sortedMovies = [...movies]
    if (sortBy === 'ratingDesc') {
      sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortBy === 'ratingAsc') {
      sortedMovies.sort((a, b) => a.vote_average - b.vote_average);
    } else if (sortBy === 'releaseDesc') {
      sortedMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    } else if (sortBy === 'releaseAsc') {
      sortedMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    }
    else if(sortBy === 'popularity')
    {
      sortedMovies.sort((a, b) => b.popularity - a.popularity);

    }
  
    setMovies(sortedMovies);
  }, [sortBy]);
  
  //  Filter by genre
  useEffect(() => {
    if (selectedGenre === 'All Movies') {
      setMovies(allMovies);
    } else {
      const filtered = allMovies.filter(movie =>
        movie.genre_ids.includes(selectedGenre)
      );
      setMovies(filtered);
    }
  }, [selectedGenre, allMovies]);
// /////////////////////////////////////
//options
const options = [
  { value: 'default', label: 'Default' },
  { value: 'ratingDesc', label: 'Rating: High to Low' },
  { value: 'ratingAsc', label: 'Rating: Low to High' },
  { value: 'releaseDesc', label: 'Release Date: Newest' },
  { value: 'releaseAsc', label: 'Release Date: Oldest' },
  { value: 'popularity', label: 'popularity' },

];

  return (
    <div className='container'>
      {/* Genre buttons */}
      <div className='row'>
        <div className='col-12'>
          <div className="buttons-container d-flex align-items-center justify-content-between mb-3">
            {genres.slice(0, 10).map(genre => (
              genre.name !== "Documentary" && (
                <button
                  key={genre.id}
                  className={`genre-button ${selectedGenre === genre.id ? 'active' : ''}`}
                  onClick={() => setSelectedGenre(genre.id)}
                >
                  {genre.name}
                </button>
              )
            ))}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end mb-3">
           <Select 
              value={sortBy}
              onChange={(selectedOption) => setSortBy(selectedOption.value)}
              options={options}
              className="my-select"
              classNamePrefix="my-select"
             />
    </div>
      {/* Movie list */}
      <div className="movies-container container-fluid p-0">
        <div className="row">
          {movies.length > 0 ? (
            movies.map(movie => (
              <div key={movie.id} className="col-xl-3 col-lg-4 col-md-6 col-12 mb-4">
                <div className='movie-card'>
                  <div className='image-box'>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="movie-image"
                    />
                  </div>
                  <div className="movie-info">
                    <h3 className='text-light'>{movie.title}</h3>
                    <p>{movie.overview}</p>
                  </div>
                  <div className='details-link'>
                    <Link to={`/movie/${movie.id}`} className="details-movie text-decoration-none border-0 rounded px-3 py-2">
                      Show Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-light">No movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default MovieList;
