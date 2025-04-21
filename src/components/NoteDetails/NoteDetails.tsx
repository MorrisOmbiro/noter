import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Chip, Divider, Grid, Typography } from "@mui/material";
import { CategoryColorMap, CategoryIconMap } from "constants";
import React from "react";
import { useParams } from "react-router-dom";
import { getNoteById } from "services/notes";
import { Note } from "types";
import NoteDetailsLoading from "./components/NoteDetailsLoading";

const NoteDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = React.useState<Note | undefined>();
  const [loading, setLoading] = React.useState(false);
  const token = localStorage.getItem("token");

  const handleBackButtonClick = () => {
    window.history.back();
  };

  React.useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const response = await getNoteById(id as string, token as string);
        setNote(response);
        setLoading(false);
      } catch (e) {
        console.error("failed to get note details: ", e);
      }
    };

    fetchNote();
  }, [id]);

  if (loading || !note) {
    return <NoteDetailsLoading />;
  }

  return (
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
          <Button
            onClick={handleBackButtonClick}
            sx={{ margin: 0, padding: 0 }}
            startIcon={<ArrowBackIcon color="secondary" />}
          >
            <Typography variant="body1" color="text.primary" mr={2}>
              back to home page
            </Typography>
          </Button>
        </Box>
      </Grid>
      <Grid item xs={8} md={8}>
        <Divider sx={{ width: "100%" }} />
      </Grid>
      <Grid item xs={8} md={8}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6" color="text.primary" fontWeight="bold">
            {note.title}
          </Typography>
          <div>
            {React.createElement(CategoryIconMap[note.category], {
              sx: { color: CategoryColorMap[note.category] },
            })}
          </div>
        </Box>
      </Grid>
      <Grid item xs={8} md={8}>
        <Box sx={{ padding: "20px" }}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {note.content}
          </Typography>
          {note.tags && note.tags.length > 0 && (
            <Box display="flex" gap={1} flexWrap="wrap" mt={2}>
              {note.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={`#${tag.trim()}`}
                  sx={{
                    padding: "2px 4px",
                    borderRadius: "4px",
                  }}
                />
              ))}
            </Box>
          )}

          <Typography
            mt={2}
            variant="caption"
            color="text.secondary"
            display="block"
          >
            Created: {new Date(note.dateCreated).toLocaleString()}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            gutterBottom
          >
            Updated: {new Date(note.dateUpdated).toLocaleString()}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NoteDetails;
