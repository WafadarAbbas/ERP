import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";

const EditProductPackagePolicy = (props) => {
  const [productPackageOptions, setProductPackageOptions] = useState([]);
  const { selectedProductPackagePolicyId } = props;

  const validationSchema = Yup.object({
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date can't be before start date"),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price can't be negative"),
    productPackageMainId: Yup.string().required("Product package is required"),
  });

  const formik = useFormik({

    initialValues: {
      startDate: "",
      endDate: "",
      price: 0,
      isCurrentPrice: false,
      productPackageMainId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      const selectedproductPackageOptions = productPackageOptions.find(
        (option) => option.id === values.productPackageMainId
      );
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
        branchId: 1,
        packageCode : selectedproductPackageOptions?.name || null,
        id: selectedProductPackagePolicyId,
      };
      console.log(formData);

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/ProductPackagePolicy/UpdateProductPackagePolicy",
          method: "PUT",
          data: formData,
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire({
            title: "Success!",
            text: "Package Policy saved successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });

          formik.resetForm();
          if (props.close && props.close.current) {
            props.close.current.click();
          }
          if (typeof props.onclick === "function" ) {
            props.onclick();
          }
        } else {
          throw new Error("Failed to save the Package Policy");
        }
      } catch (error) {
        console.error("Error during Package Policy save:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "An error occurred while saving the Package Policy",
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
    const fetchProductPackagePolicy = async () => {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/ProductPackagePolicy/GetProductPackagePolicyByIdQuery/GetById/${selectedProductPackagePolicyId}?organizationId=1&companyId=1`,
          method: "GET",
        });

        if (response && response.data && response.data.length > 0) {
          const ProductPackagePolicy = response.data[0];

          formik.setValues({
            startDate: ProductPackagePolicy.startDate || "",
            endDate: ProductPackagePolicy.endDate || "",
            price: ProductPackagePolicy.price || "",
            isCurrentPrice: ProductPackagePolicy.isCurrentPrice || "",
            productPackageMainId:
              ProductPackagePolicy.productPackageMainId || "",
          });
        } else {
          console.error("Failed to load Package Policy data.");
        }
      } catch (error) {
        console.error("Error fetching Package Policy:", error.message);
      }
    };

    if (selectedProductPackagePolicyId) {
      fetchProductPackagePolicy();
    }
  }, [selectedProductPackagePolicyId]);

  useEffect(() => {
    const fetchProductPackageOptions = async () => {
      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/ProductPackageMain/GetProductPackageMainBoxItems/combobox?organizationId=1&companyId=1",
          method: "GET",
        });
        if (response?.status === 200 && Array.isArray(response.data)) {
          setProductPackageOptions(response.data);
        } else {
          throw new Error("Failed to fetch product package options.");
        }
      } catch (error) {
        console.error("Error fetching product packages:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "Failed to load product packages.",
          icon: "error",
        });
      }
    };

    fetchProductPackageOptions();
  }, []);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#EditProductPackagePolicyModal"
        ref={props.open}
      >
        Edit ProductPackagePolicy
      </button>

      <div
        className="modal fade"
        id="EditProductPackagePolicyModal"
        tabIndex="-1"
        aria-labelledby="EditProductPackagePolicyModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="EditProductPackagePolicyModalLabel"
              >
                Edit Policy
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
                {/* Start Date Field */}
                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">
                    Start Date
                  </label>
                  <input
                    type="datetime-local"
                    className={`form-control ${
                      formik.touched.startDate && formik.errors.startDate
                        ? "is-invalid"
                        : ""
                    }`}
                    id="startDate"
                    name="startDate"
                    value={formik.values.startDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.startDate && formik.errors.startDate ? (
                    <div className="invalid-feedback">
                      {formik.errors.startDate}
                    </div>
                  ) : null}
                </div>

                {/* End Date Field */}
                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">
                    End Date
                  </label>
                  <input
                    type="datetime-local"
                    className={`form-control ${
                      formik.touched.endDate && formik.errors.endDate
                        ? "is-invalid"
                        : ""
                    }`}
                    id="endDate"
                    name="endDate"
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.endDate && formik.errors.endDate ? (
                    <div className="invalid-feedback">
                      {formik.errors.endDate}
                    </div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className={`form-control ${
                      formik.touched.price && formik.errors.price
                        ? "is-invalid"
                        : ""
                    }`}
                    id="price"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    min="0"
                  />
                  {formik.touched.price && formik.errors.price ? (
                    <div className="invalid-feedback">
                      {formik.errors.price}
                    </div>
                  ) : null}
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isCurrentPrice"
                    name="isCurrentPrice"
                    checked={formik.values.isCurrentPrice}
                    onChange={(e) =>
                      formik.setFieldValue("isCurrentPrice", e.target.checked)
                    }
                  />
                  <label className="form-check-label" htmlFor="isCurrentPrice">
                    Is Current Price
                  </label>
                </div>

                <div className="mb-3">
                  <label htmlFor="productPackageMainId" className="form-label">
                    Product Package
                  </label>
                  <select
                    className={`form-control ${
                      formik.touched.productPackageMainId &&
                      formik.errors.productPackageMainId
                        ? "is-invalid"
                        : ""
                    }`}
                    id="productPackageMainId"
                    name="productPackageMainId"
                    value={formik.values.productPackageMainId}
                    onChange={(e) => {
                      formik.setFieldValue(
                        "productPackageMainId",
                        Number(e.target.value)
                      );
                    }}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Product Package</option>

                    {Array.isArray(productPackageOptions) &&
                    productPackageOptions.length > 0 ? (
                      productPackageOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))
                    ) : (
                      <option value="">No Product Package Available</option>
                    )}
                  </select>
                  {formik.touched.productPackageMainId &&
                    formik.errors.productPackageMainId && (
                      <div className="invalid-feedback">
                        {formik.errors.productPackageMainId}
                      </div>
                    )}
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

export default EditProductPackagePolicy;
