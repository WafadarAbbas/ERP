import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";

const EditProductBrand = (props) => {
  const { selectedProductBrandId } = props;
  
  // Initialize form state
  const [productBrandData, setProductBrandData] = useState(null);

  // Form validation schema (add fields as necessary)
  const validationSchema = Yup.object({
    productBrandName: Yup.string().required("Product Brand Name is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      productBrandName: "", // Set empty or default values
    },
    validationSchema: validationSchema,
    enableReinitialize: true, // Enable reinitialization to set initial values from API response
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
        id:selectedProductBrandId
      };

      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/ProductBrand/UpdateProductBrand`,
          method: 'PUT',
          data: formData,
        });

        if (response?.status === 200|| response?.status === 204) {
          Swal.fire({
            title: 'Success!',
            text: 'Product Brand saved successfully.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
          formik.resetForm();  // Reset form after successful submission
          if (typeof props.onclick === "function") {
            props.onclick(); // Trigger any additional actions if needed
          }
        } else {
          throw new Error('Failed to save the Product Brand');
        }
      } catch (error) {
        console.error('Error during product brand save:', error);
        Swal.fire({
          title: 'Error',
          text: error.message || 'An error occurred while saving the Product Brand',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Close',
        });
      }
    },
  });

  // Fetch product brand data based on selectedProductBrandId
  useEffect(() => {
    const fetchProductBrand = async () => {
      if (selectedProductBrandId) {
        try {
          const response = await fetch(
            `http://localhost:5022/api/v1/ProductBrand/GetProductBrandByIdQuery/GetById/${selectedProductBrandId}?organizationId=1&companyId=1`
          );
          const data = await response.json();
          if (data && data.length > 0) {
            const productBrand = data[0]; // Assuming data is an array with the brand
            setProductBrandData(productBrand);

            // Set formik values after fetching the product brand
            formik.setValues({
              productBrandName: productBrand.productBrandName || "",
            });
          }
        } catch (error) {
          console.error("Error fetching product brand:", error);
        }
      }
    };

    fetchProductBrand();
  }, [selectedProductBrandId, formik]);

  // Close modal handler
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
        data-bs-target="#EditProductBrandModal"
        ref={props.open}
      >
        Edit Product Brand
      </button>

      <div
        className="modal fade"
        id="EditProductBrandModal"
        tabIndex="-1"
        aria-labelledby="EditProductBrandModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditProductBrandModalLabel">
                Edit Product Brand
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
                <div className="mt-1">
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
                  {formik.touched.productBrandName && formik.errors.productBrandName && (
                    <div className="text-danger">
                      {formik.errors.productBrandName}
                    </div>
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

export default EditProductBrand;
