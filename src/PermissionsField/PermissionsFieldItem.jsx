import _omit from "lodash/omit";
import React from "react";
import { Button, List } from "semantic-ui-react";
import { PermissionsModal } from "./PermissionsModal";
import PropTypes from "prop-types";
import { useFormikContext, getIn } from "formik";
import { i18next } from "./i18next";

export const PermissionsFieldItem = ({
  addLabel,
  editLabel,
  initialPermission,
  displayName,
  availablePermissions,
  fieldPath,
  permissionsList,
  index,
  availableRoles,
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
          fieldPath={fieldPath}
          index={index}
          permissionsList={permissionsList}
          availablePermissions={availablePermissions}
          availableRoles={availableRoles}
          addLabel={addLabel}
          editLabel={editLabel}
          modalAction="edit"
          trigger={
            <Button size="mini" primary type="button">
              {i18next.t("Edit")}
            </Button>
          }
        />
        <Button
          size="mini"
          type="button"
          onClick={() => removePermission(role)}
        >
          {i18next.t("Remove")}
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

PermissionsFieldItem.defaultProps = {
  addLabel: undefined,
  editLabel: undefined,
  displayName: undefined,
  autocompleteNames: undefined,
};
