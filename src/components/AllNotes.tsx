import React from "react";
import AppBar from "./AppBar";
import AppProviders from "./AppProviders";
import NoteDelete from "./NoteDelete";
import NoteField from "./NoteField";
import NotesList from "./NotesList";

const AllNotes: React.FC = () => {
  return (
    <AppProviders>
      <AppBar />
      <NotesList />
      <NoteField />
      <NoteDelete />
    </AppProviders>
  );
};

export default AllNotes;
