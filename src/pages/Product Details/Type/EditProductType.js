import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiCall from "../../../Apicall/ApiCall";
import Swal from "sweetalert2";

const EditProductType = (props) => {
  const { selectedProductTypeId } = props;
  const [initialValues, setInitialValues] = useState({
    productTypeName: "",
  });

  const validationSchema = Yup.object({
     productTypeName: Yup.string()
      .required(" Product Type Name is required")
      .min(3, "Product Type name must be at least 3 characters"),
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
        id: selectedProductTypeId,
      };

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/productType/UpdateproductType",
          method: "PUT",
          data: formData,
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire(
            "Updated",
            "The ProductType has been updated successfully.",
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
          Swal.fire("Error", "Failed to update ProductType", "error");
        }
      } catch (error) {
        console.error("Error during update:", error);
        Swal.fire(
          "Error",
          "An error occurred while updating the ProductType",
          "error"
        );
      }
    },
  });

  useEffect(() => {
    const fetchProductType = async () => {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/ProductType/GetProductTypeByIdQuery/GetIProductTypeById?id=${selectedProductTypeId}&organizationId=1&companyId=1`,
          method: "GET",
          method: "GET",
        });

        if (response && response.data && response.data.length > 0) {
         
          setInitialValues({
             productTypeName: response.data[0].productTypeName || "",
          });
        } else {
          console.error("Failed to load ProductType data.");
        }
      } catch (error) {
        console.error("Error fetching ProductType:", error.message);
      }
    };

    if (selectedProductTypeId) {
      fetchProductType();
    }
  }, [selectedProductTypeId]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#EditProductTypeModal"
        ref={props.open}
      >
        Edit ProductType
      </button>

      <div
        className="modal fade"
        id="EditProductTypeModal"
        tabIndex="-1"
        aria-labelledby="EditProductTypeModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditProductTypeModalLabel">
                Edit ProductType
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
                  <label htmlFor="productTypeName" className="form-label">
                    Product ProductType Name
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

export default EditProductType;
