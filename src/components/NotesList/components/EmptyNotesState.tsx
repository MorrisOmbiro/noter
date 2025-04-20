import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import { Button, Grid, Typography } from "@mui/material";
import { NoteAction, NotedId } from "components/NotesProvider/Context";
import { useNotesContext } from "components/NotesProvider/hooks";
import React from "react";

/**
 * EmptyNotesState component displays a message and button when there are no notes.
 * It includes an icon, a title, and a button to add a note.
 *
 * @returns {JSX.Element} The rendered component.
 */
const EmptyNotesState: React.FC = () => {
  const { setCurrentNoteAction } = useNotesContext();

  return (
    <Grid container spacing={1} alignItems="center" justifyContent="center">
      <Grid item xs={12}>
        <StickyNote2Icon fontSize="large" />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4">Noter</Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() =>
            setCurrentNoteAction({ id: NotedId.NEW, action: NoteAction.CREATE })
          }
        >
          Add a Note
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" color="textSecondary">
          Add and manage your notes easily.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default EmptyNotesState;
