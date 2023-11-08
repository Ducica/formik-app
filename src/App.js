import "./App.css";
import React from "react";
import { BaseForm } from "react-invenio-forms";
import { PermissionsField } from "./PermissionsField";
import { Container, Dropdown, Grid } from "semantic-ui-react";
import { useFormikContext } from "formik";
import { FieldLabel } from "react-invenio-forms";
// import { ArrayField } from "./ArrayField";
import * as Yup from "yup";

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
      owner: [
        "can_search",
        "can_read",
        "can_update",
        "can_delete",
        "can_create_files",
        "can_set_content_files",
        "can_get_content_files",
        "can_commit_files",
      ],
      manager: [
        "can_search",
        "can_read",
        "can_create",
        "can_read_files",
        "can_update_files",
      ],
      curator: [
        "can_create",
        "can_draft_set_content_files",
        "can_search_drafts",
        "can_draft_commit_files",
      ],
      reader: [
        "can_get_content_files",
        "can_read_files",
        "can_search_drafts",
        "can_search",
        "can_read_draft",
      ],
    },
  },
};

const uiData = {
  permissions: [
    {
      group: "draft",
      text: "Drafts",
      permissions: [
        { value: "can_edit", text: "Edit drafts" },
        { value: "can_new_version", text: "Create new draft version" },
        { value: "can_search_drafts", text: "Search drafts" },
        { value: "can_read_draft", text: "Read drafts" },
        { value: "can_update_draft", text: "Update drafts" },
        { value: "can_delete_draft", text: "Delete drafts" },
        { value: "can_publish", text: "Publish drafts" },
        { value: "can_draft_create_files", text: "Create draft files" },
        {
          value: "can_draft_set_content_files",
          text: "Set content for draft files",
        },
        {
          value: "can_draft_get_content_files",
          text: "Get content for draft files",
        },
        { value: "can_draft_commit_files", text: "Commit draft files" },
        { value: "can_draft_read_files", text: "Read draft files" },
        { value: "can_draft_update_files", text: "Update draft files" },
      ],
    },
    {
      group: "published_records",
      text: "Records",
      permissions: [
        { value: "can_search", text: "Search records" },
        { value: "can_read", text: "Read records" },
        { value: "can_create", text: "Create records" },
        { value: "can_update", text: "Update records" },
        { value: "can_delete", text: "Delete records" },
        { value: "can_manage", text: "Manage records" },
      ],
    },
    {
      group: "files",
      text: "Files",
      permissions: [
        { value: "can_create_files", text: "Create files" },
        { value: "can_set_content_files", text: "Set content for files" },
        { value: "can_get_content_files", text: "Get content for files" },
        { value: "can_commit_files", text: "Commit files" },
        { value: "can_read_files", text: "Read files" },
        { value: "can_update_files", text: "Update files" },
        { value: "can_delete_files", text: "Delete files" },
      ],
    },
  ],
  roles: [
    { value: "owner", text: "Owner" },
    { value: "manager", text: "Manager" },
    { value: "curator", text: "Curator" },
    { value: "reader", text: "Reader" },
  ],
};

function App() {
  return (
    <BaseForm
      formik={{
        initialValues: initialValues,
        // validationSchema: TestValidationSchema,
        validateOnChange: false,
        validateOnBlur: false,
        enableReinitialize: true,
      }}
    >
      <Container style={{ marginTop: "200px" }}>
        <Grid>
          <Grid.Column floated="left" width={9}>
            <PermissionsField
              label="Permissions"
              labelIcon="user"
              fieldPath="custom_fields.permissions"
              uiData={uiData}
            />
          </Grid.Column>
          <Grid.Column width={7}></Grid.Column>
        </Grid>

        <FormikStateLogger />
      </Container>
    </BaseForm>
  );
}

export default App;
