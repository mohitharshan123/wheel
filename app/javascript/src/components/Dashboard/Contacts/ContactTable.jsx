import React, { useState } from "react";
import { Checkbox, Avatar, Tooltip, Button } from "neetoui";
import FormPane from "components/Common/FormPane";

import ContactForm from "./ContactForm";

export default function ContactTable({
  selectedContactIds,
  setSelectedContactIds,
  contacts = [],
}) {
  const [showContactPane, setShowContactPane] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleMasterSelectionChange = () => {
    const contacIds = contacts.map(contact => contact.id);
    if (selectedContactIds.length === contacIds.length) {
      setSelectedContactIds([]);
    } else {
      setSelectedContactIds(contacIds);
    }
  };

  const handleItemSelectionChange = (event, contact) => {
    event.stopPropagation();
    const index = selectedContactIds.indexOf(contact.id);
    if (index > -1) {
      setSelectedContactIds([
        ...selectedContactIds.slice(0, index),
        ...selectedContactIds.slice(index + 1),
      ]);
    } else {
      setSelectedContactIds([...selectedContactIds, contact.id]);
    }
  };

  const handleOnEditClicked = contact => {
    setShowContactPane(true);
    setSelectedRow(contact);
  };

  return (
    <>
      <div className="w-full pt-md pr-lg pl-lg_offset_1">
        <table className="nui-table nui-table--checkbox nui-table--actions nui-table--hover nui-table--avatar">
          <thead>
            <tr>
              <th>
                <Checkbox
                  checked={selectedContactIds.length === contacts.length}
                  onChange={() => null}
                  onClick={handleMasterSelectionChange}
                />
              </th>
              <th className="text-left text-gray-400">Name</th>
              <th className="text-left text-gray-400">Email</th>
              <th className="text-center text-gray-400">Department</th>
              <th className="text-center text-gray-400">Contact Number</th>
              <th className="text-center text-gray-400">Add To Basecamp</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact.id}>
                <td>
                  <Checkbox
                    checked={selectedContactIds.includes(contact.id)}
                    onChange={() => null}
                    onClick={event => handleItemSelectionChange(event, contact)}
                  />
                </td>
                <td>
                  <div className="flex flex-row items-center space-x-3 text-gray-900">
                    <Avatar size={36} contact={{ name: contact.name }} />
                    <span>{contact.name}</span>
                  </div>
                </td>
                <td className="max-w-xs truncate">{contact.email}</td>
                <td className="text-center">{contact.department.label}</td>
                <td className="text-center">{contact.contact_number}</td>
                <td>
                  <div className="flex flex-row justify-center">
                    <Checkbox
                      className="pointer-events-none"
                      onChange={() => false}
                      name="add_to_basecamp"
                      checked={contact.add_to_basecamp}
                    />
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
                        onClick={() => handleOnEditClicked(contact)}
                        className="ri-pencil-line ri-lg "
                        style="icon"
                      />
                    </Tooltip>
                    <Tooltip content={<span>Delete</span>} position="bottom">
                      <Button
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
        title="Edit Contact"
        Form={ContactForm}
        showPane={showContactPane}
        setShowPane={setShowContactPane}
        itemData={selectedRow}
      />
    </>
  );
}
