import { Star, StarBorderOutlined } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandIcon from "@mui/icons-material/Expand";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { CategoryColorMap, CategoryIconMap } from "constants";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Note } from "types";

interface NoteCardProps {
  collapsed: boolean;
  note: Note;
  onEdit: (event: React.MouseEvent) => void;
  onDelete: (event: React.MouseEvent) => void;
  onCollapse: (event: React.MouseEvent) => void;
  onFavorite: (event: React.MouseEvent) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  collapsed,
  note,
  onCollapse,
  onEdit,
  onDelete,
  onFavorite,
}) => {
  const history = useHistory();
  const location = useLocation();

  const handleCategoryChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const newCategory = event.currentTarget.innerText;
    if (location.search.includes(`category=${newCategory}`)) return;
    history.push({
      search: `?category=${newCategory}`,
    });
  };

  const handleReadMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    history.push({
      pathname: `/notes/${note.id}`,
    });
  };

  return (
    <Card
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "800px",
        padding: 2,
      }}
    >
      <CardHeader
        titleTypographyProps={{ variant: "h6", sx: { fontWeight: "bold" } }}
        title={note.title}
        action={
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <IconButton aria-label="expand" onClick={onFavorite}>
              {note.favorite ? (
                <Star fontSize="small" sx={{ color: "gold" }} />
              ) : (
                <StarBorderOutlined fontSize="small" />
              )}
            </IconButton>
            <IconButton aria-label="expand" onClick={onCollapse}>
              <ExpandIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="edit" onClick={onEdit}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="delete" onClick={onDelete}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        }
      />
      <CardContent>
        <Collapse in={collapsed}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {note.content}
          </Typography>
        </Collapse>
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
        <Grid container display="flex" justifyContent="space-between">
          <Grid item xs={6}>
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
          </Grid>
          <Grid item>
            <Button onClick={handleReadMore} sx={{ padding: 0 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                gutterBottom
                sx={{ textDecoration: "underline" }}
              >
                Read more
              </Typography>
            </Button>
          </Grid>
        </Grid>

        <Button
          aria-label="expand"
          onClick={handleCategoryChange}
          sx={{
            padding: 0,
            marginRight: 1,
            color: CategoryColorMap[note.category],
          }}
          startIcon={
            <>
              {React.createElement(CategoryIconMap[note.category], {
                sx: { color: CategoryColorMap[note.category] },
              })}
            </>
          }
        >
          {note.category}
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
