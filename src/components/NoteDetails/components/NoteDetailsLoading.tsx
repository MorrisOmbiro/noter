import { Box, Divider, Grid, Skeleton } from "@mui/material";
import React from "react";

const NoteDetailsLoading: React.FC = () => (
  <Grid
    container
    spacing={2}
    justifyContent="center"
    sx={{
      marginTop: "80px",
      paddingBottom: "80px",
    }}
  >
    <Grid item xs={8} md={8}>
      <Box display="flex" alignItems="center" gap={2}>
        <Skeleton variant="rectangular" width={100} height={30} />
      </Box>
    </Grid>
    <Grid item xs={8} md={8}>
      <Divider sx={{ width: "100%" }} />
    </Grid>
    <Grid item xs={8} md={8}>
      <Box display="flex" alignItems="center" gap={1}>
        <Skeleton variant="text" width="20%" height={40} />
        <Skeleton variant="circular" width={40} height={40} />
      </Box>
    </Grid>
    <Grid item xs={8} md={8}>
      <Box sx={{ padding: "20px" }}>
        <Skeleton variant="text" width="100%" height={20} />
        <Skeleton variant="text" width="100%" height={20} />
        <Skeleton variant="text" width="80%" height={20} />
        <Box display="flex" gap={1} flexWrap="wrap" mt={2}>
          <Skeleton variant="rectangular" width={60} height={30} />
          <Skeleton variant="rectangular" width={60} height={30} />
          <Skeleton variant="rectangular" width={60} height={30} />
        </Box>
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="text" width="40%" height={20} />
      </Box>
    </Grid>
  </Grid>
);

export default NoteDetailsLoading;
