import React from "react";
import PropTypes from "prop-types";
import { getIn, useFormikContext } from "formik";
import { PermissionsTable } from "./PermissionsTable";
import { Icon } from "semantic-ui-react";

export const PermissionsField = ({ uiData, label, fieldPath }) => {
  const { values } = useFormikContext();
  const initialPermissionsState = getIn(values, fieldPath, {});

  return (
    <React.Fragment>
      <Icon name="user" />
      <label style={{ fontWeight: "bold", fontSize: "13px" }}>{label}</label>
      <PermissionsTable
        permissions={uiData.permissions}
        roles={uiData.roles}
        initialPermissionsState={initialPermissionsState}
        fieldPath={fieldPath}
      />
    </React.Fragment>
  );
};

PermissionsField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  label: PropTypes.string,
  uiData: PropTypes.object.isRequired,
};
