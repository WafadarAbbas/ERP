import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

const Testing = () => {
  const formik = useFormik({
    initialValues: {
      quantity: "",
    },
    validationSchema: Yup.object({
      quantity: Yup.number()
        .required("Quantity is required")
        .positive("Must be a positive number")
        .integer("Must be an integer"),
    }),
    onSubmit: (values) => {
      console.log("Form data:", values);
      // You can make an API call here using ApiCall if needed
    },
  });

  return (
    <div className="p-4 bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="bg-white p-4 rounded shadow-sm">
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className={`form-control ${
              formik.touched.quantity && formik.errors.quantity ? "is-invalid" : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.quantity}
          />
          {formik.touched.quantity && formik.errors.quantity ? (
            <div className="invalid-feedback">{formik.errors.quantity}</div>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Testing;
