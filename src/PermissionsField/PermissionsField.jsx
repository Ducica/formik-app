// This file is part of Invenio-RDM-Records
// Copyright (C) 2020-2023 CERN.
// Copyright (C) 2020-2022 Northwestern University.
// Copyright (C) 2021 Graz University of Technology.
//
// Invenio-RDM-Records is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import React, { Component } from "react";
import PropTypes from "prop-types";
import { getIn, FieldArray } from "formik";
import { Button, Form, Label, List, Icon } from "semantic-ui-react";
import _map from "lodash/map";
import { FieldLabel } from "react-invenio-forms";
import { PermissionsModal } from "./PermissionsModal";
import { PermissionsFieldItem } from "./PermissionsFieldItem";

// TODO: how will we get all the available permissions and their display values (text)
const availablePermissions = [
  { value: "can_create", text: "Can create" },
  { value: "can_read", text: "Can read" },
  { value: "can_update", text: "Can update" },
  { value: "can_delete", text: "Can delete" },
];

//TODO: function from oarepo ui utils - maybe it will be importable
export const object2array = (obj, keyName, valueName) =>
  _map(obj, (value, key) => ({
    [keyName]: key,
    [valueName]: value,
  }));

const permissionsDisplay = (value) => value?.role;

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

            const displayName = permissionsDisplay(value);
            return (
              <PermissionsFieldItem
                fieldPath={fieldPath}
                availablePermissions={availablePermissions}
                key={key}
                {...{
                  displayName,
                  initialPermission: value,
                  addLabel: modal?.addLabel,
                  editLabel: modal?.editLabel,
                }}
              />
            );
          })}
          <PermissionsModal
            availablePermissions={availablePermissions}
            modalAction="add"
            addLabel={modal?.addLabel}
            editLabel={modal?.editLabel}
            trigger={
              <Button type="button" icon labelPosition="left">
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
};

// PermissionsFieldForm.defaultProps = {
//   label: i18next.t("Creators"),
//   labelIcon: "user",
//   modal: {
//     addLabel: i18next.t("Add creator"),
//     editLabel: i18next.t("Edit creator"),
//   },
//   addButtonLabel: i18next.t("Add creator"),
// };
