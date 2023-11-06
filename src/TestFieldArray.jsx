import React, { Component } from "react";
import { useFormikContext } from "formik";
import { Button, Form, Icon } from "semantic-ui-react";
import { TextField, ArrayField } from "react-invenio-forms";
import { i18next } from "./PermissionsField/i18next";

export class TestArrayField extends Component {
  render() {
    const { fieldPath, defaultNewValue, showEmptyValue } = this.props;
    return (
      <ArrayField
        addButtonLabel={i18next.t("Add titles")}
        defaultNewValue={defaultNewValue}
        fieldPath={fieldPath}
        className="additional-titles"
        showEmptyValue={showEmptyValue}
      >
        {({ arrayHelpers, indexPath }) => {
          const fieldPathPrefix = `${fieldPath}.${indexPath}`;

          return (
            <React.Fragment>
              <TextField
                fieldPath={`${fieldPathPrefix}.title`}
                label="Additional title"
                required
                width={5}
              />
              <Form.Field>
                <Button
                  aria-label={i18next.t("Remove field")}
                  className="close-btn"
                  icon
                  onClick={() => arrayHelpers.remove(indexPath)}
                >
                  <Icon name="close" />
                </Button>
              </Form.Field>
            </React.Fragment>
          );
        }}
      </ArrayField>
    );
  }
}
