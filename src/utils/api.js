import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3/'

const axiosInstance = axios.create({
    baseURL: baseUrl,
});

export const getTrendMovies = async (type) => {
    try {
        const response = await axiosInstance.get(`trending/${type}/week?api_key=4bff102e133b1408d03aba87d5056132`)
        return response.data.results
    }
    catch (error) {
        console.log(error)
    }
}

export const discoverContent = async (type) => {
    try {
        const res = await axiosInstance.get(`discover/${type}?api_key=4bff102e133b1408d03aba87d5056132`)
        return response.data.results
    }
     catch (error) {
        console.log(error)
    }
}

export const getMovie = async (type, id) => {
    try {
        const response = await axiosInstance.get(`${type}/${id}?api_key=4bff102e133b1408d03aba87d5056132`)
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}

export const searchMovies = async (type, query) => {
    try {
        const response = await axiosInstance.get(`search/${type}?api_key=4bff102e133b1408d03aba87d5056132&query=${query}`)
        return response.data.results
    }
    catch (error) {
        console.log(error)
    }
}

export const getRecommendations = async (type, id) => {
    try {
        const response = await axiosInstance.get(`${type}/${id}/recommendations?api_key=4bff102e133b1408d03aba87d5056132`)
        return response.data.results
    }
     catch (error) {
        console.log(error)
    }
}

export const getPopularMovies = async () => {
    try {
        const response = await axiosInstance.get(`movie/popular?api_key=4bff102e133b1408d03aba87d5056132`)
        return response.data.results
    }
     catch (error) {
        console.log(error)
    }
}

export const getTopRatedMovies = async () => {
    try {
        const response = await axiosInstance.get(`movie/top_rated?api_key=4bff102e133b1408d03aba87d5056132`)
        return response.data.results
    }
     catch (error) {
        console.log(error)
    }
}

export const getUpComingMovies = async () => {
    try {
        const response = await axiosInstance.get(`movie/upcoming?
        api_key=4bff102e133b1408d03aba87d5056132`)
        return response.data.results
    }
     catch (error) {
        console.log(error)
    }
}

export const getCast = async (type, id) => {
    try {
        const response = await axiosInstance.get(`${type}/${id}/credits?api_key=4bff102e133b1408d03aba87d5056132`)
        console.log(response)
        const firstFiveCastMembers = response.data.cast.slice(0, 7);
        return firstFiveCastMembers;
    }
    catch (error) {
        console.log(error)
        throw error; // Rethrow the error to be caught in the component
    }
}

export const getActorDetail = async (id) => {
    try {
        const response = await axiosInstance.get(`person/${id}
        ?api_key=4bff102e133b1408d03aba87d5056132`)
        return response.data
    }
    catch (error) {
        console.log(error);
    }
} 