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
  handleResetPermissionState,
}) => {
  const { setFieldValue } = useFormikContext();
  const [open, setOpen] = React.useState(false);
  const [saveAndContinueLabel, setSaveAndContinueLabel] =
    React.useState("Save and continue");
  const [role, setRole] = useState(initialRole);
  const currentPermissionsForSelectedRole = permissionsState[role];
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setRole(initialRole);
    setOpen(false);
  };
  const changeContent = () => {
    setSaveAndContinueLabel("Added");
    setTimeout(() => {
      setSaveAndContinueLabel("Save and continue");
    }, 1000);
  };

  return (
    <Modal
      centered={false}
      onOpen={() => openModal()}
      open={open}
      trigger={trigger}
      onClose={() => {
        closeModal();
        handleResetPermissionState();
      }}
      closeIcon
      closeOnDimmerClick={false}
    >
      <Modal.Header>
        <Grid>
          <Grid.Row style={{ paddingBottom: 0 }}>
            <Header
              style={{ paddingLeft: "2rem", marginRight: "0.3rem" }}
              as="h2"
            >
              {i18next.t("Editing role: ")}
            </Header>
            <Dropdown
              name={role}
              value={role}
              deburr
              required
              options={roles}
              onChange={(e, data) => setRole(data.value)}
            />
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
                      checked={currentPermissionsForSelectedRole?.includes(
                        value
                      )}
                      onChange={() => handleCheckboxClick(role, value)}
                    />
                  </Grid.Row>
                ))}
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
            handleResetPermissionState();
          }}
          icon="remove"
          content={i18next.t("Cancel")}
          floated="left"
          type="button"
        />

        <Button
          type="button"
          onClick={() => {
            setFieldValue(fieldPath, permissionsState);
            changeContent();
          }}
          primary
          icon="checkmark"
          content={saveAndContinueLabel}
        />

        <Button
          type="button"
          onClick={() => {
            setFieldValue(fieldPath, permissionsState);
            closeModal();
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
  handleResetPermissionState: PropTypes.func.isRequired,
};
