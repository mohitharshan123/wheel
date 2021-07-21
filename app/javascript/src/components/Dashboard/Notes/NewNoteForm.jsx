import React from "react";
import { Formik, Form, Field } from "formik";
import { Input, Textarea, Select, Switch } from "neetoui/formik";
import { Button, DateInput, Label, Toastr } from "neetoui";

import formValidationSchemas from "constants/formValidationSchemas";
import formInitialValues from "constants/formInitialValues";
import notesFormOptions from "constants/notesFormOptions";
import { useNotesDispatch } from "contexts/notes";

export default function NewNoteForm({ onClose }) {
  const notesDispatch = useNotesDispatch();

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
      validationSchema={formValidationSchemas.notesForm}
    >
      {({ isSubmitting, isValid, touched, values, setFieldValue }) => (
        <Form className="flex flex-col space-y-4">
          <Input label="Note Title" name="title" />
          <Select
            label="Tags"
            placeholder="Select a Tag"
            name="tag"
            options={notesFormOptions.tags}
          />
          <Textarea label="Note Description" name="description" rows={8} />
          <Select
            label="Assigned Contact"
            placeholder="Select a contact"
            isClearable={true}
            isSearchable={true}
            name="contact"
            options={notesFormOptions.contacts}
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
