"use client"
import React, {useState, useEffect, useCallback, useMemo} from "react";
import { getTrendMovies } from "../api"; 
import { Typography, Stack } from "@mui/material";
import InfoCard from "@/components/InfoCard";
import Box from '@mui/material/Box';

const WatchLater = () => {
  const [movies, setMovies] = useState([]);
  const [watchLaters, setWatchLaters] = useState([]);

  const getMovies = async () => {
    const response = await getTrendMovies('movie');
    setMovies(response);
  };
  const watchLaterMovies = movies.filter((movie)=>
    watchLaters.includes(movie.id)
  )

  useEffect(()=> {
    getMovies();
    const storedWatchLaters = JSON.parse(localStorage.getItem('watchLaters'));
    if(storedWatchLaters){
      setWatchLaters(storedWatchLaters);
    }
  }, []);

  const handleWatchLater = useCallback(
    (id) => {
      const newWatchLaters = watchLaters.includes(id)
        ? watchLaters.filter((movieId) => movieId !== id)
        : [...watchLaters, id];

      setWatchLaters(newWatchLaters);
      localStorage.setItem('watchLaters', JSON.stringify(newWatchLaters));
    },
    [watchLaters]
    );

  const isWatchLater = (id) => watchLaters.includes(id)

  const watchMovieCount = useMemo(()=> {
    return movies.filter((movie)=> watchLaters.includes(movie.id))
    .length
  }, [movies, watchLaters])

  return (
    <Stack sx={{ width: 1, margin: "20 auto", padding: "1em 5em" }}
     spacing={2}>
      <Typography variant="h5">Your Watch List</Typography>
      <Typography> Total: {watchMovieCount}</Typography>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        {watchLaterMovies.map((movie) => (
          <Box gridColumn="span 4">
            <InfoCard
              movie={movie}
              isWatchLater={isWatchLater}
              handleWatchLater={handleWatchLater}
            />
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default WatchLater;
