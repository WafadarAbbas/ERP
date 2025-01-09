import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";
 


const EditSupplierCategory = (props) => {

  const { selectedSupplierCategoryId } = props;
 
  const validationSchema = Yup.object({
    categoryName: Yup.string()
    .required("Type Name is required")
    .min(2, "Type Name must be at least 2 characters")
    .max(50, "Type Name can't exceed 50 characters"),
  });

  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
        id:selectedSupplierCategoryId,
      };
      console.log(formData);

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/SupplierCategory/UpdateSupplierCategory",
          method: "PUT",
          data: formData,
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire({
            title: "Success!",
            text: "Supplier Category saved successfully.",
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
          throw new Error("Failed to save the Supplier Category");
        }
      } catch (error) {
        console.error("Error during Supplier Category save:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "An error occurred while saving the Supplier Category",
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
  const fetchSupplierCategory = async () => {
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/SupplierCategory/GetSupplierCategoryByIdQuery/GetISupplierCategoryById?id=${selectedSupplierCategoryId}&organizationId=1&companyId=1`,
        method: "GET",
      });

      if (response && response.data && response.data.length > 0) {
        const SupplierCategory = response.data[0];
        
        
        formik.setValues({
          categoryName: SupplierCategory.categoryName || "",
        });
      } else {
        console.error("Failed to load Supplier Category data.");
      }
    } catch (error) {
      console.error("Error fetching Supplier Category:", error.message);
    }
  };

  if (selectedSupplierCategoryId) {
    fetchSupplierCategory();
  }
}, [selectedSupplierCategoryId]);


 

    return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#EditSupplierCategoryModal"
        ref={props.open}
      >
        Edit SupplierCategory
      </button>

      <div
        className="modal fade"
        id="EditSupplierCategoryModal"
        tabIndex="-1"
        aria-labelledby="EditSupplierCategoryModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditSupplierCategoryModalLabel">
                Edit Main
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
                  <label htmlFor="categoryName" className="form-label">
                  Category Name
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    name="categoryName"
                    className={`form-control ${
                      formik.touched.categoryName && formik.errors.categoryName ? "is-invalid" : ""
                    }`}
                    value={formik.values.categoryName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.categoryName && formik.errors.categoryName ? (
                    <div className="invalid-feedback">{formik.errors.categoryName}</div>
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

export default EditSupplierCategory;