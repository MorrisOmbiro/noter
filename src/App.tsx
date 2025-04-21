import { createTheme, styled, ThemeProvider } from "@mui/material";
import NotesProvider from "components/NotesProvider/NotesProvider";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AllNotes from "./components/AllNotes";
import Login from "./components/Login";
import OneNote from "./components/OneNote";
import PrivateRoute from "./PrivateRoute";

const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  return !!token && !!user;
};

const customTheme = createTheme(
  {
    components: {
      MuiInputBase: {
        styleOverrides: {
          input: {
            "&::placeholder": {
              color: "#424242",
              opacity: 1,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            textWrap: "nowrap",
            // "&:hover": {
            //   backgroundColor: "#060F0E",
            //   color: "#fff",
            // },
          },
        },
      },
    },
  },
  {
    palette: {
      primary: {
        main: "#424242",
      },
      secondary: {
        main: "#060F0E",
      },
    },
  }
);

const App: React.FC = () => (
  <BrowserRouter basename={import.meta.env.PUBLIC_URL}>
    <ThemeProvider theme={customTheme}>
      <NotesProvider>
        <Container>
          <Switch>
            <Route exact path="/login" component={Login} />

            <PrivateRoute exact path="/notes" component={AllNotes} />
            <PrivateRoute exact path="/notes/:id" component={OneNote} />

            {/* Redirect */}
            <Redirect from="/" to={isLoggedIn() ? "/notes" : "/login"} />
          </Switch>
        </Container>
      </NotesProvider>
    </ThemeProvider>
  </BrowserRouter>
);

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  height: "100vh",
  backgroundColor: "#f0f0f0",
  color: "#333",
  fontFamily: "'Roboto', sans-serif",
  fontSize: "16px",
});

export default App;
