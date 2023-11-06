import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getIn, useFormikContext } from "formik";
import { FieldLabel } from "react-invenio-forms";
import { PermissionsTable } from "./PermissionsTable";

// TODO: how will we get all the available permissions and their display values (text)

const uiData = {
  permissions: [
    { value: "can_create", text: "Can create" },
    { value: "can_read", text: "Can read" },
    { value: "can_update", text: "Can update" },
    { value: "can_delete", text: "Can delete" },
    { value: "can_create", text: "Can create" },
    { value: "can_read", text: "Can read" },
    { value: "can_update", text: "Can update" },
    { value: "can_delete", text: "Can delete" },
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

export const PermissionsField = ({ label, labelIcon, fieldPath }) => {
  const { values, setFieldValue } = useFormikContext();
  // const initialPermissionsState = getIn(values, fieldPath, {});
  const [permissionsState, setPermissionsState] = useState({
    owner: ["can_create", "can_read", "can_update", "can_delete"],
    manager: ["can_create", "can_read", "can_update"],
    curator: [],
    reader: [],
  });
  useEffect(() => {
    setFieldValue(fieldPath, permissionsState);
  }, [permissionsState, fieldPath, setFieldValue]);

  const handleCheckboxClick = (roleValue, permissionValue) => {
    const permissionsArray = permissionsState[roleValue];
    if (permissionsArray?.includes(permissionValue)) {
      let newPermissionsArray = [...permissionsArray];
      console.log(newPermissionsArray);
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
    <React.Fragment>
      <FieldLabel
        htmlFor={fieldPath}
        icon={labelIcon}
        label={label}
        style={{ fontWeight: "bold" }}
      />
      <PermissionsTable
        columnNames={uiData.permissions}
        rowNames={uiData.roles}
        handleCheckboxClick={handleCheckboxClick}
        permissionsState={permissionsState}
      />
    </React.Fragment>
  );
};

PermissionsField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelIcon: PropTypes.string,
};
