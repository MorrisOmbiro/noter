export interface Note {
  id?: string;
  title: string;
  favorite: boolean;
  tags: string[];
  category: NoteCategoryName;
  pinned: boolean;
  content: string;
  userId: string;
  dateCreated: Date;
  dateUpdated: Date;
}

export interface NoteForm {
  title: string;
  favorite: boolean;
  tags: string[];
  category: NoteCategoryName;
  pinned: boolean;
  content: string;
}

export interface NoteCategory {
  name: NoteCategoryName;
  color: string;
}

export enum NoteCategoryName {
  WORK = "Work",
  PERSONAL = "Personal",
  STUDY = "Study",
  OTHER = "Other",
  UNCATEGORIZED = "Uncategorized",
}

export interface FilterQueryParams {
  title?: string;
  tags?: string[];
  category?: NoteCategoryName;
  pinned?: boolean;
  favorite?: boolean;
  userId?: string;
  dateCreated?: Date;
  dateUpdated?: Date;
  content?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface User {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Registration {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
