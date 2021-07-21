import React, { useState, useEffect } from "react";
import { Button, PageLoader } from "neetoui";
import { Header, SubHeader } from "neetoui/layouts";
import { useNotesState } from "contexts/notes";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import notesApi from "apis/notes";
import SORT_OPTIONS from "constants/sortOptions";
import FormPane from "components/Common/FormPane";

import NoteTable from "./NoteTable";
import DeleteAlert from "./DeleteAlert";
import NewNoteForm from "./NewNoteForm";

const Notes = () => {
  const [loading, setLoading] = useState(true);
  const [showNewNotePane, setShowNewNotePane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);
  const notes = useNotesState();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await notesApi.fetch();
      response.data = notes;
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const OnAlertClose = () => {
    setShowDeleteAlert(false);
    setSelectedNoteIds([]);
  };

  if (loading) {
    return <PageLoader />;
  }
  return (
    <>
      <Header
        title="Notes"
        actionBlock={
          <Button
            onClick={() => setShowNewNotePane(true)}
            label="Add New Note"
            icon="ri-add-line"
          />
        }
      />
      {notes.length ? (
        <>
          <SubHeader
            searchProps={{
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
            }}
            deleteButtonProps={{
              onClick: () => setShowDeleteAlert(true),
              disabled: !selectedNoteIds.length,
            }}
            sortProps={{
              options: SORT_OPTIONS.notesPage,
              sortBy: { column: "title", direction: "asc" },
              onClick: () => null,
            }}
            paginationProps={{
              count: notes.length,
              pageNo: 1,
              pageSize: 10,
              navigate: () => null,
            }}
            toggleFilter={() => null}
          />
          <NoteTable
            selectedNoteIds={selectedNoteIds}
            setSelectedNoteIds={setSelectedNoteIds}
            notes={notes}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyNotesListImage}
          title="Looks like you don't have any notes!"
          subtitle="Add your notes to send customized emails to them."
          primaryAction={() => setShowNewNotePane(true)}
          primaryActionLabel="Add New Note"
        />
      )}
      <FormPane
        title="Add Note"
        Form={NewNoteForm}
        showPane={showNewNotePane}
        setShowPane={setShowNewNotePane}
      />
      {showDeleteAlert && (
        <DeleteAlert
          selectedNoteIds={selectedNoteIds}
          onClose={OnAlertClose}
          refetch={fetchNotes}
        />
      )}
    </>
  );
};

export default Notes;
