"use client"
import React, { useEffect, useState } from "react";
import { getMovie, getRecommendations } from "@/app/api";
import { useParams } from "next/navigation";
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import InfoCard from "@/components/InfoCard";
import { useRouter } from "next/navigation";
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import { Box, Grid } from "@mui/material";
const ContentDetail = ({type}) => {
    const [content, setContent] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
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
                console.log(fetchRec);
            } catch (error) {
                console.error(error);
            }
        }
        fetchContentData();
        fetchRecommendations();

    }, [id, type]);

    if (!content) return <div>Loading...</div>;

    return (
        <Box sx={{ width: 1, margin: "10 auto", padding: "1em 5em" }}>  
            <Box sx={{ display: "flex", justifyContent: "center", gap: "1em",
            alignItems: "center", flexWrap:"wrap" }}>     
                {content.poster_path ?
                    <img style={{borderRadius:10, marginBottom: 10}} src={`https://image.tmdb.org/t/p/w500/${content.poster_path}`} alt={content.title} />
                    : <img style={{ borderRadius: 10, marginBottom: 10 }} src="https://via.placeholder.com/500x750" alt="placeholder" />}
                <Stack sx={{textAlign:"center", 
                width:  { xs: '100%', sm: '100%', md: '50%', lg: '50%' }
                }} spacing={2}>
                    <h1>{content.title || content.name}</h1>
                    <p>{content.tagline}</p>
                    <p>{content.overview}</p>
                    <Box sx={{ display:"flex", flexDirection:"row", 
                    justifyContent:"center"}} >
                        <Chip sx={{ marginRight: 1, }} 
                        label={content.release_date || content.last_air_date} variant="outlined" />
                        <Chip label={content.vote_average.toFixed(1)} />
                    </Box>
                </Stack>
            </Box> 

            {recommendations.length > 0 &&
                <Stack sx={{ marginY: "3em" }} className="">
                    <h2 style={{paddingBottom: 10}} >Recommendations</h2>
                    <Grid container spacing={2}>
                        {recommendations?.map((item) => (
                            <Grid item  xs={12} sm={6} md={4} lg={3} >
                                <InfoCard
                                    key={item.id}
                                    movie={item}
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
