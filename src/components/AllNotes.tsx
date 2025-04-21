import React from "react";
import AppBar from "./AppBar";
import NoteDelete from "./NoteDelete";
import NoteField from "./NoteField";
import NotesList from "./NotesList";

const AllNotes: React.FC = () => {
  return (
    <>
      <AppBar />
      <NotesList />
      <NoteField />
      <NoteDelete />
    </>
  );
};

export default AllNotes;
