"use client"
import React from "react";
import { getTrendMovies } from "@/app/api";
import { useEffect, useState } from 'react';
import InfoCard from "./InfoCard";
import Box from '@mui/material/Box';
import { useRouter } from "next/navigation";
import { Typography, Stack, Grid } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IsSkeleton from "./IsSkeleton";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const TrendContent = ({type}) => {
    const router = useRouter();
    const [content, setContent] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [watchLaters, setWatchLaters] = useState([]);

    const FetchTrendContent = async () => {
        try {
            setLoading(true)
            const response = await getTrendMovies(type)
            setContent(response)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        FetchTrendContent()
        const storedWatch = JSON.parse(localStorage.getItem('watchLaters'))
        if (storedWatch) {
            setWatchLaters(storedWatch)
        }
    }, [type])

    const handleContentDetail = (id) => {
        router.push(`/${type}/${id}`)
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
        <Box sx={
            {
                flexGrow: 1,
                padding: 2,
                paddingTop: 4,
                paddingBottom: 4,
                backgroundColor: '#1F1F1F',
                minHeight: '100vh'
            }
        } >
            <Grid container spacing={2}>
                {loading ?
                    Array.from({ length: 20 }).map((_, index) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={3} 
                            key={index}>
                                <IsSkeleton key={index} />
                            </Grid>
                        )
                    }) :
                    content?.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <InfoCard
                                key={item.id}
                                movie={item}
                                loading={loading}
                                isWatchLater={isWatchLater}
                                handleWatchLater={handleWatchLater}
                                handleMovieDetail={handleContentDetail}
                                dontShowDetail={false}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
};

export default TrendContent;
