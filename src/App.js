import "./App.css";

import { BaseForm } from "react-invenio-forms";
import { PermissionsField } from "./PermissionsField";
import { Container } from "semantic-ui-react";
import { useFormikContext } from "formik";

const FormikStateLogger = () => {
  const state = useFormikContext();
  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};

const initialValues = {
  custom_fields: {
    permissions: {
      owner: ["can_create", "can_read", "can_update", "can_delete"],
      manager: ["can_create", "can_read", "can_update", "can_delete"],
    },
  },
};

const MyCmp1 = () => <div>Cmp1</div>;
const MyCmp2 = () => <div>Cmp2</div>;

const fields = [<MyCmp1 key="a" />, <MyCmp2 key="b" />];

function App() {
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
        {fields}
        <FormikStateLogger />
      </Container>
    </BaseForm>
  );
}

export default App;
