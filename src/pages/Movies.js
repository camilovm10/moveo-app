import '../styles/App.css';
import React, { useState, useEffect } from "react";
import NavBar from './NavBar';
import Footer from './Footer';

const Movies = () => {

    const GET_MOVIES_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=1ca088dd";

    const [moviesData, setMoviesData] = useState([]);
    const [moviesDataAPI, setMoviesDataAPI] = useState([]);

    useEffect(() => {
        searchMovies();
        searchMoviesAPI();
    }, []);


    const searchMoviesAPI = async () => {

        const GET_MOVIES_API_URL = "http://150.239.7.20:32367/api/v1/peliculas/estrenos";

        const response = await fetch(GET_MOVIES_API_URL);
        const data = await response.json();

        console.log("API PROFE = " + data);

        setMoviesDataAPI(data);
    };

    
    const searchMovies = async () => {
        const response = await fetch(`${GET_MOVIES_URL}&year=${moviesForm.year}&s=${moviesForm.title}`);
        const data = await response.json();

        setMoviesData(data.Search);
    };

    const [moviesForm, setMoviesForm] = useState({  
        title: "Avengers",
        year: ""
    });
    
    const setTitle = e => {
        setMoviesForm(existingValues => ({
            ...existingValues,
            title: e,
        }))
    }

    const setYear = e => {
        setMoviesForm(existingValues => ({
            ...existingValues,
            year: e,
        }))
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchMovies()
        }
    };

  return (
    <div className="mensajeria_app">
        <NavBar />

        <div>

            <h3>Search movies:</h3>
            
            <div>
                <label>Title</label>
                <input 
                    placeholder='Title...'
                    value={moviesForm.title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <label>Year</label>
                <input 
                    placeholder='Year...'
                    value={moviesForm.year}
                    onChange={(e) => setYear(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <button 
                    className='nav-link'
                    onClick={() => searchMovies()}
                >
                    Filter
                </button>
            </div>
        </div>

        <p>Proximos lanzamientos</p>

        <div className='filtered-movies-container'>
            {moviesData.map(movie => <PosterMovie movieData={movie} />)}
        </div>

        <h1>Peliculas proximamente en cartelera</h1>

        <div className='filtered-movies-container'>
            {moviesDataAPI.map(movie => <Movie movieData={movie} />)}
        </div>

        <Footer />
    </div>
  );
}

const Movie = ({movieData}) => {

    return (
        <div className='movie-item'>
            <h3>{movieData.title}</h3>
            <p>Year: {movieData.year}</p>
            <p>Director: {movieData.director}</p>

            <div>
                <h3>Encuentrala disponible en los siguientes cines:</h3>
                <ul>
                {
                    movieData.cines.map(cine => <li> {cine.name}</li>)
                }
                </ul>
            </div>
        </div>
    );
}

const PosterMovie = ({movieData}) => {

    const cines = movieData.cines;

    return (
        <div className='movie-item'>
            <h3>{movieData.Title}</h3>
            <img
                alt="Movie poster"
                src={movieData.Poster}
            />
            <p>Year: {movieData.Year}</p>
        </div>
    );
}

export default Movies;