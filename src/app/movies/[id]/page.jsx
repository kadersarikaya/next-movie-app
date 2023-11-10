"use client"
import React, { useEffect, useState } from "react";
import { getMovie } from "@/app/api";
import { useParams } from "next/navigation";

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMovie("movie", id);
        setMovie(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);


  // useEffect(() => {
  //   const fetchData = async () => {

  //       try {
  //         const response = await getMovie('movie', id);
  //         console.log(response)
  //         setMovie(response);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //   };

  //   fetchData();
  // }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
    </>
  );
};

export default MovieDetail;
