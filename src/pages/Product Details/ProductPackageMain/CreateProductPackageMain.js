import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";

const CreateProductPackageMain = (props) => {
  const validationSchema = Yup.object({
    packageCode: Yup.string()
      .required("Package Code is required")
      .min(1, "Package Code must be at least 1 characters")
      .max(20, "Package Code must not exceed 20 characters"),
    startDate: Yup.date().required("Start Date is required").nullable(),
    endDate: Yup.date()
      .required("End Date is required")
      .min(
        Yup.ref("startDate"),
        "End Date must be after or equal to the Start Date"
      )
      .nullable(),

    packagePrice: Yup.number()
      .required("Package Price is required")
      .min(0, "Package Price cannot be negative"), 
  });

  const formik = useFormik({
    initialValues: {
      packageCode: "",
      startDate: "",
      endDate: "",
      packagePrice: 0,
      packageStatus: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
      };
      console.log("Form Data Submitted:", formData);

      // Commented API call
      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/ProductPackageMain/SaveProductPackageMain",
          method: "POST",
          data: formData,
        });

        if (response?.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "Product Package Main saved successfully.",
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
          throw new Error("Failed to save the product package Main");
        }
      } catch (error) {
        console.error("Error during product package Main save:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "An error occurred while saving the product package Main",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Close",
        });
      }
    },
  });

  const handleModalClose = () => {
    formik.resetForm();
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#CreateProductPackageMainModal"
        ref={props.open}
      >
        Create Product Package
      </button>

      <div
        className="modal fade"
        id="CreateProductPackageMainModal"
        tabIndex="-1"
        aria-labelledby="CreateProductPackageMainModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="CreateProductPackageMainModalLabel"
              >
                Create Product Package Main
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={handleModalClose}
                ref={props.close}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="packageCode" className="form-label">
                    Package Code
                  </label>
                  <input
                    type="text"
                    id="packageCode"
                    name="packageCode"
                    className={`form-control ${
                      formik.touched.packageCode && formik.errors.packageCode
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.packageCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.packageCode && formik.errors.packageCode && (
                    <div className="invalid-feedback">
                      {formik.errors.packageCode}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">
                    Start Date
                  </label>
                  <input
                    type="datetime-local"
                    id="startDate"
                    name="startDate"
                    className={`form-control ${
                      formik.touched.startDate && formik.errors.startDate
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.startDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.startDate && formik.errors.startDate && (
                    <div className="invalid-feedback">
                      {formik.errors.startDate}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">
                    End Date
                  </label>
                  <input
                    type="datetime-local"
                    id="endDate"
                    name="endDate"
                    className={`form-control ${
                      formik.touched.endDate && formik.errors.endDate
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.endDate && formik.errors.endDate && (
                    <div className="invalid-feedback">
                      {formik.errors.endDate}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="packagePrice" className="form-label">
                    Package Price
                  </label>
                  <input
                    type="number"
                    id="packagePrice"
                    name="packagePrice"
                    className={`form-control ${
                      formik.touched.packagePrice && formik.errors.packagePrice
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.packagePrice}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.packagePrice &&
                    formik.errors.packagePrice && (
                      <div className="invalid-feedback">
                        {formik.errors.packagePrice}
                      </div>
                    )}
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    id="packageStatus"
                    name="packageStatus"
                    className="form-check-input"
                    checked={formik.values.packageStatus}
                    onChange={(e) => {
                      formik.setFieldValue("packageStatus", e.target.checked);
                    }}
                  />
                  <label htmlFor="packageStatus" className="form-check-label">
                    Active Status
                  </label>
                </div>

                <div className="d-flex justify-content-between modal-footer mt-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleModalClose}
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

export default CreateProductPackageMain;
