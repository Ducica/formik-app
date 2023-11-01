import React from "react";
import {
  Formik,
  Form,
  Field,
  FieldArray,
  useField,
  ErrorMessage,
  useFormikContext,
  useFormik,
} from "formik";
import * as Yup from "yup";
import { Button } from "semantic-ui-react";

const FormikStateLogger = () => {
  const state = useFormikContext();
  console.log(state.values);
  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};

const MyTextInput = ({ fieldPath }) => {
  return (
    <>
      <Field name={`${fieldPath}.language`} as="select">
        <option value="cs">cs</option>
        <option value="en">en</option>
        <option value="de">de</option>
      </Field>
      <Field name={`${fieldPath}.title`} placeholder="title" />
    </>
  );
};

export const FormikTest = () => {
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "" }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        lastName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            {...formik.getFieldProps("firstName")}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div>{formik.errors.firstName}</div>
          ) : null}

          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            {...formik.getFieldProps("lastName")}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div>{formik.errors.lastName}</div>
          ) : null}

          <label htmlFor="email">Email Address</label>
          <input id="email" type="email" {...formik.getFieldProps("email")} />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
          <MyTextInput fieldPath={"title"} />
          <button type="submit">Submit</button>
          <FormikStateLogger />
        </form>
      )}
    </Formik>
  );
};

{
  /* <FieldArray name="friends">
{(arrayHelpers) => (
  <div>
    {props.values.friends && props.values.friends.length > 0 ? (
      props.values.friends.map((friend, index) => (
        <div key={index}>
          <Field name={`friends.${index}`} />
          <button
            type="button"
            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
          >
            -
          </button>
          <button
            type="button"
            onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
          >
            +
          </button>
        </div>
      ))
    ) : (
      <button
        type="button"
        onClick={() => arrayHelpers.push("")}
      >
        {/* show this when user has removed all friends from the list */
}
//         Add a friend
//       </button>
//     )}
//     <div>
//       <button type="submit">Submit</button>
//     </div>
//   </div>
// )}
// </FieldArray> */}
