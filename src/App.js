import "./App.css";
import React from "react";
import { BaseForm } from "react-invenio-forms";
import { PermissionsField } from "./PermissionsField";
import { Container } from "semantic-ui-react";
import { useFormikContext } from "formik";
import { TestComponent } from "./TestComponent";
import { TextField, FieldLabel } from "react-invenio-forms";
import { ArrayField } from "./ArrayField";
import { TestCmp } from "./testfolder";

const FormikStateLogger = () => {
  const state = useFormikContext();
  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};

const loader = async (widget) => {
  console.log(widget);
  const module = await ((widget) => import(`./${widget}.js`))(widget);
  console.log(module);
  let component = module.default ?? module[widget];
  console.log(component);
  return React.createElement(component);
};

const initialValues = {
  custom_fields: {
    permissions: {
      owner: ["can_create", "can_read", "can_update", "can_delete"],
      manager: ["can_create", "can_read", "can_update"],
      curator: [],
      reader: [],
    },
  },
};

const MyCmp1 = () => <div>Cmp1</div>;
const MyCmp2 = () => <div>Cmp2</div>;

const fields = [<MyCmp1 key="a" />, <MyCmp2 key="b" />];

function App() {
  const Cmp = loader("TestCmp");

  return (
    <BaseForm
      formik={{
        initialValues: initialValues,
        // validationSchema: NRDocumentValidationSchema,
        // validateOnChange: false,
        // validateOnBlur: false,
        // enableReinitialize: true,
      }}
    >
      <Container style={{ marginTop: "200px" }}>
        <PermissionsField
          label="Permissions"
          labelIcon="user"
          fieldPath="custom_fields.permissions"
          addButtonLabel="Add permission"
          modal={{ addLabel: "Add role", editLabel: "Edit role" }}
        />
        <Cmp />
        <FormikStateLogger />
      </Container>
    </BaseForm>
  );
}

export default App;
