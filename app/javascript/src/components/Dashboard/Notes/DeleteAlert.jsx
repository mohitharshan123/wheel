import React, { useState } from "react";
import { Modal, Toastr } from "neetoui";
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
    <Modal
      isOpen
      size="small"
      autoHeight
      showFooter
      submitButtonProps={{
        style: "danger",
        label: "Delete",
        loading: deleting,
        onClick: handleDelete,
      }}
      onClose={onClose}
    >
      <div className="flex">
        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-red-100 rounded-full">
          <i className="text-red-500 ri-alarm-warning-fill ri-lg"></i>
        </div>

        <div className="ml-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">
            Delete {selectedNoteIds.length > 1 ? "notes" : "note"}
          </h3>
          <div className="text-sm leading-5 text-gray-700">
            {`Are you sure you want to delete ${
              selectedNoteIds.length > 1 ? "these notes" : "the note"
            }? All of your data will be permanently removed from our database forever. This action cannot be undone.`}
          </div>
        </div>
      </div>
    </Modal>
  );
}
