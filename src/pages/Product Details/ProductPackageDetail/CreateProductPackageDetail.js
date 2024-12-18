import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";

const CreateProductPackageDetail = (props) => {
 
  const [productVariantMains, setProductVariantMains] = useState([]);

  const validationSchema = Yup.object({
    productPrice: Yup.number()
      .required("Product price is required")
      .positive("Product price must be a positive number")
      .min(1, "Product price must be at least 1"),
  });

  const formik = useFormik({
    initialValues: {
      productPrice: "",
      productVariantMainId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
     
      };

      console.log(formData);
      


       
      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/ProductPackageDetail/SaveProductPackageDetail",
          method: "POST",
          data: formData,
        });

        if (response?.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "Product Package saved successfully.",
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
          throw new Error("Failed to save the product package");
        }
      } catch (error) {
        console.error("Error during product package save:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "An error occurred while saving the product package",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Close",
        });
      }
    
    },
  });


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
  
  useEffect(() => {
    formik.resetForm();
  }, [props.open]);

  const handleModalClose = () => {
    formik.resetForm();
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#CreateProductPackageDetailModal"
        ref={props.open}
      >
        Create Product Package
      </button>

      <div
        className="modal fade"
        id="CreateProductPackageDetailModal"
        tabIndex="-1"
        aria-labelledby="CreateProductPackageDetailModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateProductPackageDetailModalLabel">
                Create Product Package
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
                  <label htmlFor="productPrice" className="form-label">
                    Product Price
                  </label>
                  <input
                    type="number"
                    className={`form-control ${formik.touched.productPrice && formik.errors.productPrice ? "is-invalid" : ""}`}
                    id="productPrice"
                    name="productPrice"
                    value={formik.values.productPrice}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.productPrice && formik.errors.productPrice ? (
                    <div className="invalid-feedback">{formik.errors.productPrice}</div>
                  ) : null}
                </div>
                <div className="form-group mt-3">
                  <label>Product Variant Main</label>
                  <select
                    name="productVariantMainId"
                    className="form-control"
                    value={formik.values.productVariantMainId}
                    onChange={(e) => {
                      // Convert the value to a number and update Formik state
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
                      <option value="">No product variant mains found</option>
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

export default CreateProductPackageDetail;

