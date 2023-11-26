"use client"
import React, {useState, useEffect, useCallback, useMemo} from "react";
import { Typography, Stack } from "@mui/material";
import InfoCard from "@/components/InfoCard";
import { getTrendMovies } from "@/utils/api";
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch} from "react-redux";
import { toggleFavorite } from "@/redux/favoritesSlice";

const WatchLater = () => {
  const [movies, setMovies] = useState([])
  const [tvs, setTvs] = useState([])
  const dispatch = useDispatch()

  const favorites = useSelector((state) => state.favorites)
  
  useEffect(() => {
    const fetchMovies = async () => {
      const movieResponse = await getTrendMovies('movie');
      setMovies(movieResponse);
    };

    const fetchTVs = async () => {
      const tvResponse = await getTrendMovies('tv');
      setTvs(tvResponse)
    }
    fetchMovies()
    fetchTVs()
  }, [])

  const allContent = useMemo(() => {
    return [...movies, ...tvs];
  }, [movies, tvs])
  

  const favoriteMovies = useMemo(() => {
    return allContent.filter((content) => favorites[content.id]);
  }, [allContent, favorites])

  const watchMovieCount = useMemo(() => {
    return favoriteMovies.length;
  }, [favoriteMovies]);

  const handleFavoriteToggle = (id) => {
    dispatch(toggleFavorite({ id }))
  }

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
        {favoriteMovies.map((fav) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={fav.id}>
            <InfoCard
              movie={fav}
              handleWatchLater={() => handleFavoriteToggle(fav.id)}
              isWatchLater={favorites[fav.id] || false}
              dontShowDetail={true}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default WatchLater;
