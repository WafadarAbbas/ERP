import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";  

const CreatePurchaseOrderStatus = (props) => {
  const validationSchema = Yup.object({
    poStatus: Yup.string()
      .required("Status are required")
      .min(3, "Status must be at least 3 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      poStatus: "",
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
          url: "http://localhost:5022/api/v1/PurchaseOrderStatus/Save",
          method: "POST",
          data: formData,
        });

        if (response?.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "Purchase Order Status saved successfully.",
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
          throw new Error("Failed to save the Purchase Order Status");
        }
      } catch (error) {
        console.error("Error during Purchase Order Status save:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "An error occurred while saving the Purchase Order Status",
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
        data-bs-target="#CreatePurchaseOrderStatusModal"
        ref={props.open}
      >
        Create Purchase Order Status
      </button>

      <div
        className="modal fade"
        id="CreatePurchaseOrderStatusModal"
        tabIndex="-1"
        aria-labelledby="CreatePurchaseOrderStatusModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreatePurchaseOrderStatusModalLabel">
                Create Purchase Order Status
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
                    <label htmlFor="poStatus" className="form-label" style={{fontSize:14}}>
                    Purchase Order Status
                    </label>
                    <textarea
                      id="poStatus"
                      name="poStatus"
                      className="form-control"
                      rows="2"
                      value={formik.values.poStatus}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.touched.poStatus && formik.errors.poStatus && (
                      <div className="text-danger">{formik.errors.poStatus}</div>
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

export default CreatePurchaseOrderStatus;
