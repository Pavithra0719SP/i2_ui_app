"use client";

import React from "react";
import AboutContainer from "./components/notesContainer";
import { store } from "@/app/store/store";
import { Provider } from "react-redux";

export default function Page() {
  return (
    <Provider store={store}>
      <AboutContainer />
    </Provider>
  );
}
