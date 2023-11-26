"use client"
import React, { useEffect, useState } from "react";
import { getCast, getMovie, getRecommendations } from "@/utils/api";
import { useParams } from "next/navigation";
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import InfoCard from "@/components/InfoCard";
import { useRouter } from "next/navigation";
import { Avatar, Box, Grid, Typography, LinearProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "@/redux/favoritesSlice";
import Link from "next/link";

const ContentDetail = ({ type }) => {
    const [content, setContent] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [cast,setCast] = useState([])
    const [loading, setLoading] = useState(true);
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch()

    const { id } = useParams();
    const router = useRouter();

    const handleContentDetail = (id) => {
        router.push(`/${type}/${id}`)
    }

    useEffect(() => {
        const fetchContentData = async () => {
            try {
                const response = await getMovie(type, id);
                setContent(response);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchRecommendations = async () => {
            try {
                const fetchRec = await getRecommendations(type, id);
                setRecommendations(fetchRec);
            } catch (error) {
                console.error(error);
            }
        }

        const fetchCast = async () => {
            try {
                const fetchCast = await getCast(type, id);
                console.log(fetchCast); 
                setCast(fetchCast);
            } catch(error) {
                console.error(error)
            }
        }
        // Set loading to true before fetching data
        setLoading(true);

        // Fetch data and recommendations
        Promise.all([fetchContentData(), fetchRecommendations(), fetchCast()])
            .then(() => {
                // Set loading to false when data is fetched
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                // Set loading to false even if there's an error
                setLoading(false);
            });
    }, [id, type]);

    if (loading) {
        return <LinearProgress />;
    }

    const handleFavoriteToggle = (id) => {
        dispatch(toggleFavorite({ id }))
    }

    return (
        <Box sx={{ padding: 2, minHeight: '100vh' }} >
            <Box sx={{
                display: "flex", justifyContent: "center", gap: "1em",
                alignItems: "center", flexWrap: "wrap"
            }}>
                {content.poster_path ?
                    <img style={{
                        maxWidth: "100%", width: { xs: '100%', sm: '100%', md: '50%', lg: '50%' },
                        borderRadius: 10, marginBottom: 10
                    }} src={`https://image.tmdb.org/t/p/w500/${content.poster_path}`} alt={content.title} />
                    : <img style={{ borderRadius: 10, marginBottom: 10 }} src="https://via.placeholder.com/500x750" alt="placeholder" />}
                <Stack sx={{
                    textAlign: "center",
                    width: { xs: '100%', sm: '100%', md: '50%', lg: '50%' }
                }} spacing={2}>
                    <h1>{content.title || content.name}</h1>
                    <p>{content.tagline}</p>
                    <p>{content.overview}</p>
                        
                    <Box sx={{
                        display: "flex", flexDirection: "row",
                        justifyContent: "center", alignItems: "center"
                    }} >
                        <Typography>Released Date: </Typography>
                        <Chip sx={{ marginRight: 1 }}
                            label={ content.release_date || content.last_air_date} variant="outlined" />
                        <Typography>Vote: </Typography>
                        <Chip label={ content.vote_average.toFixed(1)} />
                    </Box>
                    {content.genres.map((genre) => (
                        <Chip label={genre.name} />
                    ))}
                    <Typography margin="normal" variant="h5">Cast</Typography>
                    <Box sx={{
                        display: "flex", flexDirection: "row", flexWrap: "wrap",
                        justifyContent: "center", alignItems: "center"
                    }} >
                        {cast?.map((castMember) => (
                            <Box sx={{
                                display: "flex",gap:"5px", flexDirection:"column", 
                                justifyContent: "center", alignItems: "center"
                            }} key={castMember.id}>
                                <Box sx={{ padding: "1em" }}>
                                    <Link href={`/actor/${castMember.id}`}>
                                        <Avatar sx={{ width: 66, height: 66 }} src={`https://image.tmdb.org/t/p/w500/${castMember.profile_path}`} />
                                    </Link>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Stack>
            </Box>

            {recommendations.length > 0 &&
                <Stack sx={{ marginY: "3em" }} className="">
                    <h2 style={{ paddingBottom: 10 }} >Recommendations</h2>
                    <Grid container spacing={2}>
                        {recommendations?.map((item) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} >
                                <InfoCard
                                    key={item.id}
                                    movie={item}
                                    isWatchLater={favorites[item.id] || false}
                                    handleWatchLater={() => handleFavoriteToggle(item.id)}
                                    handleMovieDetail={handleContentDetail}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            }
        </Box>
    );
};

export default ContentDetail;
