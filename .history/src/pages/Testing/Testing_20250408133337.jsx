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

  const fields = [
    { name: "quantity", label: "Quantity", type: "number", editable: true },
    { name: "rate", label: "Rate", editable: false },
    { name: "amount", label: "Amount", editable: false },
    { name: "discount", label: "Discount (%)", editable: false },
    { name: "discountAmount", label: "Discount Amount", editable: false },
    { name: "vest", label: "Vest", editable: false },
    { name: "tax", label: "Tax (%)", editable: false },
    { name: "saleTaxAmount", label: "Sale Tax Amount", editable: false },
    { name: "valInclSaleTax", label: "Val Incl Sale Tax", editable: false },
  ];

  return (
    <div className="p-4 bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="bg-white p-4 rounded shadow-sm">
        <div className="row">
          {fields.map((field) => (
            <div className="col-md-2 mb-3" key={field.name}>
              <label htmlFor={field.name} className="form-label">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                id={field.name}
                name={field.name}
                className={`form-control ${
                  formik.touched[field.name] && formik.errors[field.name] ? "is-invalid" : ""
                }`}
                onChange={field.editable ? formik.handleChange : undefined}
                onBlur={field.editable ? formik.handleBlur : undefined}
                value={formik.values[field.name]}
                readOnly={!field.editable}
              />
              {formik.touched[field.name] && formik.errors[field.name] && (
                <div className="invalid-feedback">{formik.errors[field.name]}</div>
              )}
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
};

export default Testing;
