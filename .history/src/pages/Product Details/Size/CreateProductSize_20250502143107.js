import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";  

const CreateProductSize = (props) => {
  
  const validationSchema = Yup.object({
    productSizeName: Yup.string()
      .required("Product Size Name is required")
      .min(2, "Product Size Name should be at least 3 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      productSizeName: "", 
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
          url: 'http://localhost:5022/api/v1/ProductSize/SaveProductSize',
          method: 'POST',
          data: formData,
        });

     
        if (response?.status === 200) {
          Swal.fire({
            title: 'Success!',
            text: 'Product Size saved successfully.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
          formik.resetForm();  
          if (props.close && props.close.current) {
            props.close.current.click();
          }
          if (typeof props.onclick === "function" ) {
            props.onclick();
          }
        } else {
          throw new Error('Failed to save the product Size');
        }
      } catch (error) {
      
        console.error('Error during product Size save:', error);
        Swal.fire({
          title: 'Error',
          text: error.message || 'An error occurred while saving the product Size',
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
        data-bs-target="#CreateProductSizeModal"
        ref={props.open}
      >
        Create ProductSize
      </button>

      <div
        className="modal fade"
        id="CreateProductSizeModal"
        tabIndex="-1"
        aria-labelledby="CreateProductSizeModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateProductSizeModalLabel">
                Create ProductSize
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="mt-2 mb-2 ">
                  <label htmlFor="productSizeName" className="form-label" style={{fontSize:14}}>
                    Product Size Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productSizeName"
                    name="productSizeName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.productSizeName}
                  />
                  {formik.touched.productSizeName &&
                    formik.errors.productSizeName && (
                      <div className="text-danger">
                        {formik.errors.productSizeName}
                      </div>
                    )}
                </div>

                <div className="d-flex justify-content-between modal-footer mt-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                
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

export default CreateProductSize;
