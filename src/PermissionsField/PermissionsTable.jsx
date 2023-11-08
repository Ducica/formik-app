import React, { useState } from "react";
import { Table, Icon, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import { PermissionsModal } from "./PermissionsModal";

export const PermissionsTable = ({
  roles,
  permissions,
  initialPermissionsState,
  fieldPath,
}) => {
  const [permissionsState, setPermissionsState] = useState(
    initialPermissionsState
  );

  const [tableShown, setTableShown] = useState(false);

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
      textAlign="center"
      verticalAlign="middle"
      celled
      padded
      columns={roles?.length + 1}
      unstackable
      compact
      collapsing
    >
      <Table.Header>
        <Table.Row>
          {tableShown && <Table.HeaderCell />}

          {roles?.map(({ value, text }) => (
            <Table.HeaderCell key={value}>
              {text}
              <PermissionsModal
                roles={roles}
                permissions={permissions}
                initialRole={value}
                trigger={
                  <Button
                    icon="pencil"
                    style={{ backgroundColor: "transparent" }}
                  />
                }
                permissionsState={permissionsState}
                fieldPath={fieldPath}
                handleCheckboxClick={handleCheckboxClick}
              />
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      {tableShown && (
        <Table.Body>
          {permissions?.map(({ permissions }) => {
            return permissions.map(
              ({ value: permission, text: permissionName }) => (
                <Table.Row key={permission}>
                  <Table.Cell>{permissionName}</Table.Cell>
                  {roles?.map(({ value, text }) => (
                    <Table.Cell key={value}>
                      {permissionsState[value].includes(permission) && (
                        <Icon name="check" />
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              )
            );
          })}
        </Table.Body>
      )}
    </Table>
  );
};

PermissionsTable.propTypes = {
  roles: PropTypes.array.isRequired,
  permissions: PropTypes.array.isRequired,
  initialPermissionsState: PropTypes.object.isRequired,
  fieldPath: PropTypes.string.isRequired,
};
