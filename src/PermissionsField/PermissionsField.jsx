import React from "react";
import PropTypes from "prop-types";
import { getIn, useFormikContext } from "formik";
import { PermissionsTable } from "./PermissionsTable";
import { Icon, Button } from "semantic-ui-react";
import { i18next } from "./i18next";

export const PermissionsField = ({ uiData, label, labelIcon, fieldPath }) => {
  const { values } = useFormikContext();
  const initialPermissionsState = getIn(values, fieldPath, {});

  return (
    <React.Fragment>
      <Icon name="user" />
      <label style={{ fontWeight: "bold" }}>{label}</label>
      <Button icon="angle double down" aria-label={i18next.t("Expand table")} />
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
  labelIcon: PropTypes.string,
  uiData: PropTypes.object.isRequired,
};
