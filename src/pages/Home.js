import '../styles/App.css';
import React, { useState, useEffect } from "react";
import NavBar from './NavBar';
import Footer from './Footer';

const Home = () => {

  return (
    <div className="mensajeria_app">

      <NavBar />

      <div className='headers-homepage'>
          New Releases every week !
      </div>
      <div className='movie-row'>
        <Movie 
          name={'Avengers'}
        />
        <Movie 
          name={'Fast'}
        />
        <Movie 
          name={'garfield'}
        />
      </div>
      <div className='headers-homepage'>
          Go premium and get all the benefits !
      </div>
      <div className='movie-row'>
        <Movie 
          name={'the ring'}
        />
        <Movie 
          name={'titanic'}
        />
        <Movie 
          name={'harry'}
        />
      </div>
      <Footer />
    </div>
  );
}

const Movie = ({name}) => {

  const GET_MOVIES_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=1ca088dd&t=${name}`;

  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
      searchMovies();
  }, []);
  
  const searchMovies = async () => {
    const response = await fetch(GET_MOVIES_URL);
    const data = await response.json();

    setMoviesData(data);
  };

  return (
      <div className='movie-card'>
          <img 
              alt="Movie's Poster"
              src={moviesData.Poster}
          />
      </div>
  );
}

export default Home;