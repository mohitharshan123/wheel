import React, { useState, useEffect } from "react";
import { Button, PageLoader } from "neetoui";
import { Header, SubHeader } from "neetoui/layouts";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import FormPane from "components/Common/FormPane";
import notesApi from "apis/notes";
import SORT_OPTIONS from "constants/sortOptions";
import { useContactsState } from "contexts/contacts";

import ContactTable from "./ContactTable";
import ContactForm from "./ContactForm";

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewContactPane, setShowNewContactPane] = useState(false);
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const contacts = useContactsState();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await notesApi.fetch();
      response.data = contacts;
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }
  return (
    <>
      <Header
        title="Contacts"
        actionBlock={
          <Button
            onClick={() => setShowNewContactPane(true)}
            label="New Contact"
            icon="ri-add-line"
          />
        }
      />
      {contacts.length ? (
        <>
          <SubHeader
            searchProps={{
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
            }}
            deleteButtonProps={{
              onClick: () => null,
              disabled: !selectedContactIds.length,
            }}
            sortProps={{
              options: SORT_OPTIONS.contactsPage,
              sortBy: { column: "name", direction: "asc" },
              onClick: () => null,
            }}
            paginationProps={{
              count: contacts.length,
              pageNo: 1,
              pageSize: 10,
              navigate: () => null,
            }}
            toggleFilter={() => null}
          />
          <ContactTable
            selectedContactIds={selectedContactIds}
            setSelectedContactIds={setSelectedContactIds}
            contacts={contacts}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyNotesListImage}
          title="Looks like you don't have any contacts!"
          subtitle="Add your contacts to send customized emails to them."
          primaryAction={() => setShowNewContactPane(true)}
          primaryActionLabel="Add New Contact"
        />
      )}
      <FormPane
        title="Add Contact"
        Form={ContactForm}
        showPane={showNewContactPane}
        setShowPane={setShowNewContactPane}
      />
    </>
  );
};

export default Contacts;
