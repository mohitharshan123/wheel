import React, { useState } from "react";
import { Checkbox, Badge, Avatar, Tooltip, Button } from "neetoui";

import DeleteAlert from "./DeleteAlert";

export default function NoteTable({
  selectedNoteIds,
  setSelectedNoteIds,
  notes = [],
}) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedRowID, setSelectedRowID] = useState(null);

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
    setSelectedRowID(note.id);
  };

  const handleAlertDialogClose = () => {
    setShowDeleteAlert(false);
    setSelectedNoteIds([]);
  };

  return (
    <>
      <div className="w-full p-10">
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
              <th className="text-left text-gray-400">
                <label>Tags</label>
              </th>
              <th className="text-left text-gray-400">
                <label>Created Date</label>
              </th>
              <th className="text-left text-gray-400">
                <label>Due Date</label>
              </th>
              <th className="text-left text-gray-400">
                <label>Contact</label>
              </th>
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
                  <label key={note.tag.id}>
                    <Badge
                      color={
                        note.tag.value == "internal"
                          ? "green"
                          : note.tag.value == "agile"
                            ? "blue"
                            : "red"
                      }
                    >
                      {note.tag.label}
                    </Badge>
                  </label>
                </td>
                <td>
                  <label>{note.created_date}</label>
                </td>
                <td>
                  <label>{note.due_date ? note.due_date : "--"}</label>
                </td>
                <td>
                  <label>
                    <Avatar size={36} contact={{ name: note.contact.label }} />
                  </label>
                </td>
                <td>
                  <div className="flex flex-row space-x-3">
                    <Tooltip
                      content={<span>Edit</span>}
                      position="bottom"
                      className="ml-auto"
                    >
                      <Button className="ri-pencil-line ri-lg " style="text" />
                    </Tooltip>
                    <Tooltip content={<span>Delete</span>} position="bottom">
                      <Button
                        onClick={() => handleItemDeleteClick(note)}
                        className="ri-delete-bin-5-line ri-lg"
                        style="text"
                      />
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showDeleteAlert && (
        <DeleteAlert
          selectedNoteIds={[selectedRowID]}
          onClose={handleAlertDialogClose}
          refetch={() => null}
        />
      )}
    </>
  );
}
