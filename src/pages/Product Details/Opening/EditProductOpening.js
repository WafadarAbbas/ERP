import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";
 

const EditProductOpening = (props) => {
  const { selectedProductOpeningId } = props;
  

  const validationSchema = Yup.object({
  
  });

  const formik = useFormik({
    initialValues: {
 
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      const selectedProductVariantMain = productVariantMains.find(
        (variant) => variant.id === values.productVariantMainId
      );
      const selectedBatchCode = productBatches.find(
        (batch) => batch.id === values.productBatchId
      );


      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
        productName: selectedProductVariantMain?.name || null,
        productBatchCode:selectedBatchCode?.name || null,
        id:selectedProductOpeningId,
      };
      console.log(formData);

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/ProductOpening/UpdateProductOpening",
          method: "PUT",
          data: formData,
        });

        if (response?.status === 200  ) {
          Swal.fire({
            title: "Success!",
            text: "Product Opening saved successfully.",
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
          throw new Error("Failed to save the product Opening");
        }
      } catch (error) {
        console.error("Error during product Opening save:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "An error occurred while saving the product Opening",
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
  const fetchProductOpening = async () => {
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/ProductOpening/GetProductOpeningByIdQuery/GetById/${selectedProductOpeningId}?organizationId=1&companyId=1`,
        method: "GET",
      });

      if (response && response.data && response.data.length > 0) {
        const productOpening = response.data[0];
        
        
        formik.setValues({
          
          storeId: productOpening.storeId || "",
          openingQuantity: productOpening.openingQuantity || "",
          productRate: productOpening.productRate || "",
          productAmount: productOpening.productAmount || "",
          productVariantMainId: productOpening.productVariantMainId || "",
          productBatchId: productOpening.productBatchId || "",
    
        });
      } else {
        console.error("Failed to load Product Opening data.");
      }
    } catch (error) {
      console.error("Error fetching Product Opening:", error.message);
    }
  };

  if (selectedProductOpeningId) {
    fetchProductOpening();
  }
}, [selectedProductOpeningId]);

const [productVariantMains, setProductVariantMains] = useState([]);
const [productBatches, setProductBatches] = useState([]);  
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
const fetchProductBatches = async () => {
  try {
    const response = await ApiCall({
      url: "http://localhost:5022/api/v1/ProductBatch/GetProductBatchBoxItems/combobox?organizationId=1&companyId=1",
      method: "GET",
    });
    setProductBatches(response.data);
  } catch (error) {
    console.error("Error fetching product batches:", error);
  }
};

  useEffect(() => {
    fetchProductVariantMains();
    fetchProductBatches();
  }, []);

    return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#EditProductOpeningModal"
        ref={props.open}
      >
        Edit ProductOpening
      </button>

      <div
        className="modal fade"
        id="EditProductOpeningModal"
        tabIndex="-1"
        aria-labelledby="EditProductOpeningModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditProductOpeningModalLabel">
                Edit Product Opening
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
                  <label htmlFor="openingQuantity" className="form-label">
                    Opening Quantity
                  </label>
                  <input
                    type="number"
                    className={`form-control ${formik.touched.openingQuantity && formik.errors.openingQuantity ? "is-invalid" : ""}`}
                    id="openingQuantity"
                    name="openingQuantity"
                    value={formik.values.openingQuantity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.openingQuantity && formik.errors.openingQuantity && (
                    <div className="invalid-feedback">{formik.errors.openingQuantity}</div>
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
                    {Array.isArray(productVariantMains) && productVariantMains.length > 0 ? (
                    productVariantMains.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        {variant.name} {/* Display name */}
                      </option>
                    ))
                  ) : ( 
                    <option value="">No Product Variant Mains Available</option>
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
                <div className="form-group mt-3">
  <label>Product Batch</label>
  <select
    name="productBatchId"
    className="form-control"
    value={formik.values.productBatchId}
    onChange={(e) => {
      formik.setFieldValue("productBatchId", Number(e.target.value));
    }}
    onBlur={formik.handleBlur}
  >
    <option value="">Select Product Batch</option>
    {Array.isArray(productBatches) && productBatches.length > 0 ? (
      productBatches.map((batch) => (
        <option key={batch.id} value={batch.id}>
          {batch.name}  
        </option>
      ))
    ) : (
      <option value="">No Product Batches Available</option>
    )}
  </select>
  {formik.touched.productBatchId && formik.errors.productBatchId ? (
    <div className="text-danger">{formik.errors.productBatchId}</div>
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

export default EditProductOpening;