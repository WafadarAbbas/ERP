import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";

const EditProductSize = (props) => {
  const { selectedProductSizeId } = props;

  // Form validation schema
  const validationSchema = Yup.object({
    productSizeName: Yup.string().required("Product Size Name is required"),
  });

  // Fetch size data on component mount or when the ID changes
  useEffect(() => {
    const fetchSize = async () => {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/ProductSize/GetProductSizeByIdQuery/GetById/${selectedProductSizeId}?organizationId=1&companyId=1`,
          method: "GET",
        });

        if (response?.data?.length > 0) {
          const fetchedData = response.data[0];
          formik.setValues({
            productSizeName: fetchedData.productSizeName || "",
          });
        } else {
          console.error("Failed to load Size data.");
        }
      } catch (error) {
        console.error("Error fetching Size:", error.message);
      }
    };

    if (selectedProductSizeId) {
      fetchSize();
    }
  }, [selectedProductSizeId]);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      productSizeName: "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true, // Enable reinitialization for formik to update values dynamically
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
        id: selectedProductSizeId,
      };

      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/ProductSize/UpdateProductSize`,
          method: "PUT",
          data: formData,
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire({
            title: "Success!",
            text: "Product Size saved successfully.",
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
          if (typeof props.onclick === "function") {
            props.onclick(); // Trigger any additional actions
          }
        } else {
          throw new Error("Failed to save the Product Size");
        }
      } catch (error) {
        console.error("Error during Product Size save:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "An error occurred while saving the Product Size",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Close",
        });
      }
    },
  });


  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#EditProductSizeModal"
        ref={props.open}
      >
        Edit Product Size
      </button>

      <div
        className="modal fade"
        id="EditProductSizeModal"
        tabIndex="-1"
        aria-labelledby="EditProductSizeModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditProductSizeModalLabel">
                Edit Product Size
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
                  {formik.touched.productSizeName && formik.errors.productSizeName && (
                    <div className="text-danger">{formik.errors.productSizeName}</div>
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

export default EditProductSize;
