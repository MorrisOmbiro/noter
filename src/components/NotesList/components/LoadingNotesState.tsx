import { Box, Card, CardContent, CardHeader, Skeleton } from "@mui/material";
import React from "react";

interface Props {
  cardCount?: number;
}

const LoadingNotesState: React.FC<Props> = ({ cardCount = 1 }) => {
  return (
    <Box sx={{ width: "100%", maxWidth: "800px" }}>
      {Array.from({ length: cardCount }).map((_, idx) => (
        <Card sx={{ marginBottom: "16px" }} key={idx}>
          <CardHeader
            title={<Skeleton variant="text" width="60%" height={30} />}
            action={<Skeleton variant="circular" width={40} height={40} />}
          />
          <CardContent>
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="90%" height={20} />
            <Skeleton variant="text" width="80%" height={20} />
            <Box display="flex" gap={1} flexWrap="wrap" mt={2}>
              <Skeleton variant="rectangular" width={60} height={30} />
              <Skeleton variant="rectangular" width={60} height={30} />
              <Skeleton variant="rectangular" width={60} height={30} />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default LoadingNotesState;
