import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Button, Grid, Typography } from "@mui/material";
import React from "react";

const ErrorNotesState: React.FC = () => {
  return (
    <Grid container spacing={1} alignItems="center" justifyContent="center">
      <Grid item xs={12}>
        <WarningAmberIcon fontSize="large" color="warning" />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4">Error Loading Notes</Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" size="large">
          Retry
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" color="textSecondary">
          There was an error loading your notes. Please try again.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ErrorNotesState;
