import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiCall from "../../../Apicall/ApiCall";
import Swal from "sweetalert2";

const EditSubCategory = (props) => {
  const { selectedSubCategoryId } = props;
 
  const [categories, setCategories] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(""); 

  const formik = useFormik({
    initialValues: {
      productSubCategoryName: "",
      productCategoryId: "",
      productCategoryName: "", 
    },

    enableReinitialize: true,
    onSubmit: async (values) => {
      const selectedCategory = categories.find(
    (cat) => cat.id === Number(values.productCategoryId)
  );
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
        productCategoryName: selectedCategory?.name || null,
        id: selectedSubCategoryId,
      };

      
   

      console.log(formData);  
      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/ProductSubCategory/UpdateProductSubCategory",
          method: "PUT",
          data: formData,
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire(
            "Updated",
            "The category has been updated successfully.",
            "success"
          );

          formik.resetForm();

          if (typeof props.onclick === "function") {
            props.onclick();
          }
          if (typeof props.onIdReset === "function") {
            props.onIdReset();
          }
          if (props.close && props.close.current) {
            props.close.current.click(); // Close the modal by triggering the close button
          }
        } else {
          Swal.fire("Error", "Failed to update category", "error");
        }
      } catch (error) {
        console.error("Error during update:", error);
        Swal.fire(
          "Error",
          "An error occurred while updating the category",
          "error"
        );
      }
     
      
    },
  });

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

    const fetchSubCategory = async () => {
      try {
        const response = await fetch(
          `http://localhost:5022/api/v1/ProductSubCategory/GetProductSubCategoryByIdQuery/GetById/${selectedSubCategoryId}?organizationId=1&companyId=1`
        );
        const data = await response.json();
        setSubCategoryData(data[0]);

        // Set form values after fetching the data
        if (data && data.length > 0) {
          formik.setValues({
            productSubCategoryName: data[0].productSubCategoryName,
            productCategoryId: data[0].productCategoryId,
          
          });

          setSelectedCategoryName(data[0].productCategoryName); // Set category name from fetched data
        }
      } catch (error) {
        console.error("Error fetching subcategory:", error);
      }
    };

    fetchCategories();
    if (selectedSubCategoryId) {
      fetchSubCategory();
    }
  }, [selectedSubCategoryId]);

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
        data-bs-target="#EditSubCategoryModal"
        ref={props.open}
      >
        Edit SubCategory
      </button>

      <div
        className="modal fade"
        id="EditSubCategoryModal"
        tabIndex="-1"
        aria-labelledby="EditSubCategoryModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditSubCategoryModalLabel">
                Edit SubCategory
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
                    onChange={(e) => {
                      const selectedCategory = categories.find(
                        (category) => category.id === Number(e.target.value)
                      );
                      formik.setFieldValue("productCategoryId", selectedCategory.id);
                      formik.setFieldValue("productCategoryName", selectedCategory.name);
                      setSelectedCategoryName(selectedCategory.name); 
                    }}
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
                  {formik.touched.productCategoryId && formik.errors.productCategoryId && (
                    <div className="text-danger">{formik.errors.productCategoryId}</div>
                  )}
                </div>

                <div className="mt-2 mb-2">
                  <label htmlFor="productSubCategoryName" className="form-label">
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
                  {formik.touched.productSubCategoryName && formik.errors.productSubCategoryName && (
                    <div className="text-danger">{formik.errors.productSubCategoryName}</div>
                  )}
                </div>

                <div className="d-flex justify-content-between modal-footer">
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
                    Update
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

export default EditSubCategory;




 