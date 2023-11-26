"use client"
import React, {useState, useEffect} from "react";
import { useParams } from "next/navigation";
import { getActorDetail } from "@/utils/api";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Image from "next/image";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Actor = () => {
 const { id } = useParams();
    const [actor, setActor] = useState("")
    const [loading, setLoading] = useState(true);

 useEffect(() => {
        const fetchCast = async () => {
            try {
                setLoading(true);
                const response = await getActorDetail(id);
                setActor(response);
                setLoading(false)
            } catch (error) {
                console.error(error);
                setLoading(false)
            }
        };
        fetchCast()
    }, [id]);

     if (loading) {
        return <LinearProgress/>
    }
  return (
    <Box sx={{ padding: 2, minHeight: '100vh' }} >
            <Box sx={{
                display: "flex", justifyContent: "center", gap: "1em",
                alignItems: "center", flexWrap: "wrap"
            }}>
                    <img style={{
                        maxWidth: "100%", width: { xs: '100%', sm: '100%', md: '50%', lg: '50%' },
                        borderRadius: 10, marginBottom: 10
                    }} src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}/>
                <Stack sx={{
                    textAlign: "center",
                    width: { xs: '100%', sm: '100%', md: '50%', lg: '50%' }
                }} spacing={2}>
                    <h1>{actor.name}</h1>
                    <p> {actor.place_of_birth}</p>
                    <p>{actor.biography}</p>
                    <Box sx={{
                        display: "flex", flexDirection: "row", flexWrap: "wrap",
                        justifyContent:"center", alignItems:"center"
                    }} >
                        <Box sx={{paddingTop:"1em"}} >
                            <Stack direction="row" spacing={2}>
                            <Item>
                                <Typography variant="h6">Gender</Typography>
                                <Typography>{actor.gender===2 ? "male": "female"}</Typography>
                            </Item>
                            <Item>
                                <Typography variant="h6">Birthday</Typography>
                                <Typography>{actor.birthday}</Typography>
                            </Item>
                            <Item>
                                <Typography variant="h6">Known For</Typography>
                                <Typography>{actor.known_for_department}</Typography>
                            </Item>
                            <Item>
                                <Typography variant="h6">Popularity</Typography>
                                <Typography>{actor.popularity}</Typography>
                            </Item>
                            </Stack>
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </Box>
  )
};

export default Actor;
