import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";  

const CreateProductType = (props) => {
  
  const validationSchema = Yup.object({
    productTypeName: Yup.string()
      .required("Product Type Name is required")
      .min(2, "Product Type Name should be at least 3 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      productTypeName: "", 
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
          url: 'http://localhost:5022/api/v1/ProductType/SaveProductType',
          method: 'POST',
          data: formData,
        });

     
        if (response?.status === 200) {
          Swal.fire({
            title: 'Success!',
            text: 'Product Type saved successfully.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
          formik.resetForm();   
          if (typeof props.onclick === "function") {
            props.onclick(); 
          }
        } else {
          throw new Error('Failed to save the product Type');
        }
      } catch (error) {
      
        console.error('Error during product Type save:', error);
        Swal.fire({
          title: 'Error',
          text: error.message || 'An error occurred while saving the product Type',
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

  const handleModalClose = () => {
    formik.resetForm();
    if (typeof props.close === "function") {
      props.close();
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#CreateProductTypeModal"
        ref={props.open}
      >
        Create ProductType
      </button>

      <div
        className="modal fade"
        id="CreateProductTypeModal"
        tabIndex="-1"
        aria-labelledby="CreateProductTypeModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateProductTypeModalLabel">
                Create ProductType
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={handleModalClose}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="mt-2 mb-2 ">
                  <label htmlFor="productTypeName" className="form-label" style={{fontType:14}}>
                    Product Type Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productTypeName"
                    name="productTypeName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.productTypeName}
                  />
                  {formik.touched.productTypeName &&
                    formik.errors.productTypeName && (
                      <div className="text-danger">
                        {formik.errors.productTypeName}
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

export default CreateProductType;