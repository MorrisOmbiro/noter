import { FilterQueryParams, Note } from "types";

export const getNotes = async (query: FilterQueryParams): Promise<Note[]> => {
  const queryString = new URLSearchParams(
    query as Record<string, string>
  ).toString();

  const response = await fetch(`http://localhost:5000/note?${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const rawResponse = await response.json();

  return rawResponse.map((note: any) => ({
    ...note,
    id: note._id,
  })) as Note[];
};
export const createNote = async (note: Partial<Note>) => {
  const response = await fetch("http://localhost:5000/note", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const updateNote = async (note: Partial<Note>) => {
  const response = await fetch(`http://localhost:5000/note/${note.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const deleteNote = async (id: string) => {
  const response = await fetch(`http://localhost:5000/note/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getNoteById = async (id: string): Promise<Note> => {
  console.log("id: ", id);
  const response = await fetch(`http://localhost:5000/note/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
