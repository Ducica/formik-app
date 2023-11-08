import React, { useState } from "react";
import {
  Button,
  Grid,
  Header,
  Modal,
  Dropdown,
  Checkbox,
} from "semantic-ui-react";
import { useFormikContext } from "formik";
import { FieldLabel } from "react-invenio-forms";
import { i18next } from "./i18next";
import PropTypes from "prop-types";

export const PermissionsModal = ({
  permissions,
  roles,
  trigger,
  permissionsState,
  initialRole,
  fieldPath,
  handleCheckboxClick,
}) => {
  const { setFieldValue } = useFormikContext();
  const [open, setOpen] = React.useState(false);
  const [saveAndContinueLabel, setSaveAndContinueLabel] = React.useState(
    "Save and add another"
  );
  const [role, setRole] = useState(initialRole);
  const currentPermissionsForSelectedRole = permissionsState[role];
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

  return (
    <Modal
      centered={false}
      onOpen={() => openModal()}
      open={open}
      trigger={trigger}
      onClose={() => {
        closeModal();
        setRole(initialRole);
      }}
      closeIcon
      closeOnDimmerClick={false}
    >
      <Modal.Header as="h6" className="pt-10 pb-10">
        <Grid>
          <Grid.Row>
            <Grid.Column textAlign="right" width={3}>
              <Header as="h2">Edit role:</Header>
            </Grid.Column>
            <Grid.Column floated="left" width={3}>
              <Dropdown
                name={role}
                value={role}
                deburr
                required
                label={
                  <FieldLabel htmlFor={"role"} icon="pencil" label="Role" />
                }
                options={roles}
                onChange={(e, data) => setRole(data.value)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Header>
      <Modal.Content>
        <Grid padded columns={permissions.length}>
          {permissions?.map(({ group, text, permissions }) => (
            <Grid.Column key={group}>
              <Grid container>
                <Grid.Row style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                  {text}
                </Grid.Row>
                {permissions?.map(({ value, text }) => (
                  <Grid.Row textAlign="justified" key={value}>
                    <Checkbox
                      label={text}
                      checked={currentPermissionsForSelectedRole.includes(
                        value
                      )}
                      onChange={() => handleCheckboxClick(role, value)}
                    />
                  </Grid.Row>
                ))}
                {/* <Grid.Row>
                  <Checkbox
                    label="Select group"
                    checked={currentPermissionsForSelectedRole.includes(value)}
                    onChange={() => handleCheckboxClick(role, value)}
                  />
                </Grid.Row> */}
              </Grid>
            </Grid.Column>
          ))}
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button
          name="cancel"
          onClick={() => {
            closeModal();
            setRole(initialRole);
          }}
          icon="remove"
          content={i18next.t("Cancel")}
          floated="left"
        />

        <Button
          name="submit"
          type="submit"
          onClick={() => {
            setFieldValue(fieldPath, permissionsState);
            changeContent();
          }}
          primary
          icon="checkmark"
          content={saveAndContinueLabel}
        />

        <Button
          name="submit"
          type="submit"
          onClick={() => {
            setFieldValue(fieldPath, permissionsState);
            closeModal();
            setRole(initialRole);
          }}
          primary
          icon="checkmark"
          content={i18next.t("Save")}
        />
      </Modal.Actions>
    </Modal>
  );
};

PermissionsModal.propTypes = {
  permissions: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  trigger: PropTypes.node.isRequired,
  permissionsState: PropTypes.object.isRequired,
  initialRole: PropTypes.string.isRequired,
  fieldPath: PropTypes.string.isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
};
