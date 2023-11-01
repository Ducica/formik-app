import React, { Component } from "react";
import PropTypes from "prop-types";
import { getIn, FieldArray } from "formik";
import { Button, Form, Label, List, Icon } from "semantic-ui-react";
import _map from "lodash/map";
import { FieldLabel } from "react-invenio-forms";
import { PermissionsModal } from "./PermissionsModal";
import { PermissionsFieldItem } from "./PermissionsFieldItem";
import { i18next } from "./i18next";

// TODO: how will we get all the available permissions and their display values (text)

const uiData = {
  permissions: [
    { value: "can_create", text: "Can create" },
    { value: "can_read", text: "Can read" },
    { value: "can_update", text: "Can update" },
    { value: "can_delete", text: "Can delete" },
  ],
  roles: [
    { value: "owner", text: "Owner" },
    { value: "manager", text: "Manager" },
    { value: "curator", text: "Curator" },
    { value: "reader", text: "Reader" },
  ],
};

//TODO: function from oarepo ui utils - maybe it will be importable
export const object2array = (obj, keyName, valueName) =>
  _map(obj, (value, key) => ({
    [keyName]: key,
    [valueName]: value,
  }));

const permissionsDisplay = (
  { role: currentRole, permissions: currentPermissions },
  { roles: allRoles, permissions: allPermissions }
) => {
  const roleDisplay = allRoles?.find(
    (role) => role.value === currentRole
  )?.text;

  const permissionsDisplayArray = allPermissions
    .filter((permission) => currentPermissions.includes(permission.value))
    .map((permission) => permission.text);

  return (
    <Label.Group>
      <Label color="blue" size="large" style={{ marginRight: "2rem" }}>
        {roleDisplay}
      </Label>
      {permissionsDisplayArray.map((permission, index) => (
        <Label pointing="left" key={index} size="mini">
          {permission}
        </Label>
      ))}
    </Label.Group>
  );
};

class PermissionsFieldForm extends Component {
  render() {
    const {
      form: { values, errors, initialErrors, initialValues },
      name: fieldPath,
      label,
      labelIcon,
      modal,
      addButtonLabel,
      width,
    } = this.props;
    const permissionsObject = getIn(values, fieldPath, {});
    // transform incoming object to array to be displayed by arrayField
    const permissionsList = object2array(
      permissionsObject,
      "role",
      "permissions"
    );

    const formikInitialValues = getIn(initialValues, fieldPath, {});
    const error = getIn(errors, fieldPath, null);
    const initialError = getIn(initialErrors, fieldPath, null);
    const permissionsError =
      error || (permissionsList === formikInitialValues && initialError);

    return (
      <Form.Field width={width} className={permissionsError ? "error" : ""}>
        <FieldLabel htmlFor={fieldPath} icon={labelIcon} label={label} />
        <List>
          {permissionsList?.map((value, index) => {
            const key = `${fieldPath}.${index}`;
            const displayName = permissionsDisplay(value, uiData);
            return (
              <PermissionsFieldItem
                index={index}
                permissionsList={permissionsList}
                fieldPath={fieldPath}
                availablePermissions={uiData.permissions}
                availableRoles={uiData.roles}
                key={key}
                displayName={displayName}
                initialPermission={value}
                addLabel={modal?.addLabel}
                editLabel={modal?.editLabel}
              />
            );
          })}
          <PermissionsModal
            permissionsList={permissionsList}
            fieldPath={fieldPath}
            availablePermissions={uiData.permissions}
            availableRoles={uiData.roles}
            modalAction="add"
            addLabel={modal?.addLabel}
            editLabel={modal?.editLabel}
            trigger={
              <Button type="button" icon labelPosition="left" size="tiny">
                <Icon name="add" />
                {addButtonLabel}
              </Button>
            }
          />
          {permissionsError && typeof permissionsError == "string" && (
            <Label pointing="left" prompt>
              {permissionsError}
            </Label>
          )}
        </List>
      </Form.Field>
    );
  }
}

export class PermissionsField extends Component {
  PermissionsFieldFormComponent = (formikProps) => (
    <PermissionsFieldForm {...formikProps} {...this.props} />
  );

  render() {
    const { fieldPath } = this.props;

    return (
      <FieldArray
        name={fieldPath}
        component={this.PermissionsFieldFormComponent}
      />
    );
  }
}

PermissionsFieldForm.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  addButtonLabel: PropTypes.string,
  modal: PropTypes.shape({
    addLabel: PropTypes.string.isRequired,
    editLabel: PropTypes.string.isRequired,
  }),
  label: PropTypes.string,
  labelIcon: PropTypes.string,
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.number,
};

PermissionsFieldForm.defaultProps = {
  label: i18next.t("Permissions"),
  labelIcon: "user",
  modal: {
    addLabel: i18next.t("Add role"),
    editLabel: i18next.t("Edit role"),
  },
  addButtonLabel: i18next.t("Add role"),
};
