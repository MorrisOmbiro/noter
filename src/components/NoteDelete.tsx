import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { useNotesContext } from "components/NotesProvider/hooks";
import React from "react";
import { deleteNote } from "services/notes";
import { Note } from "types";
import { DEFAULT_NOTE_ACTION, NoteAction } from "./NotesProvider/Context";

const NoteDelete: React.FC = () => {
  const { notes, currentNoteAction, setCurrentNoteAction, refetchNotes } =
    useNotesContext();
  const currentNote = notes.find(
    (note) => note.id === currentNoteAction.id
  ) as Note;
  const handleCancel = () => {
    setCurrentNoteAction(DEFAULT_NOTE_ACTION);
  };
  const handleDelete = async () => {
    try {
      await deleteNote(currentNoteAction.id as string);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
    setCurrentNoteAction(DEFAULT_NOTE_ACTION);
    refetchNotes();
  };

  const open =
    !!currentNoteAction.id && currentNoteAction.action === NoteAction.DELETE;

  if (!open) {
    return null;
  }

  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open
    >
      <Card
        elevation={3}
        sx={{
          padding: 3,
          width: "100%",
          maxWidth: 800,
          margin: "auto",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <CardHeader
          title="Delete Note"
          titleTypographyProps={{ variant: "h5" }}
          subheader={new Date().toLocaleString()}
        />
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="body1">
              Are you sure you want to delete this note:{" "}
              <strong>{currentNote?.title}</strong>
            </Typography>

            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleDelete}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Backdrop>
  );
};

export default NoteDelete;
