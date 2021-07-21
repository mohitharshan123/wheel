import React, { useState, useEffect } from "react";
import notesApi from "apis/notes";
import { Button, PageLoader } from "neetoui";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import { Header, SubHeader } from "neetoui/layouts";
import { useNotesState } from "contexts/notes";
import NoteTable from "./NoteTable";
import NewNotePane from "./NewNotePane";
import DeleteAlert from "./DeleteAlert";

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
              options: [
                { value: "title", label: "Title" },
                { value: "created_date", label: "Created Date" },
                { value: "due_date", label: "Due Date" },
              ],
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
      <NewNotePane
        showPane={showNewNotePane}
        setShowPane={setShowNewNotePane}
        fetchNotes={fetchNotes}
      />
      {showDeleteAlert && (
        <DeleteAlert
          selectedNoteIds={selectedNoteIds}
          onClose={() => {
            setShowDeleteAlert(false);
            setSelectedNoteIds([]);
          }}
          refetch={fetchNotes}
        />
      )}
    </>
  );
};

export default Notes;
