import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall"; // Keep this commented
 

const CreateProductPricePolicy = (props) => {
  const [productVariantMains, setProductVariantMains] = useState([]);


  const fetchProductVariantMains = async () => {
    try {
      const response = await ApiCall({
        url: "http://localhost:5022/api/v1/ProductVariantMain/GetProductVariantMainBoxItems/combobox?organizationId=1&companyId=1",
        method: "GET",
      });
      setProductVariantMains(response.data);  
    } catch (error) {
      console.error("Error fetching product variant mains:", error);
    }
  };

  useEffect(() => {
    fetchProductVariantMains();
  }, []);

  const validationSchema = Yup.object({
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date().required("End date is required").min(
      Yup.ref("startDate"),
      "End date cannot be earlier than start date"
    ),
  });

  const formik = useFormik({
    initialValues: {
      startDate: "", // Initialize with empty string or current date
      endDate: "", // Initialize with empty string or current date
      price: 0, // Initialize price
      isCurrentPrice: false, // Default value for isCurrentPrice
      productVariantMainId:0
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
       
      };
      console.log("Form Data Submitted:", formData);

      // Commented API call
      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/ProductPricePolicy/SaveProductPricePolicy",
          method: "POST",
          data: formData,
        });

        if (response?.status === 200) {
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
          if (typeof props.onclick === "function") {
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

  const handleModalClose = () => {
    formik.resetForm();
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#CreateProductPricePolicyModal"
        ref={props.open}
      >
        Create ProductPricePolicy
      </button>

      <div
        className="modal fade"
        id="CreateProductPricePolicyModal"
        tabIndex="-1"
        aria-labelledby="CreateProductPricePolicyModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateProductPricePolicyModalLabel">
                Create Product Price Policy
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
                  <label htmlFor="startDate" className="form-label">
                    Start Date
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    value={formik.values.startDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.startDate && formik.errors.startDate && (
                    <div className="text-danger">{formik.errors.startDate}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">
                    End Date
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="endDate"
                    name="endDate"
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.endDate && formik.errors.endDate && (
                    <div className="text-danger">{formik.errors.endDate}</div>
                  )}
                </div>


                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.price && formik.errors.price && (
                    <div className="text-danger">{formik.errors.price}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="isCurrentPrice" className="form-label">
                    Is Current Price
                  </label>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isCurrentPrice"
                    name="isCurrentPrice"
                    checked={formik.values.isCurrentPrice}
                    onChange={(e) => formik.setFieldValue("isCurrentPrice", e.target.checked)}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.isCurrentPrice && formik.errors.isCurrentPrice && (
                    <div className="text-danger">{formik.errors.isCurrentPrice}</div>
                  )}
                </div>

                <div className="form-group mt-3">
                  <label>Product Variant Main</label>
                  <select
                    name="productVariantMainId"
                    className="form-control"
                    value={formik.values.productVariantMainId}
                    onChange={(e) => {
                    
                      formik.setFieldValue(
                        "productVariantMainId",
                        Number(e.target.value)
                      );
                    }}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Product Variant Main</option>
                    {Array.isArray(productVariantMains) && productVariantMains.length > 0? (
                    
                    productVariantMains.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        {variant.name} {/* Display name */}
                      </option>
                    ))
                    ) : (
                      <option value="">No Product Variant Main available</option>
                      )
                                        }
                  </select>
                  {formik.touched.productVariantMainId &&
                  formik.errors.productVariantMainId ? (
                    <div className="text-danger">
                      {formik.errors.productVariantMainId}
                    </div>
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

export default CreateProductPricePolicy;

