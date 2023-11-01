import "./App.css";

import { BaseForm } from "react-invenio-forms";
import { PermissionsField } from "./PermissionsField";
import { Container } from "semantic-ui-react";
import { useFormikContext } from "formik";

const FormikStateLogger = () => {
  const state = useFormikContext();
  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};

const permissions = {
  owner: ["can_create", "can_read", "can_update", "can_delete"],
  manager: ["can_create", "can_read", "can_update", "can_delete"],
  curator: ["can_create", "can_read", "can_update"],
  reader: ["can_read"],
};

const initialValues = {
  permissions: {
    owner: ["can_create", "can_read", "can_update", "can_delete"],
    manager: ["can_create", "can_read", "can_update", "can_delete"],
  },
};

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
          fieldPath="permissions"
          autocompleteNames="off"
          addButtonLabel="Add permission"
          modal={{ addLabel: "Add role", editLabel: "Edit role" }}
        />
        <FormikStateLogger />
      </Container>
    </BaseForm>
  );
}

export default App;
