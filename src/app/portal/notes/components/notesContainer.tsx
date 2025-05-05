"use client";
import { useEffect } from "react";
import About from "./noteView";
import { useAppDispatch } from "@/app/store/hook";
import { fetchNotes } from "../notesService/notesService";

function AboutContainer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  return (
    <>
      <About />
    </>
  );
}

export default AboutContainer;
