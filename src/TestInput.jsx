import React from "react";
import { useFormikContext } from "formik";
import { Button } from "semantic-ui-react";
import { SelectField } from "react-invenio-forms";

export const ValidationButton = () => {
  const { validateForm } = useFormikContext();
  const validateFormFunc = async () => {
    const validationErrors = await validateForm();
    console.log(validationErrors);
  };
  return (
    <Button content="validate" onClick={() => validateFormFunc()}></Button>
  );
};

export const SelectInput = ({ options, fieldPath, ...uiProps }) => {
  return <SelectField fieldPath={fieldPath} options={options} {...uiProps} />;
};
