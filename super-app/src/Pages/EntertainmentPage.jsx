import React, { useEffect, useState } from 'react'
import '../Components/Entertainment/EntertainmentPage.css'
import axios from 'axios';

const EntertainmentPage = () => {
    const selectedCategories = JSON.parse(localStorage.getItem('selectedCategories'));
    
    const apiKey = 'da6b8268';
    const baseApiUrl = 'https://www.omdbapi.com/';
    const [moviesData, setMoviesData] = useState({});

    const fetchMoviesByGenre = async (genre) => {
        try {
            const response = await axios.get(`${baseApiUrl}?apikey=${apiKey}&s=${genre}`);
            return response.data.Search || [];
        } catch (error) {
            return console.error('Error fetching movies:', error);
        }
    };

    const fetchMoviesForSelectedGenres = async () => {
        const genreMovies = {};
        for (const genre of selectedCategories) {
            const movies = await fetchMoviesByGenre(genre);
            genreMovies[genre] = movies;
        }
        setMoviesData(genreMovies);
    };

    useEffect(() => {
        fetchMoviesForSelectedGenres();
    }, [selectedCategories]);

    return (
        <div className='entertainment-page'>
            <div className="page-heading">Entertainment according to your choice</div>
            <div className="browse-categories">
            {Object.keys(moviesData).map((genre) => (
                        <div className="browsed-category" key={genre}>
                            <div className="category-name">{genre}</div>
                            <div className="category-content">
                            {moviesData[genre].map((movie, index) => (
                                <div key={index} className="movie-poster">
                                <img id='movie-poster' src={movie.Poster}/>
                                </div>
                            ))}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default EntertainmentPage;