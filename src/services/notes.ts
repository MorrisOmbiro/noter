import { FilterQueryParams, Note } from "types";

const getHeaders = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export const getNotes = async (
  query: FilterQueryParams,
  token: string
): Promise<Note[]> => {
  const queryString = new URLSearchParams(
    query as Record<string, string>
  ).toString();

  const response = await fetch(`http://localhost:5000/note?${queryString}`, {
    method: "GET",
    ...getHeaders(token),
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
export const createNote = async (note: Partial<Note>, token: string) => {
  const response = await fetch("http://localhost:5000/note", {
    method: "POST",
    ...getHeaders(token),
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const updateNote = async (note: Partial<Note>, token: string) => {
  const response = await fetch(`http://localhost:5000/note/${note.id}`, {
    method: "PATCH",
    ...getHeaders(token),
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const deleteNote = async (id: string, token: string) => {
  const response = await fetch(`http://localhost:5000/note/${id}`, {
    method: "DELETE",
    ...getHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getNoteById = async (id: string, token: string): Promise<Note> => {
  const response = await fetch(`http://localhost:5000/note/${id}`, {
    method: "GET",
    ...getHeaders(token),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
