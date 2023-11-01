// This file is part of Invenio-RDM-Records
// Copyright (C) 2020-2023 CERN.
// Copyright (C) 2020-2022 Northwestern University.
// Copyright (C) 2021 New York University.
//
// Invenio-RDM-Records is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

// import { i18next } from "@translations/docs_app/i18next";
import _omit from "lodash/omit";
import React from "react";
import { Button, List } from "semantic-ui-react";
import { PermissionsModal } from "./PermissionsModal";
import PropTypes from "prop-types";
import { useFormikContext, getIn } from "formik";

export const PermissionsFieldItem = ({
  addLabel,
  editLabel,
  initialPermission,
  displayName,
  availablePermissions,
  fieldPath,
}) => {
  const { setFieldValue, values } = useFormikContext();
  const removePermission = (roleName) => {
    let permissions = getIn(values, fieldPath, {});
    permissions = _omit(permissions, roleName);
    setFieldValue(fieldPath, permissions);
  };
  const { role } = initialPermission;
  return (
    <List.Item key={role}>
      <List.Content floated="right">
        <PermissionsModal
          availablePermissions={availablePermissions}
          addLabel={addLabel}
          editLabel={editLabel}
          initialPermission={initialPermission}
          modalAction="edit"
          trigger={
            <Button size="mini" primary type="button">
              {/* {i18next.t("Edit")} */}
              Edit
            </Button>
          }
        />
        <Button
          size="mini"
          type="button"
          onClick={() => removePermission(role)}
        >
          {/* {i18next.t("Remove")} */}
          Remove
        </Button>
      </List.Content>

      <List.Content>
        <List.Description>{displayName}</List.Description>
      </List.Content>
    </List.Item>
  );
};

PermissionsFieldItem.propTypes = {
  addLabel: PropTypes.node,
  editLabel: PropTypes.node,
  initialPermission: PropTypes.object.isRequired,
  displayName: PropTypes.string,
};

// PermissionsFieldItem.defaultProps = {
//   identifiersError: undefined,
//   addLabel: undefined,
//   editLabel: undefined,
//   displayName: undefined,
//   autocompleteNames: undefined,
// };
