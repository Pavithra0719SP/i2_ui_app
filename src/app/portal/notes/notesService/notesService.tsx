import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Note } from "./notesSlice";
import { BASE_URL } from "@/app/common/url/url";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const response = await axios.get<Note[]>(`${BASE_URL}/note`);
  return response.data;
});


export const addNote = createAsyncThunk(
  "notes/addNote",
  async (note: Omit<Note, "note_id">) => {
    const response = await axios.post<Note>(`${BASE_URL}/note`, note);
    return response.data;
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ id, note }: { id: string; note: Omit<Note, "note_id"> }) => {
    const response = await axios.put<Note>(`${BASE_URL}/note/${id}`, note);
    return response.data;
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id: string) => {
    await axios.delete(`${BASE_URL}/note/${id}`);
    return id;
  }
);
