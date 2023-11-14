import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dropdown } from "semantic-ui-react";
import { useField, useFormikContext } from "formik";

const edtfDateFormatOptions = [
  { value: "yyyy", text: "YYYY" },
  { value: "yyyy-MM", text: "YYYY-MM" },
  { value: "yyyy-MM-dd", text: "YYYY-MM-DD" },
];

const allEmptyStrings = (arr) => arr.every((element) => element === "");

const serializeDate = (dateObj, dateFormat) => {
  if (dateObj === null) return "";
  if (dateFormat === "yyyy") return `${dateObj.getFullYear()}`;
  if (dateFormat === "yyyy-MM")
    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}`;
  if (dateFormat === "yyyy-MM-dd")
    return `${dateObj.getFullYear()}-${
      dateObj.getMonth() + 1
    }-${dateObj.getDate()}`;
};

const deserializeDate = (edtfDateString) => {
  if (edtfDateString) {
    return new Date(edtfDateString);
  } else {
    return null;
  }
};

const DatepickerCustomHeader = ({
  dateFormat,
  monthDate,
  decreaseMonth,
  increaseMonth,
  increaseYear,
  decreaseYear,
  date,
  setDateFormat,
  edtfDateFormatOptions,
}) => {
  return (
    <div>
      {(dateFormat === "yyyy-MM" || dateFormat === "yyyy-MM-dd") && (
        <div>
          <button
            aria-label="Previous Month"
            className={
              "react-datepicker__navigation react-datepicker__navigation--previous"
            }
            onClick={decreaseMonth}
          >
            <span
              className={
                "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
              }
            >
              {"<"}
            </span>
          </button>
          <span className="react-datepicker__current-month">
            {monthDate.toLocaleString("cs-CZ", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            aria-label="Next Month"
            className={
              "react-datepicker__navigation react-datepicker__navigation--next"
            }
            onClick={increaseMonth}
          >
            <span
              className={
                "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
              }
            >
              {">"}
            </span>
          </button>
        </div>
      )}
      {dateFormat === "yyyy" && (
        <div>
          <button
            aria-label="Previous Month"
            className={
              "react-datepicker__navigation react-datepicker__navigation--previous"
            }
            onClick={increaseYear}
          >
            <span
              className={
                "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
              }
            >
              {"<"}
            </span>
          </button>
          <span className="react-datepicker__current-month">
            {date.getFullYear()}
          </span>
          <button
            aria-label="Next Month"
            className={
              "react-datepicker__navigation react-datepicker__navigation--next"
            }
            onClick={decreaseYear}
          >
            <span
              className={
                "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
              }
            >
              {">"}
            </span>
          </button>
        </div>
      )}
      <div>
        {/*TODO: semantic UI dropdown items weird styling - maybe make regular dropdown component from scratch */}
        <Dropdown
          options={edtfDateFormatOptions}
          onChange={(e, data) => setDateFormat(data.value)}
          value={dateFormat}
        />
      </div>
    </div>
  );
};

export const DaterangePicker = ({ selectsRange, fieldPath }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(fieldPath);
  console.log(field.value);
  const [dateFormat, setDateFormat] = useState("yyyy-MM-dd");
  let dates;

  if (selectsRange) {
    if (field?.value) {
      dates = field.value.split("/").map((date) => deserializeDate(date));
    } else {
      dates = [null, null];
    }
  }
  console.log(dates);

  const onChange = (dates) => {
    console.log(dates);
    if (selectsRange) {
      const serializedDates = dates.map((date) =>
        serializeDate(date, dateFormat)
      );
      console.log(serializedDates);
      const [start, end] = serializedDates;
      console.log(start, end);
      if (allEmptyStrings(serializedDates)) {
        console.log("ran");
        setFieldValue(fieldPath, "");
      } else {
        setFieldValue(fieldPath, serializedDates.join("/"));
      }
    } else {
      console.log(dates);
      console.log(serializeDate(dates, dateFormat));
      setFieldValue(fieldPath, serializeDate(dates, dateFormat));
    }
  };
  return (
    <DatePicker
      {...field}
      // selected={
      //   !selectsRange && deserializeDate(field?.value)
      //     ? deserializeDate(field?.value)
      //     : null
      // }
      isClearable
      startDate={selectsRange ? dates[0] : null}
      endDate={selectsRange ? dates[1] : null}
      onChange={onChange}
      showYearPicker={dateFormat === "yyyy"}
      showMonthYearPicker={dateFormat === "yyyy-MM"}
      dateFormat={dateFormat}
      selectsRange={selectsRange}
      autoComplete="off"
      renderCustomHeader={({
        monthDate,
        decreaseMonth,
        increaseMonth,
        increaseYear,
        decreaseYear,
        date,
      }) => {
        return (
          <div>
            {(dateFormat === "yyyy-MM" || dateFormat === "yyyy-MM-dd") && (
              <div>
                <button
                  aria-label="Previous Month"
                  className={
                    "react-datepicker__navigation react-datepicker__navigation--previous"
                  }
                  onClick={decreaseMonth}
                >
                  <span
                    className={
                      "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
                    }
                  >
                    {"<"}
                  </span>
                </button>
                <span className="react-datepicker__current-month">
                  {monthDate.toLocaleString("cs-CZ", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <button
                  aria-label="Next Month"
                  className={
                    "react-datepicker__navigation react-datepicker__navigation--next"
                  }
                  onClick={increaseMonth}
                >
                  <span
                    className={
                      "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
                    }
                  >
                    {">"}
                  </span>
                </button>
              </div>
            )}
            {dateFormat === "yyyy" && (
              <div>
                <button
                  aria-label="Previous Month"
                  className={
                    "react-datepicker__navigation react-datepicker__navigation--previous"
                  }
                  onClick={increaseYear}
                >
                  <span
                    className={
                      "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
                    }
                  >
                    {"<"}
                  </span>
                </button>
                <span className="react-datepicker__current-month">
                  {date.getFullYear()}
                  {date.get}
                </span>
                <button
                  aria-label="Next Month"
                  className={
                    "react-datepicker__navigation react-datepicker__navigation--next"
                  }
                  onClick={decreaseYear}
                >
                  <span
                    className={
                      "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
                    }
                  >
                    {">"}
                  </span>
                </button>
              </div>
            )}
            <div>
              {/*TODO: semantic UI dropdown items weird styling - maybe make regular dropdown component from scratch */}
              <Dropdown
                options={edtfDateFormatOptions}
                onChange={(e, data) => setDateFormat(data.value)}
                value={dateFormat}
              />
            </div>
          </div>
        );
      }}
    />
  );
};

export const SingleDatePicker = ({ selectsRange, fieldPath }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(fieldPath);
  console.log(field.value);
  const [dateFormat, setDateFormat] = useState("yyyy-MM-dd");
  let dates;

  if (selectsRange) {
    if (field?.value) {
      dates = field.value.split("/").map((date) => deserializeDate(date));
    } else {
      dates = [null, null];
    }
  }
  console.log(dates);

  const onChange = (dates) => {
    console.log(dates);
    if (selectsRange) {
      const serializedDates = dates.map((date) =>
        serializeDate(date, dateFormat)
      );
      console.log(serializedDates);
      const [start, end] = serializedDates;
      console.log(start, end);
      if (allEmptyStrings(serializedDates)) {
        console.log("ran");
        setFieldValue(fieldPath, "");
      } else {
        setFieldValue(fieldPath, serializedDates.join("/"));
      }
    } else {
      console.log(dates);
      console.log(serializeDate(dates, dateFormat));
      setFieldValue(fieldPath, serializeDate(dates, dateFormat));
    }
  };
  return (
    <DatePicker
      {...field}
      // selected={
      //   !selectsRange && deserializeDate(field?.value)
      //     ? deserializeDate(field?.value)
      //     : null
      // }
      isClearable
      startDate={selectsRange ? dates[0] : null}
      endDate={selectsRange ? dates[1] : null}
      onChange={onChange}
      showYearPicker={dateFormat === "yyyy"}
      showMonthYearPicker={dateFormat === "yyyy-MM"}
      dateFormat={dateFormat}
      selectsRange={selectsRange}
      autoComplete="off"
      renderCustomHeader={({
        monthDate,
        decreaseMonth,
        increaseMonth,
        increaseYear,
        decreaseYear,
        date,
      }) => {
        return (
          <div>
            {(dateFormat === "yyyy-MM" || dateFormat === "yyyy-MM-dd") && (
              <div>
                <button
                  aria-label="Previous Month"
                  className={
                    "react-datepicker__navigation react-datepicker__navigation--previous"
                  }
                  onClick={decreaseMonth}
                >
                  <span
                    className={
                      "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
                    }
                  >
                    {"<"}
                  </span>
                </button>
                <span className="react-datepicker__current-month">
                  {monthDate.toLocaleString("cs-CZ", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <button
                  aria-label="Next Month"
                  className={
                    "react-datepicker__navigation react-datepicker__navigation--next"
                  }
                  onClick={increaseMonth}
                >
                  <span
                    className={
                      "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
                    }
                  >
                    {">"}
                  </span>
                </button>
              </div>
            )}
            {dateFormat === "yyyy" && (
              <div>
                <button
                  aria-label="Previous Month"
                  className={
                    "react-datepicker__navigation react-datepicker__navigation--previous"
                  }
                  onClick={increaseYear}
                >
                  <span
                    className={
                      "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
                    }
                  >
                    {"<"}
                  </span>
                </button>
                <span className="react-datepicker__current-month">
                  {date.getFullYear()}
                  {date.get}
                </span>
                <button
                  aria-label="Next Month"
                  className={
                    "react-datepicker__navigation react-datepicker__navigation--next"
                  }
                  onClick={decreaseYear}
                >
                  <span
                    className={
                      "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
                    }
                  >
                    {">"}
                  </span>
                </button>
              </div>
            )}
            <div>
              {/*TODO: semantic UI dropdown items weird styling - maybe make regular dropdown component from scratch */}
              <Dropdown
                options={edtfDateFormatOptions}
                onChange={(e, data) => setDateFormat(data.value)}
                value={dateFormat}
              />
            </div>
          </div>
        );
      }}
    />
  );
};
