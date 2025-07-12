import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";

const CreateSubCategory = (props) => {
  const validationSchema = Yup.object({
    productSubCategoryName: Yup.string()
      .required("Product SubCategory Name is required")
      .min(3, "SubCategory name must be at least 3 characters"),
  });

  const [categories, setCategories] = useState([]);

  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:5022/api/v1/ProductCategory/GetProductCategoryBoxItems/combobox?organizationId=1&companyId=1"
        );
        const data = await response.json();
        setCategories(data);  
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  const formik = useFormik({
    initialValues: {
      productSubCategoryName: "",
      productCategoryId: "",   
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      
      const formData = {
        productSubCategoryName: values.productSubCategoryName,
        productCategoryId: values.productCategoryId, 
        organizationId: 1,
        companyId: 1,
      };

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/ProductSubCategory/SaveProductSubCategory",
          method: "POST",
          data: formData,
        });

        if (response?.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "SubCategory saved successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
          formik.resetForm();
        
          if (typeof props.onclick === "function") {
            props.onclick();
          }
          if (props.close && props.close.current) {
            props.close.current.click();  
          }
        } else {
          throw new Error("Failed to save the SubCategory");
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text:
            error.message || "An error occurred while saving the SubCategory",
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
      data-bs-target="#CreateSubCategoryModal"
      ref={props.open}
    >
      Create SubCategory
    </button>

    <div
      className="modal fade"
      id="CreateSubCategoryModal"
      tabIndex="-1"
      aria-labelledby="CreateSubCategoryModalLabel"
      data-bs-backdrop="static"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="CreateSubCategoryModalLabel">
              Create SubCategory
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
                <div className="mt-1">
                  <label htmlFor="productCategoryId" className="form-label">
                    Product Category
                  </label>
                  <select
                    id="productCategoryId"
                    name="productCategoryId"
                    className="form-control"
                    onChange={(e) =>
                      formik.setFieldValue(
                        "productCategoryId",
                        Number(e.target.value)
                      )
                    }
                    onBlur={formik.handleBlur}
                    value={formik.values.productCategoryId}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.productCategoryId &&
                    formik.errors.productCategoryId && (
                      <div className="text-danger">
                        {formik.errors.productCategoryId}
                      </div>
                    )}
                </div>
                <div className="mt-2 mb-2">
                  <label
                    htmlFor="productSubCategoryName"
                    className="form-label"
                  >
                    Product SubCategory Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productSubCategoryName"
                    name="productSubCategoryName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.productSubCategoryName}
                  />
                  {formik.touched.productSubCategoryName &&
                    formik.errors.productSubCategoryName && (
                      <div className="text-danger">
                        {formik.errors.productSubCategoryName}
                      </div>
                    )}
                </div>

                <div className="d-flex justify-content-between modal-footer">
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

export default CreateSubCategory;
