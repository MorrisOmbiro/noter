import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import {
  DEFAULT_NOTE_ACTION,
  NoteAction,
} from "components/NotesProvider/Context";
import { useNotesContext } from "components/NotesProvider/hooks";
import React from "react";
import { createNote, updateNote } from "services/notes";
import { NoteCategoryName, NoteForm } from "types";

const NoteField: React.FC = () => {
  const { currentNoteAction, notes, setCurrentNoteAction, refetchNotes } =
    useNotesContext();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") as string);
  const currentNote = notes.find((note) => note.id === currentNoteAction.id);

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [category, setCategory] = React.useState<NoteCategoryName>(
    NoteCategoryName.UNCATEGORIZED
  );

  React.useEffect(() => {
    if (currentNoteAction.action === NoteAction.EDIT && currentNote) {
      setTitle(currentNote.title);
      setContent(currentNote.content);
      setTags(currentNote.tags.join(", "));
      setCategory(currentNote.category);
    }
  }, [currentNoteAction, currentNote]);

  React.useEffect(() => {
    const update = async () => {
      if (currentNoteAction.action === NoteAction.FAVORITE && currentNote) {
        await updateNote(
          {
            id: currentNoteAction.id as string,
            ...(currentNote as NoteForm),
            favorite:
              currentNote?.favorite === null ? true : !currentNote?.favorite,
          },
          token as string
        );
        refetchNotes();
      }
    };

    update();
  }, [currentNoteAction]);

  const resetForm = () => {
    setCurrentNoteAction(DEFAULT_NOTE_ACTION);
    setTitle("");
    setContent("");
    setTags("");
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!title || !content) {
        console.error("Title and content are required");
        return;
      }
      if (currentNoteAction.action === NoteAction.CREATE) {
        await createNote(
          {
            title,
            content,
            tags: tags.split(",").map((tag) => tag.trim()),
            category,
            userId: user?._id,
          },
          token as string
        );
      } else {
        await updateNote(
          {
            id: currentNoteAction.id as string,
            ...(currentNote as NoteForm),
            title,
            content,
            tags: tags.split(",").map((tag) => tag.trim()),
            category,
            userId: user?._id,
          },
          token as string
        );
      }
    } catch (error) {
      console.error("Error creating note:", error);
    }
    resetForm();
    refetchNotes();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTags(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as NoteCategoryName);
  };

  const open =
    currentNoteAction.action === NoteAction.CREATE ||
    currentNoteAction.action === NoteAction.EDIT;

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
          title={
            currentNoteAction.action === NoteAction.CREATE
              ? "Create a Note"
              : "Edit note"
          }
          titleTypographyProps={{ variant: "h5" }}
          subheader={new Date().toLocaleString()}
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
              <InputLabel id="title">Title</InputLabel>
              <TextField
                name="title"
                variant="outlined"
                fullWidth
                required
                onChange={handleTitleChange}
                value={title}
              />
              <InputLabel id="content">Content</InputLabel>
              <TextField
                name="content"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                required
                onChange={handleContentChange}
                value={content}
              />

              <InputLabel id="tags">Tags</InputLabel>
              <TextField
                aria-label="tags"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                placeholder="Add tags separated by commas"
                onChange={handleTagsChange}
                value={tags}
              />
              <InputLabel id="category">Category</InputLabel>
              <Select<NoteCategoryName>
                labelId="category"
                fullWidth
                onChange={handleCategoryChange}
                defaultValue={NoteCategoryName.UNCATEGORIZED}
              >
                <MenuItem value={NoteCategoryName.UNCATEGORIZED}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={NoteCategoryName.WORK}>Work</MenuItem>
                <MenuItem value={NoteCategoryName.PERSONAL}>Personal</MenuItem>
                <MenuItem value={NoteCategoryName.STUDY}>Study</MenuItem>
                <MenuItem value={NoteCategoryName.OTHER}>Other</MenuItem>
              </Select>

              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button variant="outlined" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Backdrop>
  );
};

export default NoteField;
