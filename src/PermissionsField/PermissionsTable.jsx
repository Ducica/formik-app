import React, { useState } from "react";
import { Table, Icon, Button, Dropdown } from "semantic-ui-react";
import PropTypes from "prop-types";
import { PermissionsModal } from "./PermissionsModal";
import { i18next } from "./i18next";

export const PermissionsTable = ({
  roles,
  permissions,
  initialPermissionsState,
  fieldPath,
}) => {
  const [permissionsState, setPermissionsState] = useState(
    initialPermissionsState
  );

  // when someone closes modal or clicks on cancel
  const handleResetPermissionState = () => {
    setPermissionsState(initialPermissionsState);
  };

  const [permissionsGroup, setPermissionsGroup] = useState(
    permissions[0].group
  );

  const permissionsGroupOptions = permissions.map((item) => ({
    text: item.text,
    value: item.group,
  }));

  const currentGroup = permissions.find(
    (obj) => obj.group === permissionsGroup
  );

  const handleCheckboxClick = (roleValue, permissionValue) => {
    const permissionsArray = permissionsState[roleValue];
    if (permissionsArray?.includes(permissionValue)) {
      let newPermissionsArray = [...permissionsArray];
      newPermissionsArray = newPermissionsArray.filter(
        (permission) => permission !== permissionValue
      );
      setPermissionsState({
        ...permissionsState,
        [roleValue]: newPermissionsArray,
      });
    } else {
      let newPermissionsArray = [...permissionsArray];
      newPermissionsArray.push(permissionValue);
      setPermissionsState({
        ...permissionsState,
        [roleValue]: newPermissionsArray,
      });
    }
  };

  return (
    <Table
      definition
      textAlign="center"
      verticalAlign="middle"
      unstackable
      celled
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={3} />

          {roles?.map(({ value, text }) => (
            <Table.HeaderCell key={value}>
              {text}
              <PermissionsModal
                roles={roles}
                permissions={permissions}
                initialRole={value}
                trigger={
                  <Button
                    icon="pencil green"
                    style={{ backgroundColor: "transparent" }}
                    type="button"
                  />
                }
                permissionsState={permissionsState}
                fieldPath={fieldPath}
                handleCheckboxClick={handleCheckboxClick}
                handleResetPermissionState={handleResetPermissionState}
              />
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {currentGroup?.permissions.map(
          ({ value: permission, text: permissionName }) => (
            <Table.Row key={permission}>
              <Table.Cell>{permissionName}</Table.Cell>
              {roles?.map(({ value, text }) => (
                <Table.Cell key={value}>
                  {initialPermissionsState[value]?.includes(permission) && (
                    <Icon name="check" />
                  )}
                </Table.Cell>
              ))}
            </Table.Row>
          )
        )}
      </Table.Body>
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell
            textAlign="right"
            colSpan={roles.length + 1}
            style={{ fontWeight: "bold" }}
          >
            {i18next.t("You are viewing permissions for: ")}
            <Dropdown
              options={permissionsGroupOptions}
              value={permissionsGroup}
              onChange={(e, data) => setPermissionsGroup(data.value)}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

PermissionsTable.propTypes = {
  roles: PropTypes.array.isRequired,
  permissions: PropTypes.array.isRequired,
  initialPermissionsState: PropTypes.object.isRequired,
  fieldPath: PropTypes.string.isRequired,
};
