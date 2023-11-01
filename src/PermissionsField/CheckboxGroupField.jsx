import React from "react";
import { Form, Label } from "semantic-ui-react";
import { useFormikContext, getIn } from "formik";
import _isEmpty from "lodash/isEmpty";
import { i18next } from "./i18next";
import { FieldLabel } from "react-invenio-forms";

export const CheckboxGroupField = ({ fieldPath, availablePermissions }) => {
  const { values, errors, setFieldValue } = useFormikContext();

  const checkboxes = getIn(values, fieldPath, []);

  const validationError = getIn(errors, fieldPath, []);

  const handleCheckboxChange = (value) => {
    let newStatusArray = [...checkboxes];
    if (newStatusArray.includes(value)) {
      newStatusArray = newStatusArray.filter((item) => item !== value);
    } else {
      newStatusArray.push(value);
    }
    setFieldValue(fieldPath, newStatusArray);
  };

  return (
    <Form.Group style={{ marginTop: "2rem" }} grouped>
      <FieldLabel
        htmlFor={"permissions"}
        icon="pencil"
        label={i18next.t("Set permissions")}
      />
      {availablePermissions?.map(({ value, text }) => {
        return (
          <Form.Checkbox
            key={value}
            error={
              !_isEmpty(validationError) && {
                content: validationError,
                pointing: "left",
              }
            }
            label={text}
            checked={checkboxes.includes(value)}
            onChange={() => handleCheckboxChange(value)}
          />
        );
      })}
    </Form.Group>
  );
};
