// This file is part of Invenio-RDM-Records
// Copyright (C) 2020-2023 CERN.
// Copyright (C) 2020-2022 Northwestern University.
// Copyright (C) 2021 Graz University of Technology.
// Copyright (C) 2022 data-futures.org.
//
// Invenio-RDM-Records is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import React from "react";
import { Button, Form, Grid, Header, Modal } from "semantic-ui-react";
import { Formik, useFormikContext, getIn } from "formik";
import { TextField, FieldLabel } from "react-invenio-forms";
import * as Yup from "yup";
import { CheckboxGroupField } from "./CheckboxGroupField";
import _omit from "lodash/omit";

function translatePermissions(inputObj) {
  const { role, permissions } = inputObj;
  const result = {
    [role]: [],
  };
  permissions.forEach((permission) => {
    result[role].push(permission);
  });
  return result;
}

const FormikStateLogger = () => {
  const state = useFormikContext();
  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};

const ModalActions = {
  ADD: "add",
  EDIT: "edit",
};

export const PermissionsModal = ({
  initialPermission,
  initialAction,
  addLabel,
  editLabel,
  availablePermissions,
  trigger,
  modalAction,
}) => {
  const { values, setFieldValue } = useFormikContext();
  const currentPermissionsState = getIn(values, "permissions", {});
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState(modalAction);
  console.log(action);
  const [saveAndContinueLabel, setSaveAndContinueLabel] = React.useState(
    "Save and add another"
  );
  const initialValues =
    modalAction === ModalActions.ADD
      ? {
          role: "",
          permissions: [],
        }
      : initialPermission;
  const permissionsSchema = Yup.object({});

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const changeContent = () => {
    setSaveAndContinueLabel("Added");
    // change in 2 sec
    setTimeout(() => {
      setSaveAndContinueLabel("Save and add another");
    }, 2000);
  };

  const onSubmit = (values, formikBag) => {
    console.log("submitting");
    const serializedValues = translatePermissions(values);
    console.log(action);
    if (modalAction === ModalActions.ADD) {
      setFieldValue("permissions", {
        ...currentPermissionsState,
        ...serializedValues,
      });
    }
    if (modalAction === ModalActions.EDIT) {
      console.log("Ducciano boss");
      const { role } = values;
      const { role: initialRole } = initialPermission;
      if (role !== initialRole) {
        let newPermissionsState = _omit(currentPermissionsState, initialRole);
        setFieldValue("permissions", {
          ...newPermissionsState,
          ...serializedValues,
        });
      } else {
        setFieldValue("permissions", {
          ...currentPermissionsState,
          ...serializedValues,
        });
      }
    }
    formikBag.setSubmitting(false);
    formikBag.resetForm();
    switch (action) {
      case "saveAndContinue":
        closeModal();
        openModal();
        changeContent();
        break;
      case "saveAndClose":
        closeModal();
        break;
      default:
        break;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={permissionsSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ values, resetForm, handleSubmit, errors }) => (
        <Modal
          centered={false}
          onOpen={() => openModal()}
          open={open}
          trigger={trigger}
          onClose={() => {
            closeModal();
            resetForm();
          }}
          closeIcon
          closeOnDimmerClick={false}
        >
          <Modal.Header as="h6" className="pt-10 pb-10">
            <Grid>
              <Grid.Column floated="left" width={4}>
                <Header as="h2">
                  {modalAction === ModalActions.ADD ? addLabel : editLabel}
                </Header>
              </Grid.Column>
            </Grid>
          </Modal.Header>
          <Modal.Content>
            <Form>
              <TextField
                fieldPath="role"
                required
                label={
                  <FieldLabel htmlFor={"role"} icon="pencil" label="Role" />
                }
              />
              <CheckboxGroupField
                fieldPath="permissions"
                availablePermissions={availablePermissions}
              />
              <FormikStateLogger />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              name="cancel"
              onClick={() => {
                resetForm();
                closeModal();
              }}
              icon="remove"
              //   content={i18next.t("Cancel")}
              content="Cancel"
              floated="left"
            />

            {modalAction === ModalActions.ADD && (
              <Button
                name="submit"
                type="submit"
                onClick={() => {
                  setAction("saveAndContinue");
                  handleSubmit();
                }}
                primary
                icon="checkmark"
                content={saveAndContinueLabel}
              />
            )}
            <Button
              name="submit"
              type="submit"
              onClick={() => {
                setAction("saveAndClose");
                handleSubmit();
              }}
              primary
              icon="checkmark"
              //   content={i18next.t("Save")}
              content="Save"
            />
          </Modal.Actions>
        </Modal>
      )}
    </Formik>
  );
};
