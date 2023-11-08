import axios from 'axios';

const baseURL = 'https://api.themoviedb.org/3'

const axiosInstance = axios.create({
    baseURL
});


 export const fetchMovies = async () => {
    const response = await axiosInstance.get(`/trending/all/week?api_key=4bff102e133b1408d03aba87d5056132`);
    return response.data;
}

//get one movie
 export const fetchMovie = async (id) => {
    const response = await axiosInstance.get(`/movie/${id}?api_key=${API_KEY}`);
    return response.data;
}

// fetchMovieWithSearch = async (search) => {
//     const response = await axiosInstance.get(`/search/movie?api_key=${process.env.API_KEY}&query=${search}`);
//     return response.data;
    

