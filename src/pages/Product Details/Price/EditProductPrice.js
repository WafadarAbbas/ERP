import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";
 

const EditProductPrice = (props) => {
  const { selectedProductPriceId } = props;
  
  console.log(selectedProductPriceId);
  

  const validationSchema = Yup.object({
    storeId: Yup.number()
      .required("Store ID is required")
      .min(1, "Store ID must be greater than 0"),
    PriceQuantity: Yup.number()
      .required("Price Quantity is required")
      .min(1, "Price Quantity must be greater than 0"),
    productRate: Yup.number()
      .required("Product Rate is required")
      .min(0, "Product Rate cannot be negative"),
      productAmount: Yup.number()
  .required("Product Amount is required")
  .min(0, "Product Amount cannot be negative"),
productVariantMainId: Yup.number()
  .required("Product Variant Main ID is required")
  .min(1, "Product Variant Main ID must be greater than 0"),
  productBatchId: Yup.number()
  .required("Product Batch ID is required")
  .min(1, "Product Batch ID must be greater than 0"),
  });

  const formik = useFormik({
    initialValues: {
      storeId: null,
      PriceQuantity: null,
      productRate: null,
      productAmount: null,
      productVariantMainId: null,
      productBatchId: null, // New field
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
        id:selectedProductPriceId,
      };
      console.log(formData);

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/ProductPrice/UpdateProductPrice",
          method: "PUT",
          data: formData,
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire({
            title: "Success!",
            text: "Product Price saved successfully.",
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
          throw new Error("Failed to save the product Price");
        }
      } catch (error) {
        console.error("Error during product Price save:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "An error occurred while saving the product Price",
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
  const fetchProductPrice = async () => {
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/ProductPrice/GetProductPriceByIdQuery/GetById/${selectedProductPriceId}?organizationId=1&companyId=1`,
        method: "GET",
      });

      if (response && response.data && response.data.length > 0) {
        const productPrice = response.data[0];
        
        
        formik.setValues({
          
          storeId: productPrice.storeId || "",
          PriceQuantity: productPrice.PriceQuantity || "",
          productRate: productPrice.productRate || "",
          productAmount: productPrice.productAmount || "",
          productVariantMainId: productPrice.productVariantMainId || "",
          productBatchId: productPrice.productBatchId || "",
    
        });
      } else {
        console.error("Failed to load Product Price data.");
      }
    } catch (error) {
      console.error("Error fetching Product Price:", error.message);
    }
  };

  if (selectedProductPriceId) {
    fetchProductPrice();
  }
}, [selectedProductPriceId]);

    return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#EditProductPriceModal"
        ref={props.open}
      >
        Edit ProductPrice
      </button>

      <div
        className="modal fade"
        id="EditProductPriceModal"
        tabIndex="-1"
        aria-labelledby="EditProductPriceModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditProductPriceModalLabel">
                Edit Product Price
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
                {/* Store ID field */}
                <div className="mb-3">
                  <label htmlFor="storeId" className="form-label">
                    Store ID
                  </label>
                  <input
                    type="number"
                    className={`form-control ${formik.touched.storeId && formik.errors.storeId ? "is-invalid" : ""}`}
                    id="storeId"
                    name="storeId"
                    value={formik.values.storeId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.storeId && formik.errors.storeId && (
                    <div className="invalid-feedback">{formik.errors.storeId}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="PriceQuantity" className="form-label">
                    Price Quantity
                  </label>
                  <input
                    type="number"
                    className={`form-control ${formik.touched.PriceQuantity && formik.errors.PriceQuantity ? "is-invalid" : ""}`}
                    id="PriceQuantity"
                    name="PriceQuantity"
                    value={formik.values.PriceQuantity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.PriceQuantity && formik.errors.PriceQuantity && (
                    <div className="invalid-feedback">{formik.errors.PriceQuantity}</div>
                  )}
                </div>

                {/* Product Rate Field */}
                <div className="mb-3">
                  <label htmlFor="productRate" className="form-label">
                    Product Rate
                  </label>
                  <input
                    type="number"
                    className={`form-control ${formik.touched.productRate && formik.errors.productRate ? "is-invalid" : ""}`}
                    id="productRate"
                    name="productRate"
                    value={formik.values.productRate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.productRate && formik.errors.productRate && (
                    <div className="invalid-feedback">{formik.errors.productRate}</div>
                  )}
                </div>
                <div className="mb-3">
  <label htmlFor="productAmount" className="form-label">
    Product Amount
  </label>
  <input
    type="number"
    className={`form-control ${formik.touched.productAmount && formik.errors.productAmount ? "is-invalid" : ""}`}
    id="productAmount"
    name="productAmount"
    value={formik.values.productAmount}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.touched.productAmount && formik.errors.productAmount && (
    <div className="invalid-feedback">{formik.errors.productAmount}</div>
  )}
</div>

{/* Product Variant Main ID Field */}
<div className="mb-3">
  <label htmlFor="productVariantMainId" className="form-label">
    Product Variant Main ID
  </label>
  <input
    type="number"
    className={`form-control ${formik.touched.productVariantMainId && formik.errors.productVariantMainId ? "is-invalid" : ""}`}
    id="productVariantMainId"
    name="productVariantMainId"
    value={formik.values.productVariantMainId}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.touched.productVariantMainId && formik.errors.productVariantMainId && (
    <div className="invalid-feedback">{formik.errors.productVariantMainId}</div>
  )}
</div>
<div className="mb-3">
  <label htmlFor="productBatchId" className="form-label">
    Product Batch ID
  </label>
  <input
    type="number"
    className={`form-control ${formik.touched.productBatchId && formik.errors.productBatchId ? "is-invalid" : ""}`}
    id="productBatchId"
    name="productBatchId"
    value={formik.values.productBatchId}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.touched.productBatchId && formik.errors.productBatchId && (
    <div className="invalid-feedback">{formik.errors.productBatchId}</div>
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

export default EditProductPrice;