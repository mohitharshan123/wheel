import React, { useState } from "react";
import { Checkbox, Badge, Avatar, Tooltip, Button } from "neetoui";
import FormPane from "components/Common/FormPane";

import DeleteAlert from "./DeleteAlert";
import NoteForm from "./NoteForm";

export default function NoteTable({
  selectedNoteIds,
  setSelectedNoteIds,
  notes = [],
}) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showNotePane, setShowNotePane] = useState(false);

  const handleMasterSelectionChange = () => {
    const noteIds = notes.map(note => note.id);
    if (selectedNoteIds.length === noteIds.length) {
      setSelectedNoteIds([]);
    } else {
      setSelectedNoteIds(noteIds);
    }
  };

  const handleItemSelectionChange = (event, note) => {
    event.stopPropagation();
    const index = selectedNoteIds.indexOf(note.id);
    if (index > -1) {
      setSelectedNoteIds([
        ...selectedNoteIds.slice(0, index),
        ...selectedNoteIds.slice(index + 1),
      ]);
    } else {
      setSelectedNoteIds([...selectedNoteIds, note.id]);
    }
  };

  const handleItemDeleteClick = note => {
    setShowDeleteAlert(true);
    setSelectedRow(note);
  };

  const handleAlertDialogClose = () => {
    setShowDeleteAlert(false);
    setSelectedNoteIds([]);
  };

  const handleOnEditClicked = row => {
    setShowNotePane(true);
    setSelectedRow(row);
  };

  const getTagColor = note =>
    note.tag.value == "internal"
      ? "green"
      : note.tag.value == "agile"
        ? "blue"
        : "red";

  return (
    <>
      <div className="w-full pt-md pr-lg pl-lg_offset_1">
        <table className="nui-table nui-table--checkbox nui-table--actions nui-table--hover nui-table--avatar">
          <thead>
            <tr>
              <th>
                <Checkbox
                  checked={selectedNoteIds.length === notes.length}
                  onChange={() => null}
                  onClick={handleMasterSelectionChange}
                />
              </th>
              <th className="text-left text-gray-400">Title</th>
              <th className="text-left text-gray-400">Description</th>
              <th className="text-center text-gray-400">Tags</th>
              <th className="text-center text-gray-400">Created Date</th>
              <th className="text-center text-gray-400">Due Date</th>
              <th className="text-center text-gray-400">Contact</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {notes.map(note => (
              <tr key={note.id}>
                <td>
                  <Checkbox
                    checked={selectedNoteIds.includes(note.id)}
                    onChange={() => null}
                    onClick={event => handleItemSelectionChange(event, note)}
                  />
                </td>
                <td>
                  <div className="flex flex-row items-center justify-start text-gray-900">
                    <Button style="link" label={note.title} />
                  </div>
                </td>
                <td className="max-w-xs truncate">{note.description}</td>
                <td className="text-center">
                  <Badge color={getTagColor(note)}>{note.tag.label}</Badge>
                </td>
                <td className="text-center">{note.created_date}</td>
                <td className="text-center">
                  {note.due_date ? note.due_date : "--"}
                </td>
                <td className="text-center">
                  <div className="flex flex-row justify-center">
                    <Avatar size={36} contact={{ name: note.contact.label }} />
                  </div>
                </td>
                <td>
                  <div className="flex flex-row space-x-3">
                    <Tooltip
                      content={<span>Edit</span>}
                      position="bottom"
                      className="ml-auto"
                    >
                      <Button
                        onClick={() => handleOnEditClicked(note)}
                        className="ri-pencil-line ri-lg "
                        style="icon"
                      />
                    </Tooltip>
                    <Tooltip content={<span>Delete</span>} position="bottom">
                      <Button
                        onClick={() => handleItemDeleteClick(note)}
                        className="ri-delete-bin-5-line ri-lg"
                        style="icon"
                      />
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FormPane
        title="Edit Note"
        Form={NoteForm}
        showPane={showNotePane}
        setShowPane={setShowNotePane}
        itemData={selectedRow}
      />
      {showDeleteAlert && (
        <DeleteAlert
          selectedNoteIds={[selectedRow?.id]}
          onClose={handleAlertDialogClose}
          refetch={() => null}
        />
      )}
    </>
  );
}
