const notesReducer = (notes, { type, payload }) => {
  switch (type) {
  case "ADD_NOTE": {
    return [...notes, payload];
  }
  case "DELETE_NOTES": {
    return notes.filter(note => !payload.includes(note.id));
  }
  default: {
    throw new Error(`Unhandled action type: ${type}`);
  }
  }
};

export default notesReducer;
