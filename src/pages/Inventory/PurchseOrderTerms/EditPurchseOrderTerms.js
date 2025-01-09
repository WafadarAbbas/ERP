import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";
 


const EditPurchseOrderTerms = (props) => {

  const { selectedPurchseOrderTermsId } = props;
 
  const validationSchema = Yup.object({
  
  });

  const formik = useFormik({
    initialValues: {
       
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
        id:selectedPurchseOrderTermsId,
      };
      console.log(formData);

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/PurchseOrderTerms/Update",
          method: "PUT",
          data: formData,
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire({
            title: "Success!",
            text: "Po Terms saved successfully.",
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
          if (typeof props.onclick === "function" ) {
            props.onclick();
          }
        } else {
          throw new Error("Failed to save the product Price");
        }
      } catch (error) {
        console.error("Error during product Price save:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "An error occurred while saving the product Price",
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
  const fetchPurchseOrderTerms = async () => {
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/PurchseOrderTerms/GetById/GetById?id=${selectedPurchseOrderTermsId}&organizationId=1&companyId=1`,
        method: "GET",
      });

      if (response && response.data && response.data.length > 0) {
        const PurchseOrderTerms = response.data[0];
        formik.setValues({
          poTerms: PurchseOrderTerms.poTerms || "",
        });
      } else {
        console.error("Failed to load po Terms data.");
      }
    } catch (error) {
      console.error("Error fetching poTerms:", error.message);
    }
  };

  if (selectedPurchseOrderTermsId) {
    fetchPurchseOrderTerms();
  }
}, [selectedPurchseOrderTermsId]);


 

    return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#EditPurchseOrderTermsModal"
        ref={props.open}
      >
        Edit Purchase Order Terms
      </button>

      <div
        className="modal fade"
        id="EditPurchseOrderTermsModal"
        tabIndex="-1"
        aria-labelledby="EditPurchseOrderTermsModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditPurchseOrderTermsModalLabel">
                Edit Purchase Order Terms
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

export default EditPurchseOrderTerms;