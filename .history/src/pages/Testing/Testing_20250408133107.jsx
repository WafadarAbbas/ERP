import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

const Testing = () => {
  const RATE = 1000;
  const DISCOUNT_PERCENT = 10;
  const TAX_PERCENT = 18;

  const formik = useFormik({
    initialValues: {
      quantity: "",
      rate: RATE,
      amount: "",
      discount: DISCOUNT_PERCENT,
      discountAmount: "",
      vest: "",
      tax: TAX_PERCENT,
      saleTaxAmount: "",
      valInclSaleTax: "",
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
      const vest = amount;

      const saleTaxAmount = (vest * TAX_PERCENT) / 100;
      const valInclSaleTax = vest + saleTaxAmount;

      formik.setFieldValue("rate", RATE);
      formik.setFieldValue("amount", amount);
      formik.setFieldValue("discount", DISCOUNT_PERCENT);
      formik.setFieldValue("discountAmount", discountAmount);
      formik.setFieldValue("vest", vest);
      formik.setFieldValue("tax", TAX_PERCENT);
      formik.setFieldValue("saleTaxAmount", saleTaxAmount);
      formik.setFieldValue("valInclSaleTax", valInclSaleTax);
    } else {
      formik.setFieldValue("amount", "");
      formik.setFieldValue("discountAmount", "");
      formik.setFieldValue("vest", "");
      formik.setFieldValue("saleTaxAmount", "");
      formik.setFieldValue("valInclSaleTax", "");
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

        {/* Read-only Fields */}
        {[
          { name: "rate", label: "Rate" },
          { name: "amount", label: "Amount" },
          { name: "discount", label: "Discount (%)" },
          { name: "discountAmount", label: "Discount Amount" },
          { name: "vest", label: "Vest" },
          { name: "tax", label: "Tax (%)" },
          { name: "saleTaxAmount", label: "Sale Tax Amount" },
          { name: "valInclSaleTax", label: "Val Incl Sale Tax" },
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
