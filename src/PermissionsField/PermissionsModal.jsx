import React from "react";
import { Button, Form, Grid, Header, Modal } from "semantic-ui-react";
import { Formik, useFormikContext, getIn } from "formik";
import { FieldLabel, SelectField } from "react-invenio-forms";
import * as Yup from "yup";
import { CheckboxGroupField } from "./CheckboxGroupField";
import { i18next } from "./i18next";
import PropTypes from "prop-types";

const requiredMessage = i18next.t("This field is required");

const arrayMinLengthMessage = i18next.t(
  "A role must have at least one permission"
);

function translatePermissions(inputArray) {
  const result = {};

  inputArray.forEach((inputObj) => {
    const { role, permissions } = inputObj;
    result[role] = permissions;
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
  addLabel,
  editLabel,
  availablePermissions,
  availableRoles,
  trigger,
  modalAction,
  permissionsList,
  index,
  fieldPath,
}) => {
  // setFieldValue from main formik form
  const { setFieldValue } = useFormikContext();
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState(modalAction);
  const [saveAndContinueLabel, setSaveAndContinueLabel] = React.useState(
    "Save and add another"
  );
  // adding prefix to internal value fieldPath, because it does not work well when formik value is an array directly
  // this is transparent for the user of component (state on top level)
  const initialValues =
    modalAction === ModalActions.ADD
      ? { prefix: [...permissionsList, { role: "", permissions: [] }] }
      : { prefix: permissionsList };

  const permissionsSchema = Yup.object().shape({
    prefix: Yup.array().of(
      Yup.object().shape({
        role: Yup.string().required(requiredMessage),
        permissions: Yup.array().min(1, arrayMinLengthMessage),
      })
    ),
  });

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const changeContent = () => {
    setSaveAndContinueLabel("Added");
    setTimeout(() => {
      setSaveAndContinueLabel("Save and add another");
    }, 2000);
  };

  const onSubmit = (values, formikBag) => {
    const serializedValues = translatePermissions(getIn(values, "prefix", []));
    setFieldValue(fieldPath, { ...serializedValues });
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
      {({ values, resetForm, handleSubmit, errors, setFieldTouched }) => {
        const isAddingRole = modalAction === ModalActions.ADD;

        const rolesFieldPath = isAddingRole
          ? `prefix.${permissionsList.length}.role`
          : `prefix.${index}.role`;

        const permissionsFieldPath = isAddingRole
          ? `prefix.${permissionsList.length}.permissions`
          : `prefix.${index}.permissions`;

        const value = getIn(values, rolesFieldPath, "");

        const usedRoles = getIn(values, "prefix", [])
          .map((item) => item.role)
          .filter((role) => role);

        return (
          <Modal
            size="tiny"
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
                <Grid.Column floated="left">
                  <Header as="h2">{isAddingRole ? addLabel : editLabel}</Header>
                </Grid.Column>
              </Grid>
            </Modal.Header>
            <Modal.Content>
              <Form>
                <SelectField
                  clearable
                  onBlur={() => setFieldTouched(rolesFieldPath)}
                  deburr
                  fieldPath={rolesFieldPath}
                  required
                  label={
                    <FieldLabel htmlFor={"role"} icon="pencil" label="Role" />
                  }
                  options={availableRoles.filter(
                    (o) => !usedRoles.includes(o.value) || o.value === value
                  )}
                />
                <CheckboxGroupField
                  fieldPath={permissionsFieldPath}
                  availablePermissions={availablePermissions}
                />
                {/* <FormikStateLogger /> */}
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button
                size="mini"
                name="cancel"
                onClick={() => {
                  resetForm();
                  closeModal();
                }}
                icon="remove"
                content={i18next.t("Cancel")}
                floated="left"
              />

              {isAddingRole && (
                <Button
                  size="mini"
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
                size="mini"
                name="submit"
                type="submit"
                onClick={() => {
                  setAction("saveAndClose");
                  handleSubmit();
                }}
                primary
                icon="checkmark"
                content={i18next.t("Save")}
              />
            </Modal.Actions>
          </Modal>
        );
      }}
    </Formik>
  );
};

PermissionsModal.propTypes = {
  modalAction: PropTypes.oneOf(["add", "edit"]).isRequired,
  addLabel: PropTypes.string.isRequired,
  editLabel: PropTypes.string.isRequired,
  trigger: PropTypes.object.isRequired,
  roleOptions: PropTypes.array,
  availablePermissions: PropTypes.array.isRequired,
  availableRoles: PropTypes.array.isRequired,
  permissionsList: PropTypes.array.isRequired,
  index: PropTypes.number,
};
