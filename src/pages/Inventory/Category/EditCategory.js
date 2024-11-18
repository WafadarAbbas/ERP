import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiCall from "../../../Apicall/ApiCall";
import Swal from "sweetalert2";

const EditCategory = (props) => {
  const { selectedCategoryId } = props;
  const [initialValues, setInitialValues] = useState({
    productCategoryName: "",
  });

  const validationSchema = Yup.object({
    productCategoryName: Yup.string()
      .required("Product Category Name is required")
      .min(3, "Category name must be at least 3 characters"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
        branchId: 1,
        id: selectedCategoryId,
      };

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/ProductCategory/UpdateProductCategory",
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
    const fetchCategory = async () => {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/ProductCategory/GetProductCategoryByIdQuery/${selectedCategoryId}?organizationId=1&companyId=1`,
          method: "GET",
        });

        if (response && response.data && response.data.length > 0) {
          console.log("Fetched Data:", response.data[0]);
          setInitialValues({
            productCategoryName: response.data[0].productCategoryName || "",
          });
        } else {
          console.error("Failed to load category data.");
        }
      } catch (error) {
        console.error("Error fetching category:", error.message);
      }
    };

    if (selectedCategoryId) {
      fetchCategory();
    }
  }, [selectedCategoryId]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#EditCategoryModal"
        ref={props.open}
      >
        Edit Category
      </button>

      <div
        className="modal fade"
        id="EditCategoryModal"
        tabIndex="-1"
        aria-labelledby="EditCategoryModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditCategoryModalLabel">
                Edit Category
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
                <div className="mb-5 mt-3">
                  <label htmlFor="productCategoryName" className="form-label">
                    Product Category Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productCategoryName"
                    name="productCategoryName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.productCategoryName}
                  />
                  {formik.touched.productCategoryName &&
                    formik.errors.productCategoryName && (
                      <div className="text-danger">
                        {formik.errors.productCategoryName}
                      </div>
                    )}
                </div>

                <div className="d-flex justify-content-between">
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

export default EditCategory;
