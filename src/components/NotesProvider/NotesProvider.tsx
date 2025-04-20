import _isEqual from "lodash/isEqual";
import queryString from "query-string";
import React from "react";
import { useLocation } from "react-router-dom";
import { getNotes } from "services/notes";
import { FilterQueryParams, Note } from "types";
import { Context, CurrentNoteAction, DEFAULT_NOTE_ACTION } from "./Context";

const NotesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [currentNoteAction, setCurrentNoteAction] =
    React.useState<CurrentNoteAction>(DEFAULT_NOTE_ACTION);
  const [refresh, setRefresh] = React.useState(true);
  const [params, setParams] = React.useState<FilterQueryParams>({});
  const location = useLocation();

  const handleRefresh = () => {
    setRefresh(true);
  };

  React.useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await getNotes(params);
        setNotes(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setError("Error loading notes");
        setLoading(false);
      }
    };

    if (refresh) {
      fetchNotes();
      setRefresh(false);
    }
  }, [refresh, params]);

  React.useEffect(() => {
    const newParams = queryString.parse(location.search);
    if (_isEqual(newParams, params)) return;
    setParams(newParams as FilterQueryParams);
    setRefresh(true);
  }, [location.search]);

  return (
    <Context.Provider
      value={{
        notes,
        loading,
        error,
        currentNoteAction,
        setCurrentNoteAction,
        refetchNotes: handleRefresh,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default NotesProvider;
