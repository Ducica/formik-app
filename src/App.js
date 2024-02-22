import "./App.css";
import React from "react";
import { BaseForm } from "react-invenio-forms";
import { PermissionsField } from "./PermissionsField";
import { Container, Dropdown, Grid } from "semantic-ui-react";
import { useFormikContext } from "formik";
import { FieldLabel, SelectField } from "react-invenio-forms";
// import { ArrayField } from "./ArrayField";
import { Formik } from "formik";
import * as Yup from "yup";
import { LocalVocabularySelectField } from "./LocalVocabularySelectField";
import styled from "styled-components";

const FormikStateLogger = () => {
  const state = useFormikContext();
  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};
const dropdownOptions = [
  { text: "Option 1", value: "Value 1" },
  { text: "Option 2", value: "Value 2" },
  { text: "Option 3", value: "Value 3" },
  { text: "Option 4", value: "Value 4" },
  { text: "Option 5", value: "Value 5" },
  { text: "Option 6", value: "Value 6" },
];
function App() {
  return (
    <Formik>
      <StyledDiv>
        <SelectField options={dropdownOptions} placeholder="bla" />
      </StyledDiv>
    </Formik>
  );
}

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
export default App;
