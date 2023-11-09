import React from "react";
import { SelectField } from "react-invenio-forms";
import { useFormikContext, getIn } from "formik";
import PropTypes from "prop-types";
import { Dropdown, Divider } from "semantic-ui-react";

export const serializeVocabularyItem = (item, includeProps = ["id"]) => {
  return typeof item === "string"
    ? { id: item }
    : Array.isArray(item)
    ? item.map((i) => serializeVocabularyItem(i))
    : item;
};

const languages = [
  { value: "cs", text: "Czech" },
  { value: "de", text: "German" },
  { value: "en", text: "English" },
];

export const deserializeLocalVocabularyItem = (item) => {
  return Array.isArray(item)
    ? item.map((item) => deserializeLocalVocabularyItem(item))
    : item.id;
};

const InnerDropdown = ({
  options,
  featured = [],
  usedOptions = [],
  value,
  ...rest
}) => {
  const _filterUsed = (opts) =>
    opts.filter((o) => !usedOptions.includes(o.value) || o.value == value);
  const allOptions = _filterUsed([
    ...(featured.length
      ? [
          ...featured.sort((a, b) => a.text.localeCompare(b.text)),
          {
            content: <Divider fitted />,
            disabled: true,
            key: "featured-divider",
          },
        ]
      : []),
    ...options.filter((o) => !featured.map((o) => o.value).includes(o.value)),
  ]);

  return <Dropdown options={allOptions} value={value} {...rest} />;
};

export const LocalVocabularySelectField = ({
  fieldPath,
  multiple,
  optionsListName,
  usedOptions = [],
  helpText,
  ...uiProps
}) => {
  const { values, setFieldTouched } = useFormikContext();
  const value = deserializeLocalVocabularyItem(
    getIn(values, fieldPath, multiple ? [] : {})
  );
  return (
    <React.Fragment>
      <SelectField
        // formik exhibits strange behavior when you enable search prop to semantic ui's dropdown i.e. handleBlur stops working - did not investigate the details very deep
        // but imperatively calling setFieldTouched gets the job done
        onBlur={() => setFieldTouched(fieldPath)}
        deburr
        search
        control={InnerDropdown}
        fieldPath={fieldPath}
        multiple={multiple}
        options={languages}
        usedOptions={usedOptions}
        onChange={({ e, data, formikProps }) => {
          formikProps.form.setFieldValue(
            fieldPath,
            serializeVocabularyItem(data.value)
          );
        }}
        value={value}
        {...uiProps}
      />
      <label className="helptext">{helpText}</label>
    </React.Fragment>
  );
};

LocalVocabularySelectField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  optionsListName: PropTypes.string.isRequired,
  helpText: PropTypes.string,
};
