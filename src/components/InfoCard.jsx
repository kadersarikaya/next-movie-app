import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import Rating from '@mui/material/Rating';

const InfoCard = ({ 
  movie,
  handleMovieDetail,
  handleWatchLater,
  isWatchLater,
  dontShowDetail
}) => {

  return (
    <>
      <Card key={movie.id} 
      sx={{ maxWidth: "100%",
      position:"relative",
      }} md={{
        maxWidth: 345,
      }}>
        <Rating 
        sx={{
          position:"absolute",
          top:0,
          right:0,
          margin: "0.5rem",
         }} name="read-only" 
          value={parseFloat(movie.vote_average / 2).toFixed(1)} 
         readOnly />
          {movie.poster_path ?
            <CardMedia
            sx={{
          }}
            component="img"
            alt="green iguana"
            width={345}
            height={500}
            image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          />
          :
          <CardMedia
            component="img"
            alt="green iguana"
            width={345}
            height={500}
            image="https://via.placeholder.com/500x750"
          />
          }
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {
                movie.title || movie.name
              }
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.overview.slice(0, 100)}... 
            </Typography>
        </CardContent>
        <CardActions sx={{display:'flex', justifyContent:"space-between"}} >
            {!dontShowDetail &&
              <Button 
              size="small"
              onClick={() => handleMovieDetail(movie.id)}
            >Learn More
            </Button>
            }
              <BookmarkOutlinedIcon 
                onClick={handleWatchLater}
                color={isWatchLater ? 'error' : 'disabled'}
              />
        </CardActions>
      </Card>
    </>
  );
};

export default InfoCard;
