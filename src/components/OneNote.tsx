import React from "react";
import AppProviders from "./AppProviders";
import NoteDetails from "./NoteDetails";

const OneNote: React.FC = () => {
  return (
    <AppProviders>
      <NoteDetails />
    </AppProviders>
  );
};

export default OneNote;
