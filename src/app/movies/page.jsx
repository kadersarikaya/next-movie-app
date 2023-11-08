"use client";
import React, {useState,useEffect} from "react";
import {fetchMovies} from "../api";


const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const fetchMoviesList = async () => {
        setLoading(true);
        const response = await fetchMovies();
        console.log(response);
        setMovies(response.results);
        setLoading(false);
    };

    useEffect(() => {
        fetchMoviesList();
    }, []);

    return (
        <div>
            {movies?.map((movie) => (
                <div key={movie.id}>
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                </div>
            ))}
        </div>
    );
};

export default Movies;
