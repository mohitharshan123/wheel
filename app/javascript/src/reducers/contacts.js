const contactsReducer = (contacts, { type, payload }) => {
  switch (type) {
  case "ADD_CONTACT": {
    return [...contacts, payload];
  }
  case "EDIT_CONTACT": {
    const indexOfNoteToEdit = contacts.findIndex(
      contact => contact.id === payload.id
    );
    contacts[indexOfNoteToEdit] = payload;
    return contacts;
  }
  default: {
    throw new Error(`Unhandled action type: ${type}`);
  }
  }
};

export default contactsReducer;
