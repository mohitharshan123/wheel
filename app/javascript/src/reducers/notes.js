const notesReducer = (state, { type, payload }) => {
  switch (type) {
  case "ADD_NOTE": {
    return [...state, payload];
  }
  case "DELETE_NOTE": {
    return [];
  }
  default: {
    throw new Error(`Unhandled action type: ${type}`);
  }
  }
};

export default notesReducer;
