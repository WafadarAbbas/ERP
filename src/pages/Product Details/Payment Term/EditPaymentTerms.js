import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";

const EditPaymentTerms = (props) => {
  const { selectedPaymentTermsId } = props;
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
        id: selectedPaymentTermsId,
      };
      console.log(formData);

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/PaymentTerms/UpdatePaymentTerms",
          method: "PUT",
          data: formData,
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire({
            title: "Success!",
            text: "Payment Term saved successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });

          formik.resetForm();
          if (props.close && props.close.current) {
            props.close.current.click();
          }
          if (typeof props.onIdReset === "function") {
            props.onIdReset();
          }
          if (typeof props.onclick === "function") {
            props.onclick();
          }
        } else {
          throw new Error("Failed to save the Payment Terms");
        }
      } catch (error) {
        console.error("Error during Payment Terms save:", error);
        Swal.fire({
          title: "Error",
          text:
            error.message || "An error occurred while saving the Payment Terms",
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

  const handleModalClose = () => {
    formik.resetForm();
  };

  useEffect(() => {
    const fetchPaymentTerms = async () => {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/PaymentTerms/GetPaymentTermsByIdQuery/GetById/${selectedPaymentTermsId}?organizationId=1&companyId=1`,
          method: "GET",
        });

        if (response && response.data && response.data.length > 0) {
          const PaymentTerms = response.data[0];
          formik.setValues({
            termName: PaymentTerms.termName || "",
            numberOfDays: PaymentTerms.numberOfDays || "",
          });
        } else {
          console.error("Failed to load Payment Terms data.");
        }
      } catch (error) {
        console.error("Error fetching Payment Terms:", error.message);
      }
    };

    if (selectedPaymentTermsId) {
      fetchPaymentTerms();
    }
  }, [selectedPaymentTermsId]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#EditPaymentTermsModal"
        ref={props.open}
      >
        Edit PaymentTerms
      </button>

      <div
        className="modal fade"
        id="EditPaymentTermsModal"
        tabIndex="-1"
        aria-labelledby="EditPaymentTermsModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditPaymentTermsModalLabel">
                Edit Payment Terms
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
                  <label htmlFor="termName" className="form-label">
                    Term Name
                  </label>
                  <input
                    id="termName"
                    name="termName"
                    type="text"
                    className={`form-control ${
                      formik.touched.termName && formik.errors.termName
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.termName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.termName && formik.errors.termName ? (
                    <div className="invalid-feedback">
                      {formik.errors.termName}
                    </div>
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
                    className={`form-control ${
                      formik.touched.numberOfDays && formik.errors.numberOfDays
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.numberOfDays}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.numberOfDays && formik.errors.numberOfDays ? (
                    <div className="invalid-feedback">
                      {formik.errors.numberOfDays}
                    </div>
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

export default EditPaymentTerms;
