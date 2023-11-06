import React from "react";
import { Table, Checkbox } from "semantic-ui-react";
import PropTypes from "prop-types";

export const PermissionsTable = ({
  columnNames,
  rowNames,
  handleCheckboxClick,
  permissionsState,
}) => {
  return (
    <Table
      definition
      textAlign="center"
      verticalAlign="middle"
      celled
      size="small"
      compact
      collapsing
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          {columnNames?.map(({ value, text }) => (
            <Table.HeaderCell key={value}>{text}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rowNames?.map(({ value: roleValue, text: roleText }) => (
          <Table.Row key={roleValue}>
            <Table.Cell>{roleText}</Table.Cell>
            {columnNames?.map(
              ({ value: permissionValue, text: permissionText }) => (
                <Table.Cell key={permissionValue}>
                  <Checkbox
                    checked={permissionsState[roleValue]?.includes(
                      permissionValue
                    )}
                    onChange={() =>
                      handleCheckboxClick(roleValue, permissionValue)
                    }
                  />
                </Table.Cell>
              )
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

PermissionsTable.propTypes = {
  columnNames: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  rowNames: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  permissionsState: PropTypes.object.isRequired,
};
