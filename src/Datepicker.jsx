import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useField, useFormikContext } from "formik";
import { DatePickerHeader } from "./DatePickerHeader";
import PropTypes from "prop-types";
import { FieldLabel } from "react-invenio-forms";

const edtfDateFormatOptions = [
  { value: "yyyy", text: "YYYY" },
  { value: "yyyy-MM", text: "YYYY-MM" },
  { value: "yyyy-MM-dd", text: "YYYY-MM-DD" },
];

const useInitialDateFormat = (fieldValue) => {
  let dateFormat;
  if (fieldValue) {
    const value = fieldValue.includes("/")
      ? fieldValue.split("/")[0]
      : fieldValue;
    if (value.length === 4) {
      dateFormat = "yyyy";
    } else if (value.length === 7) {
      dateFormat = "yyyy-MM";
    } else {
      dateFormat = "yyyy-MM-dd";
    }
  } else {
    dateFormat = "yyyy-MM-dd";
  }

  const [initialDateFormat, setInitialDateFormat] = useState(dateFormat);
  return [initialDateFormat, setInitialDateFormat];
};

const allEmptyStrings = (arr) => arr.every((element) => element === "");

const serializeDate = (dateObj, dateFormat) => {
  if (dateObj === null) return "";
  const pad = (value) => (value < 10 ? `0${value}` : value);

  if (dateFormat === "yyyy") return `${dateObj.getFullYear()}`;
  if (dateFormat === "yyyy-MM")
    return `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}`;
  if (dateFormat === "yyyy-MM-dd")
    return `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(
      dateObj.getDate()
    )}`;
};

const deserializeDate = (edtfDateString) => {
  if (edtfDateString) {
    return new Date(edtfDateString);
  } else {
    return null;
  }
};

export const DaterangePicker = ({
  fieldPath,
  label,
  htmlFor,
  icon,
  ...datePickerProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(fieldPath);
  const [dateFormat, setDateFormat] = useInitialDateFormat(field?.value);
  let dates;

  if (field?.value) {
    dates = field.value.split("/").map((date) => deserializeDate(date));
  } else {
    dates = [null, null];
  }

  const onChange = (dates) => {
    const serializedDates = dates.map((date) =>
      serializeDate(date, dateFormat)
    );
    if (allEmptyStrings(serializedDates)) {
      setFieldValue(fieldPath, "");
    } else {
      setFieldValue(fieldPath, serializedDates.join("/"));
    }
  };
  return (
    <>
      <FieldLabel htmlFor={fieldPath} icon={icon} label={"Label"} />

      <DatePicker
        {...field}
        isClearable
        startDate={dates[0] ?? null}
        endDate={dates[1] ?? null}
        onChange={onChange}
        showYearPicker={dateFormat === "yyyy"}
        showMonthYearPicker={dateFormat === "yyyy-MM"}
        dateFormat={dateFormat}
        selectsRange={true}
        autoComplete="off"
        renderCustomHeader={(props) => (
          <DatePickerHeader
            dateFormat={dateFormat}
            setDateFormat={setDateFormat}
            edtfDateFormatOptions={edtfDateFormatOptions}
            {...props}
          />
        )}
        {...datePickerProps}
      />
    </>
  );
};

DaterangePicker.propTypes = {
  fieldPath: PropTypes.string.isRequired,
};

export const SingleDatePicker = ({ fieldPath, ...datePickerProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(fieldPath);
  const [dateFormat, setDateFormat] = useInitialDateFormat(field?.value);

  const onChange = (dates) => {
    setFieldValue(fieldPath, serializeDate(dates, dateFormat));
  };

  return (
    <DatePicker
      {...field}
      selected={
        deserializeDate(field?.value) ? deserializeDate(field?.value) : null
      }
      isClearable
      onChange={onChange}
      showYearPicker={dateFormat === "yyyy"}
      showMonthYearPicker={dateFormat === "yyyy-MM"}
      dateFormat={dateFormat}
      selectsRange={false}
      autoComplete="off"
      renderCustomHeader={(props) => (
        <DatePickerHeader
          dateFormat={dateFormat}
          setDateFormat={setDateFormat}
          edtfDateFormatOptions={edtfDateFormatOptions}
          {...props}
        />
      )}
      label="dwadwa"
      {...datePickerProps}
    />
  );
};

SingleDatePicker.propTypes = {
  fieldPath: PropTypes.string.isRequired,
};
