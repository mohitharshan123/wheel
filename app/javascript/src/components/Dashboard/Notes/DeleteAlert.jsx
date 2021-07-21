import React, { useState } from "react";
import { Alert, Toastr } from "neetoui";
import { useNotesDispatch } from "contexts/notes";

export default function DeleteAlert({ refetch, onClose, selectedNoteIds }) {
  const [deleting, setDeleting] = useState(false);
  const notesDispatch = useNotesDispatch();

  const handleDelete = async () => {
    try {
      setDeleting(true);
      notesDispatch({ type: "DELETE_NOTES", payload: selectedNoteIds });
      Toastr.success(
        `${selectedNoteIds.length > 1 ? "Notes" : "Note"} deleted successfuly.`
      );
      onClose();
      refetch();
    } catch (error) {
      logger.error(error);
      Toastr.error("An error occurred.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Alert
      isOpen
      icon="ri-notification-3-line"
      style="danger"
      confirmationText={`Are you sure you want to delete ${
        selectedNoteIds.length > 1 ? "these notes" : "the note"
      }? All of your data will be permanently removed from our database forever. This action cannot be undone.`}
      title={`Delete ${selectedNoteIds.length > 1 ? "notes" : "note"}`}
      submitButtonProps={{
        label: "Delete",
        loading: deleting,
        onClick: handleDelete,
      }}
      cancelButtonProps={{
        onClick: () => onClose(),
      }}
    />
  );
}
