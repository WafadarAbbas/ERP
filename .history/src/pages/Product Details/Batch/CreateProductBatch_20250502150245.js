import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";

const CreateProductBatch = (props) => {
  const validationSchema = Yup.object({
    productBatchNumber: Yup.string()
      .required("Product Batch Number is required")
      .min(2, "Product Batch Number should be at least 3 characters long"),
    productBatchCode: Yup.string()
      .required("Product Batch Code is required")
      .min(2, "Product Batch Code should be at least 2 characters long"),
    productBatchDetils: Yup.string()
      .required("Product Batch Details are required")
      .min(5, "Product Batch Details should be at least 5 characters long"),

    productBatchManufacturedDate: Yup.date().required(
      "Manufactured Date is required"
    ),

    productBatchStartDate: Yup.date()
      .required("Start Date is required")
      .min(
        Yup.ref("productBatchManufacturedDate"),
        "Start Date must be same or after Manufactured Date"
      ),

    productBatchExpirytDate: Yup.date()
      .required("Expiry Date is required")
      .min(
        Yup.ref("productBatchStartDate"),
        "Expiry Date must be after Start Date"
      ),
  });

  const formik = useFormik({
    initialValues: {
      productBatchNumber: "",
      productBatchCode: "",
      productBatchDetils: "",
      productBatchManufacturedDate: "",
      productBatchStartDate: "",
      productBatchExpirytDate: "",
      productBatchNoExpiryDate: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
        productBatchManufacturedDate: new Date(
          values.productBatchManufacturedDate
        ).toISOString(),
        productBatchStartDate: new Date(
          values.productBatchStartDate
        ).toISOString(),
        productBatchExpirytDate: new Date(
          values.productBatchExpirytDate
        ).toISOString(),
      };

      console.log(formData);

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/ProductBatch/SaveProductBatch",
          method: "POST",
          data: formData,
        });

        if (response?.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "Product Batch saved successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });

          formik.resetForm();
          if (props.close && props.close.current) {
            props.close.current.click();
          }
          if (typeof props.onclick === "function") {
            props.onclick();
          }
        } else {
          throw new Error("Failed to save the product Batch");
        }
      } catch (error) {
        console.error("Error during product Batch save:", error);
        Swal.fire({
          title: "Error",
          text:
            error.message || "An error occurred while saving the product Batch",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Close",
        });
      }
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [props.open]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#CreateBatchModal"
        ref={props.open}
      >
        Create Batch
      </button>

      <div
        className="modal fade"
        id="CreateBatchModal"
        tabIndex="-1"
        aria-labelledby="CreateBatchModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateBatchModalLabel">
                Create Batch
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                ref={props.close}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="mt-2 mb-2">
                  <label
                    htmlFor="productBatchNumber"
                    className="form-label"
                    style={{ fontBatch: 14 }}
                  >
                    Product Batch Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productBatchNumber"
                    name="productBatchNumber"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.productBatchNumber}
                  />
                  {formik.touched.productBatchNumber &&
                    formik.errors.productBatchNumber && (
                      <div className="text-danger">
                        {formik.errors.productBatchNumber}
                      </div>
                    )}
                </div>

                <div className="mt-2 mb-2">
                  <label
                    htmlFor="productBatchCode"
                    className="form-label"
                    style={{ fontBatch: 14 }}
                  >
                    Product Batch Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productBatchCode"
                    name="productBatchCode"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.productBatchCode}
                  />
                  {formik.touched.productBatchCode &&
                    formik.errors.productBatchCode && (
                      <div className="text-danger">
                        {formik.errors.productBatchCode}
                      </div>
                    )}
                </div>

                <div className="mt-2 mb-2">
                  <label
                    htmlFor="productBatchDetils"
                    className="form-label"
                    style={{ fontBatch: 14 }}
                  >
                    Product Batch Details
                  </label>
                  <textarea
                    className="form-control"
                    id="productBatchDetils"
                    name="productBatchDetils"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.productBatchDetils}
                  />
                  {formik.touched.productBatchDetils &&
                    formik.errors.productBatchDetils && (
                      <div className="text-danger">
                        {formik.errors.productBatchDetils}
                      </div>
                    )}
                </div>

                <div className="mt-2 mb-2">
                  <label
                    htmlFor="productBatchManufacturedDate"
                    className="form-label"
                    style={{ fontBatch: 14 }}
                  >
                    Manufactured Date
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="productBatchManufacturedDate"
                    name="productBatchManufacturedDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.productBatchManufacturedDate}
                  />
                  {formik.touched.productBatchManufacturedDate &&
                    formik.errors.productBatchManufacturedDate && (
                      <div className="text-danger">
                        {formik.errors.productBatchManufacturedDate}
                      </div>
                    )}
                </div>

                <div className="mt-2 mb-2">
                  <label
                    htmlFor="productBatchStartDate"
                    className="form-label"
                    style={{ fontBatch: 14 }}
                  >
                    Start Date
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="productBatchStartDate"
                    name="productBatchStartDate"
                    min={formik.values.productBatchManufacturedDate}  
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.productBatchStartDate}
                  />

                  {formik.touched.productBatchStartDate &&
                    formik.errors.productBatchStartDate && (
                      <div className="text-danger">
                        {formik.errors.productBatchStartDate}
                      </div>
                    )}
                </div>

                <div className="mt-2 mb-2">
                  <label
                    htmlFor="productBatchExpirytDate"
                    className="form-label"
                    style={{ fontBatch: 14 }}
                  >
                    Expiry Date
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="productBatchExpirytDate"
                    name="productBatchExpirytDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} 
                    min={formik.values.productBatchStartDate}  
                    value={formik.values.productBatchExpirytDate}
                  />
                  {formik.touched.productBatchExpirytDate &&
                    formik.errors.productBatchExpirytDate && (
                      <div className="text-danger">
                        {formik.errors.productBatchExpirytDate}
                      </div>
                    )}
                </div>

                <div className="mt-2 mb-2">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="productBatchNoExpiryDate"
                      name="productBatchNoExpiryDate"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.productBatchNoExpiryDate}
                    />
                    <label
                      htmlFor="productBatchNoExpiryDate"
                      className="form-check-label"
                      style={{ fontBatch: 14 }}
                    >
                      No Expiry Date
                    </label>
                  </div>
                </div>

                <div className="d-flex justify-content-between modal-footer mt-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    ref={props.close}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: "#ff9f43", color: "white" }}
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProductBatch;
