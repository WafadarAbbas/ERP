import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";  

const CreatePurchseOrderTerms = (props) => {
  const validationSchema = Yup.object({
    poTerms: Yup.string()
      .required("Terms are required")
      .min(3, "Terms must be at least 3 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      poTerms: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
      };
      console.log("Form Data Submitted:", formData);

     
      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/PurchseOrderTerms/Save",
          method: "POST",
          data: formData,
        });

        if (response?.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "Purchase Order Terms saved successfully.",
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
          throw new Error("Failed to save the Purchase Order Terms");
        }
      } catch (error) {
        console.error("Error during Purchase Order Terms save:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "An error occurred while saving the Purchase Order Terms",
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
        data-bs-target="#CreatePurchseOrderTermsModal"
        ref={props.open}
      >
        Create Purchase Order Terms
      </button>

      <div
        className="modal fade"
        id="CreatePurchseOrderTermsModal"
        tabIndex="-1"
        aria-labelledby="CreatePurchseOrderTermsModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreatePurchseOrderTermsModalLabel">
                Create Purchase Order Terms
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
                <div className="row">
                  <div className="mb-3">
                    <label htmlFor="poTerms" className="form-label" style={{fontSize:14}}>
                      Terms
                    </label>
                    <textarea
                      id="poTerms"
                      name="poTerms"
                      className="form-control"
                      rows="2"
                      value={formik.values.poTerms}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.touched.poTerms && formik.errors.poTerms && (
                      <div className="text-danger">{formik.errors.poTerms}</div>
                    )}
                  </div>
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

export default CreatePurchseOrderTerms;
