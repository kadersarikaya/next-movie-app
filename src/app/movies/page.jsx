"use client"
import React from "react";
import { getTrendMovies } from "../api";
import { useEffect, useState } from 'react';
import InfoCard from "@/components/InfoCard";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {useRouter} from "next/navigation";

const Movies = () => {
  const router = useRouter();
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [watchLaters, setWatchLaters] = useState([]);

  const FetchTrendMovies = async () => {
    setLoading(true)
    getTrendMovies('movie')
    .then((response) => {
      setMovies(response)
    })
    .catch((error) => {
      setError(error.message || 'Something went wrong')
    })
    .finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
  }
  useEffect(() => {
    FetchTrendMovies()

    const storedWatch = JSON.parse(localStorage.getItem('watchLaters'))
    if (storedWatch) {
      setWatchLaters(storedWatch)
    }
  }, [])

  const handleMovieDetail = (id) => {
    router.push(`/movies/${id}`)
  }

  const handleWatchLater = (id) => {
    const newWatchLaters = watchLaters.includes(id)
    ? watchLaters.filter((movieId) => movieId !== id)
    : [...watchLaters, id];

    setWatchLaters(newWatchLaters);
    localStorage.setItem('watchLaters', JSON.stringify(newWatchLaters))
  }
  
  const isWatchLater = (id) => watchLaters.includes(id)

  return (
    <Box sx={{ width: 1, margin: "20 auto", padding: "1em 5em"  }}>
    <h1 style={{paddingBottom: 10}} >
      Trend Movies Weekly
    </h1>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
        movies?.map((movie) => (
          <Box gridColumn="span 4">
            <InfoCard 
              key={movie.id} 
              movie={movie} 
              loading={loading}
              isWatchLater={isWatchLater}
              handleWatchLater={handleWatchLater}
              handleMovieDetail={handleMovieDetail}
            />
          </Box>
        )))}
      </Box>
    </Box>
  );
};

export default Movies;
