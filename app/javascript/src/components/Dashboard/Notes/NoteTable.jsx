import React, { useState } from "react";
import { Checkbox, Badge, Avatar, Tooltip } from "neetoui";
import DeleteAlert from "./DeleteAlert";

export default function NoteTable({
  selectedNoteIds,
  setSelectedNoteIds,
  notes = [],
}) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedRowID, setSelectedRowID] = useState(null);

  return (
    <>
      <div className="w-full p-10">
        <table className="nui-table nui-table--checkbox nui-table--actions nui-table--hover nui-table--avatar">
          <thead>
            <tr>
              <th>
                <Checkbox
                  checked={
                    selectedNoteIds.length === notes.map(note => note.id).length
                  }
                  onChange={() => null}
                  onClick={() => {
                    const noteIds = notes.map(note => note.id);
                    if (selectedNoteIds.length === noteIds.length) {
                      setSelectedNoteIds([]);
                    } else {
                      setSelectedNoteIds(noteIds);
                    }
                  }}
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
              <tr
                key={note.id}
                className={"cursor-pointer bg-white hover:bg-gray-50"}
              >
                <td>
                  <Checkbox
                    checked={selectedNoteIds.includes(note.id)}
                    onChange={() => null}
                    onClick={event => {
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
                    }}
                  />
                </td>
                <td>
                  <div className="flex flex-row items-center justify-start text-gray-900">
                    <a>{note.title}</a>
                  </div>
                </td>
                <td>
                  {note.description.length > 20
                    ? note.description.slice(0, 20) + "..."
                    : note.description}
                </td>
                <td className="text-center">
                  {note.tags.map(tag => (
                    <label key={tag.id}>
                      <Badge color={tag.color}>{tag.label}</Badge>
                    </label>
                  ))}
                </td>
                <td>
                  <label>{note.created_date}</label>
                </td>
                <td>
                  <label>{note.due_date ? note.due_date : "--"}</label>
                </td>
                <td>
                  <label>
                    <Avatar size={36} contact={{ name: note.contact }} />
                  </label>
                </td>
                <td>
                  <div className="flex flex-row space-x-3">
                    <Tooltip
                      content={<span>Edit</span>}
                      position="bottom"
                      className="ml-auto"
                    >
                      <i className="ri-pencil-line ri-lg text-gray-600 hover:text-gray-900"></i>
                    </Tooltip>
                    <Tooltip content={<span>Delete</span>} position="bottom">
                      <i
                        onClick={() => {
                          setShowDeleteAlert(true);
                          setSelectedRowID(note.id);
                        }}
                        className="ri-delete-bin-5-line ri-lg text-gray-600 hover:text-gray-900"
                      ></i>
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
          onClose={() => {
            setShowDeleteAlert(false);
            setSelectedNoteIds([]);
          }}
          refetch={() => null}
        />
      )}
    </>
  );
}
