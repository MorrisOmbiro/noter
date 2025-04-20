import React from "react";
import { Note } from "types";

export enum NotedId {
  NEW = "new",
}

export enum NoteAction {
  DO_NOTHING = "doNothing",
  EDIT = "edit",
  DELETE = "delete",
  CREATE = "create",
  FAVORITE = "favorite",
  READ = "read",
}

export type CurrentNoteAction = {
  id: string | null | NotedId;
  action: NoteAction;
};

interface NotesContextType {
  notes: Note[];
  loading: boolean;
  error: string | null;
  currentNoteAction: CurrentNoteAction;
  setCurrentNoteAction: (action: CurrentNoteAction) => void;
  refetchNotes: () => void;
}

export const DEFAULT_NOTE_ACTION: CurrentNoteAction = {
  id: null,
  action: NoteAction.DO_NOTHING,
};

export const Context = React.createContext<NotesContextType>({
  notes: [],
  loading: false,
  error: null,
  currentNoteAction: DEFAULT_NOTE_ACTION,
  setCurrentNoteAction: () => {},
  refetchNotes: () => {},
});
