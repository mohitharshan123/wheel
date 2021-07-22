import React from "react";
import PropTypes from "prop-types";
import contactsReducer from "reducers/contacts";
import DUMMY_DATA from "constants/dummyData";

const initialState = DUMMY_DATA.contacts;

const ContactsStateContext = React.createContext(initialState);
const ContactsDispatchContext = React.createContext(null);

const ContactsProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(contactsReducer, initialState);

  return (
    <ContactsStateContext.Provider value={state}>
      <ContactsDispatchContext.Provider value={dispatch}>
        {children}
      </ContactsDispatchContext.Provider>
    </ContactsStateContext.Provider>
  );
};

const useContactsState = () => {
  const context = React.useContext(ContactsStateContext);
  if (context === undefined) {
    throw new Error("useContactsState must be used within a NotesProvider");
  }
  return context;
};

const useContactsDispatch = () => {
  const context = React.useContext(ContactsDispatchContext);
  if (context === undefined) {
    throw new Error("useContactsDispatch must be used within a UserProvider");
  }
  return context;
};

const useContacts = () => {
  return [useContactsState(), useContactsDispatch()];
};

ContactsProvider.propTypes = {
  children: PropTypes.node,
};

export { ContactsProvider, useContactsState, useContactsDispatch, useContacts };
