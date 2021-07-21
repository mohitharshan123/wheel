import React from "react";
import PropTypes from "prop-types";

import notesReducer from "reducers/notes";

const initialState = [
  {
    id: 1,
    title: "First note",
    description: "This is a test",
    tags: [{ id: 1, label: "Internal", color: "green" }],
    created_date: "Apr 10, 2021",
    due_date: "Apr 10, 2021",
    contact: "Mohit Harshan",
  },
  {
    id: 2,
    title: "Second note",
    description: "This is a test.This is a test.This is a test.This is a test",
    tags: [{ id: 2, label: "Agile Workflow", color: "blue" }],
    created_date: "Dec 10, 2020",
    due_date: "",
    contact: "Abhay Harshan",
  },
];

const NotesStateContext = React.createContext(initialState);
const NotesDispatchContext = React.createContext(null);

const NotesProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(notesReducer, initialState);

  return (
    <NotesStateContext.Provider value={state}>
      <NotesDispatchContext.Provider value={dispatch}>
        {children}
      </NotesDispatchContext.Provider>
    </NotesStateContext.Provider>
  );
};

const useNotesState = () => {
  const context = React.useContext(NotesStateContext);
  if (context === undefined) {
    throw new Error("useNotesState must be used within a NotesProvider");
  }
  return context;
};

const useNotesDispatch = () => {
  const context = React.useContext(NotesDispatchContext);
  if (context === undefined) {
    throw new Error("useNotesDispatch must be used within a UserProvider");
  }
  return context;
};

const useNotes = () => {
  return [useNotesState(), useNotesDispatch()];
};

NotesProvider.propTypes = {
  children: PropTypes.node,
};

export { NotesProvider, useNotesState, useNotesDispatch, useNotes };
