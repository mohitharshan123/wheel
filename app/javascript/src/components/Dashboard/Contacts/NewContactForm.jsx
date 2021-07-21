import React from "react";
import { Formik, Form, Field } from "formik";
import { Input, Select, Switch } from "neetoui/formik";
import { Button, Label, Toastr } from "neetoui";
import formInitialValues from "constants/formInitialValues";
import FORM_VALIDATION_SCHEMA from "constants/formValidationSchemas";
import CONTACTS_FORM_OPTIONS from "constants/contactsFormOptions";
import { useContactsDispatch } from "contexts/contacts";

export default function NewContactForm({ onClose }) {
  const contactsDispatch = useContactsDispatch();

  const handleSubmit = values => {
    contactsDispatch({
      type: "ADD_CONTACT",
      payload: {
        ...values,
        id: Math.random(),
      },
    });
    onClose();
    Toastr.success("New Contact added successfully");
  };

  return (
    <Formik
      initialValues={formInitialValues.contactsForm}
      onSubmit={handleSubmit}
      validationSchema={FORM_VALIDATION_SCHEMA.contactsForm}
    >
      {({ isSubmitting, isValid, touched }) => (
        <Form className="flex flex-col space-y-4">
          <Input label="Name" name="name" />
          <Input label="Email" name="email" />
          <Input
            label="Contact Number"
            placeholder="Eg: 9595476566"
            name="contact_number"
          />

          <Select
            label="Department"
            placeholder="Select a Department"
            name="department"
            options={CONTACTS_FORM_OPTIONS.departments}
          />

          <div className="flex flex-row justify-between">
            <Label>Add to Basecamp</Label>
            <Field as={Switch} name="add_to_basecamp" />
          </div>

          <div className="nui-pane__footer nui-pane__footer--absolute">
            <Button
              onClick={onClose}
              label="Cancel"
              size="large"
              style="secondary"
            />
            <Button
              type="submit"
              label="Save Changes"
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
