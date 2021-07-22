const notesReducer = (notes, { type, payload }) => {
  switch (type) {
  case "ADD_NOTE": {
    return [...notes, payload];
  }
  case "DELETE_NOTES": {
    return notes.filter(note => !payload.includes(note.id));
  }
  case "EDIT_NOTE": {
    const indexOfNoteToEdit = notes.findIndex(note => note.id === payload.id);
    notes[indexOfNoteToEdit] = payload;
    return notes;
  }
  default: {
    throw new Error(`Unhandled action type: ${type}`);
  }
  }
};

export default notesReducer;
