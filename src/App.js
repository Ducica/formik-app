import "./App.css";
import React, { useState } from "react";
import { BaseForm } from "react-invenio-forms";
import { PermissionsField } from "./PermissionsField";
import { Container, Dropdown, Grid } from "semantic-ui-react";
import { useFormikContext } from "formik";
import { FieldLabel } from "react-invenio-forms";
// import { ArrayField } from "./ArrayField";
import * as Yup from "yup";
import { LocalVocabularySelectField } from "./LocalVocabularySelectField";
import { DaterangePicker, SingleDatePicker } from "./Datepicker";
import DatePicker from "react-datepicker";
import ChartComponent, {
  Axis,
  Circles,
  CirclesReact,
  ChartComponentA,
} from "./histogram/histogram";
import { arrayData } from "./histogram/data";
import { HistogramComponent } from "./histogram/HistogramComponent";

const FormikStateLogger = () => {
  const state = useFormikContext();
  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};

function App() {
  return (
    <BaseForm
      formik={{
        // initialValues: initialValues,
        // validationSchema: TestValidationSchema,
        validateOnChange: false,
        validateOnBlur: false,
        enableReinitialize: true,
      }}
    >
      <Container style={{ marginTop: "200px" }}>
        <Grid>
          <Grid.Column floated="left" width={4}>
            <HistogramComponent histogramData={arrayData} />
          </Grid.Column>
          <Grid.Column width={7}></Grid.Column>
        </Grid>
        {/* <FormikStateLogger /> */}
      </Container>
    </BaseForm>
  );
}

export default App;
