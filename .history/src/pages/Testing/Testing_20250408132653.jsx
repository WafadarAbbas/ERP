import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

const Testing = () => {
  const RATE = 1000;
  const DISCOUNT_PERCENT = 10;

  const formik = useFormik({
    initialValues: {
      quantity: "",
      rate: RATE,
      amount: "",
      discount: DISCOUNT_PERCENT,
      discountAmount: "",
      vest: "",
    },
    validationSchema: Yup.object({
      quantity: Yup.number()
        .required("Quantity is required")
        .positive("Must be a positive number")
        .integer("Must be an integer"),
    }),
    onSubmit: (values) => {
      console.log("Form data:", values);
    },
  });

  useEffect(() => {
    const qty = Number(formik.values.quantity);
    if (!isNaN(qty) && qty > 0) {
      const amount = qty * RATE;
      const discountAmount = (amount * DISCOUNT_PERCENT) / 100;

      formik.setFieldValue("rate", RATE);
      formik.setFieldValue("amount", amount);
      formik.setFieldValue("discount", DISCOUNT_PERCENT);
      formik.setFieldValue("discountAmount", discountAmount);
      formik.setFieldValue("vest", amount);
    } else {
      formik.setFieldValue("amount", "");
      formik.setFieldValue("discountAmount", "");
      formik.setFieldValue("vest", "");
    }
  }, [formik.values.quantity]);

  return (
    <div className="p-4 bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="bg-white p-4 rounded shadow-sm">
        {/* Quantity Field */}
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
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
          {formik.touched.quantity && formik.errors.quantity && (
            <div className="invalid-feedback">{formik.errors.quantity}</div>
          )}
        </div>

        {/* Readonly Fields */}
        {[
          { name: "rate", label: "Rate" },
          { name: "amount", label: "Amount" },
          { name: "discount", label: "Discount (%)" },
          { name: "discountAmount", label: "Discount Amount" },
          { name: "vest", label: "Vest" },
        ].map((field) => (
          <div className="mb-3" key={field.name}>
            <label htmlFor={field.name} className="form-label">
              {field.label}
            </label>
            <input
              type="text"
              id={field.name}
              name={field.name}
              className="form-control"
              value={formik.values[field.name]}
              readOnly
            />
          </div>
        ))}

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Testing;
