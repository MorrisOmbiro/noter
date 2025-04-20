import React from "react";
import { Context } from "./Context";

export const useNotesContext = () => {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error("useNotesContext must be used within a NotesProvider");
  }
  return context;
};
