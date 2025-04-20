import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Grid,
  Link,
  AppBar as MuiAppBar,
  TextField,
  Toolbar,
} from "@mui/material";
import { NoteAction, NotedId } from "components/NotesProvider/Context";
import { useNotesContext } from "components/NotesProvider/hooks";
import React from "react";

const AppBar: React.FC = () => {
  const { notes, setCurrentNoteAction } = useNotesContext();

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: "#f5f5f5",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar>
        <Link
          href="/notes"
          variant="h6"
          sx={{
            flexGrow: 1,
            color: "ActiveBorder",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Noter
        </Link>

        {notes.length > 0 && (
          <Grid
            container
            justifyContent="center"
            sx={{ with: "100%", maxWidth: "800px", margin: "0 auto" }}
          >
            <Grid
              item
              xs={12}
              md={8}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search"
                size="small"
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ marginRight: "4px", color: "#8c8c8c" }} />
                  ),
                }}
              />
              <Button
                variant="contained"
                onClick={() =>
                  setCurrentNoteAction({
                    id: NotedId.NEW,
                    action: NoteAction.CREATE,
                  })
                }
              >
                Add a Note
              </Button>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
