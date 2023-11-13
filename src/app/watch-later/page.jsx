"use client"
import React, {useState, useEffect, useCallback, useMemo} from "react";
import { Typography, Stack } from "@mui/material";
import InfoCard from "@/components/InfoCard";
import Box from '@mui/material/Box';
import { getTrendMovies } from "../api";
import Grid from '@mui/material/Grid';

const WatchLater = () => {
  const [watchLaters, setWatchLaters] = useState([]);
  const [movies, setMovies] = useState([])
  const [tvs, setTvs] = useState([])

  useEffect(() => {
    getTrendMovies('movie').then((response) => {
      setMovies(response)
    })
    getTrendMovies('tv').then((response) => {
      setTvs(response)
    })
    const storedWatchLaters = JSON.parse(localStorage.getItem('watchLaters'));
    if (storedWatchLaters) {
      setWatchLaters(storedWatchLaters);
    }
  }, [])

  const allContent = useMemo(() => {
    return [...movies, ...tvs];
  }, [movies, tvs])
  
   const handleWatchLater = (id) => {
    const newWatchLaters = watchLaters.includes(id)
      ? watchLaters.filter((movieId) => movieId !== id)
      : [...watchLaters, id];

    setWatchLaters(newWatchLaters);
    localStorage.setItem('watchLaters', JSON.stringify(newWatchLaters))
  }

   const isWatchLater = (id) => watchLaters.includes(id)

  const FavoriteMovies = allContent.filter(
    (movie) => watchLaters.includes(movie.id)
  )

  const watchMovieCount = useMemo(() => {
    return watchLaters.length;
  }, [watchLaters]);

  return (
    <Stack
      sx={
        {
          flexGrow: 1,
          padding: 2,
          paddingTop: 4,
          paddingBottom: 4,
          minHeight: '100vh'
        }
      }
    >
      <Typography variant="h5">Your Watch List</Typography>
      <Typography> Total: {watchMovieCount}</Typography>
      <Grid container spacing={2} >
        {FavoriteMovies.map((id) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
            <InfoCard
              movie={id}
              isWatchLater={isWatchLater}
              handleWatchLater={handleWatchLater}
              dontShowDetail={true}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default WatchLater;
