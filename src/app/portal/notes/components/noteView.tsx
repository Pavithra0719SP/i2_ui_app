"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import Notes from "./notesForm";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import {
  addNote,
  deleteNote,
  updateNote,
} from "../notesService/notesService";

const About = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes);
  console.log("notes", notes);

  const [formState, setFormState] = useState({
    open: false,
    isEditing: false,
    currentNoteId: null as string | null,
    value: { note_title: "", note_content: "" },
  });

  const [message, setMessage] = useState<string | null>(null);
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (key: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      value: { ...prev.value, [key]: value },
    }));
  };

  const handleAdd = async () => {
    await dispatch(addNote(formState.value));
    setFormState({
      ...formState,
      open: false,
      value: { note_title: "", note_content: "" },
    });
    setMessage("Note added!");
  };

  const handleSave = async () => {
    if (formState.currentNoteId) {
      await dispatch(
        updateNote({ id: formState.currentNoteId, note: formState.value })
      );
      setFormState({
        open: false,
        isEditing: false,
        currentNoteId: null,
        value: { note_title: "", note_content: "" },
      });
      setMessage("Note updated!");
    }
  };

  const handleDelete = async () => {
    if (formState.currentNoteId) {
      await dispatch(deleteNote(formState.currentNoteId));
      setFormState({
        open: false,
        isEditing: false,
        currentNoteId: null,
        value: { note_title: "", note_content: "" },
      });
      setMessage("Note deleted!");
    }
  };

  const handleEdit = (note: any) => {
    setFormState({
      open: true,
      isEditing: true,
      currentNoteId: note.note_id,
      value: { note_title: note.note_title, note_content: note.note_content },
    });
  };

  const resetNote = () => {
    setFormState({
      open: true,
      isEditing: false,
      currentNoteId: null,
      value: { note_title: "", note_content: "" },
    });
  };

  return (
    <div className="pr-8 pl-8 pt-14">
      <h1 className="text-3xl text-center font-bold mb-6 mt-8">Your Notes</h1>

      {notes.notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.notes.map((note: any) => (
            <div
              key={note.note_id}
              className="p-4 bg-white shadow rounded-lg relative"
            >
              <h3 className="font-semibold text-lg">{note.note_title}</h3>
              <p className="text-sm mt-1">{note.note_content}</p>
              <button
                className="absolute top-3 right-3 text-blue-500"
                onClick={() => handleEdit(note)}
              >
                <AiOutlineEdit size={18} />
              </button>
            </div>
          ))}
        </div>
      ) : notes.loading ? (
        <p>Loading...</p>
      ) : (
        <p>No notes yet.</p>
      )}

      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow hover:scale-110 transition"
        onClick={resetNote}
      >
        <AiOutlinePlus size={24} />
      </button>

      <Notes
        open={formState.open}
        onClose={() => setFormState((prev) => ({ ...prev, open: false }))}
        value={formState.value}
        onValueChange={handleChange}
        onAdd={handleAdd}
        isEditing={formState.isEditing}
        onSave={handleSave}
        onDelete={handleDelete}
      />

      {message && (
        <div className="fixed top-[650px] left-1/2 g-white/90 backdrop-blur-lg border border-green-500 text-green-700 px-6 py-4 rounded-xl shadow-xl animate-slide-in z-50">
          <div className="flex items-center justify-center text-center">
            <span className="text-sm font-semibold">{message}</span>
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default About;
