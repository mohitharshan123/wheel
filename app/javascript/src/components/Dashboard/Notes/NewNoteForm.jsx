import React, { useMemo } from "react";
import { Formik, Form, Field } from "formik";
import { Input, Textarea, Select, Switch } from "neetoui/formik";
import { Button, DateInput, Label, Toastr } from "neetoui";
import formInitialValues from "constants/formInitialValues";
import FORM_VALIDATION_SCHEMA from "constants/formValidationSchemas";
import NOTE_FORM_OPTIONS from "constants/notesFormOptions";
import { useNotesDispatch } from "contexts/notes";
import { useContactsState } from "contexts/contacts";

export default function NewNoteForm({ onClose }) {
  const notesDispatch = useNotesDispatch();
  const contacts = useContactsState();
  const contactsForSelection = useMemo(
    () =>
      contacts.map(contact => ({ value: contact.name, label: contact.name })),
    [contacts]
  );

  const handleSubmit = values => {
    notesDispatch({
      type: "ADD_NOTE",
      payload: {
        ...values,
        id: Math.random(),
        created_date: new Date().toDateString(),
      },
    });
    onClose();
    Toastr.success("New Note added successfully");
  };

  return (
    <Formik
      initialValues={formInitialValues.notesForm}
      onSubmit={handleSubmit}
      validationSchema={FORM_VALIDATION_SCHEMA.notesForm}
    >
      {({ isSubmitting, isValid, touched, values, setFieldValue }) => (
        <Form className="flex flex-col space-y-4">
          <Input label="Note Title" name="title" />
          <Select
            label="Tags"
            placeholder="Select a Tag"
            name="tag"
            options={NOTE_FORM_OPTIONS.tags}
          />
          <Textarea label="Note Description" name="description" rows={8} />
          <Select
            label="Assigned Contact"
            placeholder="Select a contact"
            isClearable={true}
            isSearchable={true}
            name="contact"
            options={contactsForSelection}
          />
          <div className="flex flex-row justify-between">
            <Label>Add Due Date To Note</Label>
            <Field as={Switch} name="enableDueDate" />
          </div>
          <DateInput
            className={`${values.enableDueDate ? "block" : "hidden"}`}
            label="Due Date"
            name="due_date"
            onChange={newDate =>
              setFieldValue("due_date", newDate.toDateString())
            }
          />
          <div className="nui-pane__footer nui-pane__footer--absolute">
            <Button
              onClick={onClose}
              label="Cancel"
              size="large"
              style="secondary"
            />
            <Button
              type="submit"
              label="Submit"
              size="large"
              style="primary"
              className="ml-2"
              disabled={isSubmitting || !touched || !isValid}
              loading={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
