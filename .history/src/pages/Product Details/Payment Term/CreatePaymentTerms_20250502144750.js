import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";

const CreatePaymentTerms = (props) => {
  const validationSchema = Yup.object({
    termName: Yup.string().required("Term name is required"),
    numberOfDays: Yup.string().required("Number of days is required")
  });

  const formik = useFormik({
    initialValues: {
      termName: "",
      numberOfDays: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
      };

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/PaymentTerms/SavePaymentTerms",
          method: "POST",
          data: formData,
        });

        if (response?.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "Payment Terms saved successfully.",
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
          throw new Error("Failed to save the Payment Terms");
        }
      } catch (error) {
        console.error("Error during product Payment Terms:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "An error occurred while saving the Payment Term",
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
      data-bs-target="#CreatePAymentTermModal"
      ref={props.open}
    >
      Create PAymentTerm
    </button>

    <div
      className="modal fade"
      id="CreatePAymentTermModal"
      tabIndex="-1"
      aria-labelledby="CreatePAymentTermModalLabel"
      data-bs-backdrop="static"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="CreatePAymentTermModalLabel">
              Create Payment Term
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
                <div className="mb-3">
                  <label htmlFor="termName" className="form-label">
                    Term Name
                  </label>
                  <input
                    id="termName"
                    name="termName"
                    type="text"
                    className={`form-control ${formik.touched.termName && formik.errors.termName ? "is-invalid" : ""}`}
                    value={formik.values.termName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.termName && formik.errors.termName ? (
                    <div className="invalid-feedback">{formik.errors.termName}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="numberOfDays" className="form-label">
                    Number of Days
                  </label>
                  <input
                    id="numberOfDays"
                    name="numberOfDays"
                    type="text"
                    className={`form-control ${formik.touched.numberOfDays && formik.errors.numberOfDays ? "is-invalid" : ""}`}
                    value={formik.values.numberOfDays}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.numberOfDays && formik.errors.numberOfDays ? (
                    <div className="invalid-feedback">{formik.errors.numberOfDays}</div>
                  ) : null}
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

export default CreatePaymentTerms;

