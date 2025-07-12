import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";

const CreateHSCode = (props) => {
  const validationSchema = Yup.object({
    hsCodeName1: Yup.string().required("HS Code Name 1 is required"),
    hsCodeName2: Yup.string().required("HS Code Name 2 is required"),
    hsCodeName3: Yup.string().required("HS Code Name 3 is required"),
    hsCodeDescription: Yup.string().required("HS Code Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      hsCodeName1: "",
      hsCodeName2: "",
      hsCodeName3: "",
      hsCodeDescription: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
      };
      console.log(formData);

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/HSCode/SaveHSCode",
          method: "POST",
          data: formData,
        });

        if (response?.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "Product HSCode saved successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });

          formik.resetForm();
          if (props.close && props.close.current) {
            props.close.current.click();
          }
          if (typeof props.onclick === "function" ) {
            props.onclick();
          }
        } else {
          throw new Error("Failed to save the product HSCode");
        }
      } catch (error) {
        console.error("Error during product HSCode save:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "An error occurred while saving the product HSCode",
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
      data-bs-target="#CreateHscodeModal"
      ref={props.open}
    >
      Create Hscode
    </button>

    <div
      className="modal fade"
      id="CreateHscodeModal"
      tabIndex="-1"
      aria-labelledby="CreateHscodeModalLabel"
      data-bs-backdrop="static"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="CreateHscodeModalLabel">
              Create Hscode
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
  <label htmlFor="hsCodeName1" className="form-label">
    HS Code Name 1
  </label>
  <input
    type="text"
    className={`form-control ${formik.touched.hsCodeName1 && formik.errors.hsCodeName1 ? "is-invalid" : ""}`}
    id="hsCodeName1"
    name="hsCodeName1"
    value={formik.values.hsCodeName1}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.touched.hsCodeName1 && formik.errors.hsCodeName1 && (
    <div className="invalid-feedback">{formik.errors.hsCodeName1}</div>
  )}
</div>

{/* HS Code Name 2 Field */}
<div className="mb-3">
  <label htmlFor="hsCodeName2" className="form-label">
    HS Code Name 2
  </label>
  <input
    type="text"
    className={`form-control ${formik.touched.hsCodeName2 && formik.errors.hsCodeName2 ? "is-invalid" : ""}`}
    id="hsCodeName2"
    name="hsCodeName2"
    value={formik.values.hsCodeName2}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.touched.hsCodeName2 && formik.errors.hsCodeName2 && (
    <div className="invalid-feedback">{formik.errors.hsCodeName2}</div>
  )}
</div>

{/* HS Code Name 3 Field */}
<div className="mb-3">
  <label htmlFor="hsCodeName3" className="form-label">
    HS Code Name 3
  </label>
  <input
    type="text"
    className={`form-control ${formik.touched.hsCodeName3 && formik.errors.hsCodeName3 ? "is-invalid" : ""}`}
    id="hsCodeName3"
    name="hsCodeName3"
    value={formik.values.hsCodeName3}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.touched.hsCodeName3 && formik.errors.hsCodeName3 && (
    <div className="invalid-feedback">{formik.errors.hsCodeName3}</div>
  )}
</div>

{/* HS Code Description Field */}
<div className="mb-3">
  <label htmlFor="hsCodeDescription" className="form-label">
    HS Code Description
  </label>
  <textarea
    className={`form-control ${formik.touched.hsCodeDescription && formik.errors.hsCodeDescription ? "is-invalid" : ""}`}
    id="hsCodeDescription"
    name="hsCodeDescription"
    value={formik.values.hsCodeDescription}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.touched.hsCodeDescription && formik.errors.hsCodeDescription && (
    <div className="invalid-feedback">{formik.errors.hsCodeDescription}</div>
  )}
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

export default CreateHSCode;
