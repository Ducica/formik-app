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
import ChartComponent from "./histogram/histogram";

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

const uiData = {
  permissions: [
    {
      group: "draft",
      text: "Drafts",
      permissions: [
        { value: "can_edit", text: "Edit" },
        { value: "can_new_version", text: "Create new draft version" },
        { value: "can_search_drafts", text: "Search" },
        { value: "can_read_draft", text: "Read" },
        { value: "can_update_draft", text: "Update" },
        { value: "can_delete_draft", text: "Delete" },
        { value: "can_publish", text: "Publish" },
        { value: "can_draft_create_files", text: "Create files" },
        {
          value: "can_draft_set_content_files",
          text: "Set content for files",
        },
        {
          value: "can_draft_get_content_files",
          text: "Get content for files",
        },
        { value: "can_draft_commit_files", text: "Commit files" },
        { value: "can_draft_read_files", text: "Read files" },
        { value: "can_draft_update_files", text: "Update files" },
      ],
    },
    {
      group: "published_records",
      text: "Records",
      permissions: [
        { value: "can_search", text: "Search" },
        { value: "can_read", text: "Read" },
        { value: "can_create", text: "Create" },
        { value: "can_update", text: "Update" },
        { value: "can_delete", text: "Delete" },
        { value: "can_manage", text: "Manage" },
      ],
    },
    {
      group: "files",
      text: "Files",
      permissions: [
        { value: "can_create_files", text: "Create" },
        { value: "can_set_content_files", text: "Set content" },
        { value: "can_get_content_files", text: "Get content" },
        { value: "can_commit_files", text: "Commit" },
        { value: "can_read_files", text: "Read" },
        { value: "can_update_files", text: "Update" },
        { value: "can_delete_files", text: "Delete" },
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

const BasicDateRange = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      isClearable={true}
    />
  );
};

const initialValues = {
  metadata: {
    dateRange: "",
    dateRangeEdit: "2019-05/2019-05",
    singleDate: "",
    singleDateEdit: "2019-05",
  },
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
            {/* <PermissionsField
              label="Permissions"
              labelIcon="user"
              fieldPath="custom_fields.permissions"
              uiData={uiData}
            /> */}
            {/* <DatepickerField
              selectsRange={false}
              fieldPath="metadata.datePublished"
            /> */}
            {/* <DaterangePicker fieldPath="metadata.dateRange" />
            <DaterangePicker fieldPath="metadata.dateRangeEdit" />
            <DaterangePicker fieldPath="metadata.dateRangeNull" />
            <SingleDatePicker fieldPath="metadata.singleDate" />
            <SingleDatePicker fieldPath="metadata.singleDateEdit" />
            <SingleDatePicker fieldPath="metadata.singleDateNull" /> */}
            <ChartComponent />
          </Grid.Column>
          <Grid.Column width={7}></Grid.Column>
        </Grid>
        <FormikStateLogger />
      </Container>
    </BaseForm>
  );
}

export default App;
