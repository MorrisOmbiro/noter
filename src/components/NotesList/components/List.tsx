import { Grid } from "@mui/material";
import { NoteAction } from "components/NotesProvider/Context";
import { useNotesContext } from "components/NotesProvider/hooks";
import React from "react";
import { Note } from "types";
import NoteCard from "./NoteCard";

interface Props {
  notes: Note[];
}

const List: React.FC<Props> = ({ notes }) => {
  const [currentId, setCurrentId] = React.useState<string>(
    notes[0].id as string
  );
  const { setCurrentNoteAction } = useNotesContext();
  const handleCollapse = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setCurrentId((prev) => (prev === id ? "" : id));
  };

  const handleDelete = (id: string) => async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setCurrentNoteAction({ id, action: NoteAction.DELETE });
  };
  const handleEdit = (id: string) => async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setCurrentNoteAction({ id, action: NoteAction.EDIT });
  };

  const handleFavorite = (id: string) => async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setCurrentNoteAction({ id, action: NoteAction.FAVORITE });
  };

  return (
    <>
      {notes.map((note: Note) => (
        <Grid
          item
          xs={8}
          md={8}
          key={note.id}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <NoteCard
            note={note}
            collapsed={currentId === (note.id as string)}
            onEdit={handleEdit(note.id as string)}
            onCollapse={handleCollapse(note.id as string)}
            onDelete={handleDelete(note.id as string)}
            onFavorite={handleFavorite(note.id as string)}
          />
        </Grid>
      ))}
    </>
  );
};

export default List;
