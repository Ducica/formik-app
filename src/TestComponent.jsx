import React, { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import { useFormikContext } from "formik";

function translatePermissions(inputArray) {
  const result = {};

  inputArray.forEach((inputObj) => {
    const { role, permissions } = inputObj;
    result[role] = permissions;
  });

  return result;
}

export const TestComponent = ({ fieldPath }) => {
  const [inputState, setInputState] = useState([
    { role: "Ducciano", permissions: ["can_do", "anything"] },
  ]);
  const { setFieldValue } = useFormikContext();
  useEffect(() => {
    setFieldValue(fieldPath, translatePermissions(inputState));
  }, [inputState, fieldPath, setFieldValue]);

  return (
    <div>
      {inputState.map((item, index) => (
        <Form.Input
          key={index}
          value={inputState[index].role}
          onChange={(e) => {
            let newState = [...inputState];
            newState[index].role = e.target.value;
            setInputState(newState);
          }}
        />
      ))}
    </div>
  );
};
