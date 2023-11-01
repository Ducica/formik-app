import React, { useState } from "react";
import { Checkbox, Form, Label } from "semantic-ui-react";
import { useFormikContext, getIn } from "formik";

export const CheckboxGroupField = ({
  initialStatus,
  fieldPath,
  availablePermissions,
}) => {
  const { values, setFieldValue } = useFormikContext();
  const checkboxes = getIn(values, fieldPath, []);
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
    <Form.Group grouped>
      <Label>Choose options:</Label>
      {availablePermissions?.map(({ value, text }) => {
        return (
          <Form.Field key={value}>
            <Checkbox
              label={text}
              checked={checkboxes.includes(value)}
              onChange={() => handleCheckboxChange(value)}
            />
          </Form.Field>
        );
      })}
    </Form.Group>
  );
};
