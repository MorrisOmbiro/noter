import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Button,
  Link,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { NoteAction, NotedId } from "components/NotesProvider/Context";
import { useNotesContext } from "components/NotesProvider/hooks";
import React from "react";
import { useHistory } from "react-router-dom";

const AppBar: React.FC = () => {
  const { notes, error, setCurrentNoteAction } = useNotesContext();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user") as string);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    history.replace({
      pathname: "/login",
    });
  };

  const badState = notes.length === 0 || error;

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: "#f5f5f5",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* App Title */}

        <Link
          href="/notes"
          variant="h6"
          sx={{
            color: "ActiveBorder",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Noter
        </Link>

        {/* Add a Note Button */}
        {!badState && (
          <Button
            variant="contained"
            onClick={() =>
              setCurrentNoteAction({
                id: NotedId.NEW,
                action: NoteAction.CREATE,
              })
            }
            sx={{ textTransform: "none" }}
          >
            Add a Note
          </Button>
        )}

        {/* Profile Button */}
        <Button
          onClick={handleMenuOpen}
          startIcon={<AccountCircleIcon />}
          disableRipple
        >
          <Typography
            variant="body1"
            sx={{ marginLeft: 1, fontWeight: "bold", color: "#333" }}
          >
            Hi, {user?.firstName || "User"}
          </Typography>
        </Button>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem disabled>
            <Typography variant="body2">
              {user?.firstName} {user?.lastName}
            </Typography>
          </MenuItem>
          <MenuItem disabled>
            <Typography variant="body2">{user?.email}</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography variant="body2" color="error">
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
