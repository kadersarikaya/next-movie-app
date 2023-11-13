import { Grid, Skeleton, Stack, Box } from '@mui/material';

const IsSkeleton = () => {
    return (
      <Box>
        <Skeleton 
          variant="rectangular"
          width={330}
          height={500}
        />
        <Skeleton 
          variant="text"
          width={200}
          height={30}
        />
        <Skeleton 
          variant="text"
          width={200}
          height={50}
        />
        <Box
        sx={{ display: "flex", justifyContent:"end" }}>
          <Box >
            <Skeleton 
              variant="circular"
              width={20}
              height={20}
            />
          </Box>
        </Box>
      </Box>
    )
};
export default IsSkeleton;
