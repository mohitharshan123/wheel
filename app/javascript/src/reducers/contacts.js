const contactsReducer = (contacts, { type, payload }) => {
  switch (type) {
  case "ADD_CONTACT": {
    return [...contacts, payload];
  }
  default: {
    throw new Error(`Unhandled action type: ${type}`);
  }
  }
};

export default contactsReducer;
