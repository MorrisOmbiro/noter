import { createTheme, styled, ThemeProvider } from "@mui/material";
import React from "react";
import NotesProvider from "./NotesProvider/NotesProvider";

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

interface Props {
  children: React.ReactNode;
}

const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={customTheme}>
      <NotesProvider>
        <Container>{children}</Container>
      </NotesProvider>
    </ThemeProvider>
  );
};

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

export default AppProviders;
