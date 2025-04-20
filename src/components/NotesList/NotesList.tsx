import { Box, Grid } from "@mui/material";
import { useNotesContext } from "components/NotesProvider/hooks";
import React from "react";
import EmptyNotesState from "./components/EmptyNotesState";
import ErrorNotesState from "./components/ErrorNotesState";
import List from "./components/List";
import LoadingNotesState from "./components/LoadingNotesState";

const NotesList: React.FC = () => {
  const { loading, error, notes } = useNotesContext();

  let content = null;

  if (loading)
    content = (
      <Grid
        item
        xs={8}
        md={8}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <LoadingNotesState cardCount={5} />
      </Grid>
    );
  if (error)
    content = (
      <Grid
        item
        xs={8}
        md={8}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <ErrorNotesState />
      </Grid>
    );
  if (!loading && !error && notes.length === 0)
    content = (
      <Grid
        item
        xs={8}
        md={8}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <EmptyNotesState />
      </Grid>
    );

  if (!loading && !error && notes.length > 0) content = <List notes={notes} />;

  return (
    <Box>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{
          marginTop: "80px",
          paddingBottom: "80px",
        }}
      >
        {content}
      </Grid>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60px",
          backgroundColor: "#f5f5f5",
          boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)",
        }}
      ></Box>
    </Box>
  );
};

export default NotesList;
