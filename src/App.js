import "./App.css";
import React from "react";
import {
  BaseForm,
  TextField,
  SelectField,
  ArrayField,
} from "react-invenio-forms";
import { PermissionsField } from "./PermissionsField";
import { Container, Dropdown } from "semantic-ui-react";
import { useFormikContext } from "formik";
import { TestComponent } from "./TestComponent";
import { FieldLabel } from "react-invenio-forms";
// import { ArrayField } from "./ArrayField";
import * as Yup from "yup";
import { ValidationButton, SelectInput } from "./TestInput";
import { TestArrayField } from "./TestFieldArray";

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

const options = [
  { value: "can_read", text: "Can read" },
  { value: "can_create", text: "Can create" },
  { value: "can_update", text: "Can update" },
  { value: "can_delete", text: "Can delete" },
];

const MyCmp1 = () => <div>Cmp1</div>;
const MyCmp2 = () => <div>Cmp2</div>;

const fields = [<MyCmp1 key="a" />, <MyCmp2 key="b" />];
export const TestValidationSchema = Yup.object().shape({
  metadata: Yup.object().shape({
    title: Yup.string()
      .required((value) => `${value.label} is a required field`)
      .label("Title"),
  }),
});
console.log(TestValidationSchema.fields.metadata.fields.title);
function App() {
  return (
    <BaseForm
      formik={{
        initialValues: initialValues,
        validationSchema: TestValidationSchema,
        validateOnChange: false,
        validateOnBlur: false,
        enableReinitialize: true,
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
        <PermissionsField
          label="Permissions"
          labelIcon="user"
          fieldPath="custom_fields.permissions"
          addButtonLabel="Add permission"
          modal={{ addLabel: "Add role", editLabel: "Edit role" }}
        />
        <PermissionsField
          label="Permissions"
          labelIcon="user"
          fieldPath="custom_fields.permissions"
          addButtonLabel="Add permission"
          modal={{ addLabel: "Add role", editLabel: "Edit role" }}
        />

        <FormikStateLogger />
      </Container>
    </BaseForm>
  );
}

export default App;
