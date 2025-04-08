import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

const Testing = () => {
  const formik = useFormik({
    initialValues: {
      quantity: "",
      rate: "",
      amount: "",
      discount: "",
      discountAmount: "",
      vest: "",
    },
    validationSchema: Yup.object({
      quantity: Yup.number()
        .required("Quantity is required")
        .positive("Must be a positive number")
        .integer("Must be an integer"),
      rate: Yup.number().required("Rate is required").positive("Must be positive"),
      amount: Yup.number().required("Amount is required").positive("Must be positive"),
      discount: Yup.number().required("Discount is required").min(0, "Can't be negative"),
      discountAmount: Yup.number()
        .required("Discount Amount is required")
        .min(0, "Can't be negative"),
      vest: Yup.string().required("Vest is required"),
    }),
    onSubmit: (values) => {
      console.log("Form data:", values);
      // Submit to API if needed
    },
  });

  return (
    <div className="p-4 bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="bg-white p-4 rounded shadow-sm">
        {[
          { name: "quantity", label: "Quantity", type: "number" },
          { name: "rate", label: "Rate", type: "number" },
          { name: "amount", label: "Amount", type: "number" },
          { name: "discount", label: "Discount", type: "number" },
          { name: "discountAmount", label: "Discount Amount", type: "number" },
          { name: "vest", label: "Vest", type: "text" },
        ].map((field) => (
          <div className="mb-3" key={field.name}>
            <label htmlFor={field.name} className="form-label">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              className={`form-control ${
                formik.touched[field.name] && formik.errors[field.name]
                  ? "is-invalid"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[field.name]}
            />
            {formik.touched[field.name] && formik.errors[field.name] && (
              <div className="invalid-feedback">{formik.errors[field.name]}</div>
            )}
          </div>
        ))}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Testing;
