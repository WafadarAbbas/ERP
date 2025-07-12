import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";  

const CreateProductBrand = (props) => {
  
  const validationSchema = Yup.object({
    productBrandName: Yup.string()
      .required("Product Brand Name is required")
      .min(2, "Product Brand Name should be at least 3 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      productBrandName: "", 
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
          url: 'http://localhost:5022/api/v1/ProductBrand/SaveProductBrand',
          method: 'POST',
          data: formData,
        });

     
        if (response?.status === 200) {
          Swal.fire({
            title: 'Success!',
            text: 'Product brand saved successfully.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
          formik.resetForm();  
          if (props.close && props.close.current) {
            props.close.current.click();
          } 
          if (typeof props.onclick === "function") {
            props.onclick(); 
          }
        } else {
          throw new Error('Failed to save the product brand');
        }
      } catch (error) {
      
        console.error('Error during product brand save:', error);
        Swal.fire({
          title: 'Error',
          text: error.message || 'An error occurred while saving the product brand',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Close',
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
      data-bs-target="#CreateBrandModal"
      ref={props.open}
    >
      Create Brand
    </button>

    <div
      className="modal fade"
      id="CreateBrandModal"
      tabIndex="-1"
      aria-labelledby="CreateBrandModalLabel"
      data-bs-backdrop="static"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="CreateBrandModalLabel">
              Create Brand
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
                  <label htmlFor="productBrandName" className="form-label">
                    Product Brand Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productBrandName"
                    name="productBrandName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.productBrandName}
                  />
                  {formik.touched.productBrandName &&
                    formik.errors.productBrandName && (
                      <div className="text-danger">
                        {formik.errors.productBrandName}
                      </div>
                    )}
                </div>

                <div className="d-flex justify-content-between modal-footer mt-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleModalClose}
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

export default CreateProductBrand;
