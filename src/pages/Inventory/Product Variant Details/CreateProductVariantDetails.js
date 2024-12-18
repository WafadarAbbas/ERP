import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";

const CreateProductVariantDetails = (props) => {
  const formik = useFormik({
    initialValues: {
      productVariantDetailsName: "",
      variantDetailsDescription: "",
      variantDetailsId: "",
    },
    validationSchema: Yup.object({
      productVariantDetailsName: Yup.string()
        .required("Product Variant Details Name is required")
        .max(100, "Must be 100 characters or less"),
      variantDetailsDescription: Yup.string()
        .required("Variant Details Description is required")
        .max(255, "Must be 255 characters or less"),
    }),
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
      };

      console.log(formData);

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/ProductVariantDetails/SaveProductVariantDetails",
          method: "POST",
          data: formData,
        });

        if (response?.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "Product Variant Detail saved successfully.",
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
          throw new Error("Failed to save the product Variant Detail");
        }
      } catch (error) {
        console.error("Error during product Variant Detail save:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "An error occurred while saving the product Variant Detail",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Close",
        });
      }
    },
  });

  const [variantDetails, setVariantDetails] = useState([]);
  const [productVariantMains, setProductVariantMains] = useState([]);

  const fetchVariantDetails = async () => {
    try {
      const response = await ApiCall({
        url: "http://localhost:5022/api/v1/VariantDetails/GetVariantDetailsBoxItems/combobox?organizationId=1&companyId=1",
        method: "GET",
      });
      setVariantDetails(response.data);
    } catch (error) {
      console.error("Error fetching variant details:", error);
    }
  };

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
    fetchVariantDetails();
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
        data-bs-target="#CreateProductVariantDetailsModal"
        ref={props.open}
      >
        Create Product ProductVariantDetails
      </button>

      <div
        className="modal fade"
        id="CreateProductVariantDetailsModal"
        tabIndex="-1"
        aria-labelledby="CreateProductVariantDetailsModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="CreateProductVariantDetailsModalLabel"
              >
                Create Product ProductVariantDetails
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleModalClose}
                ref={props.close}
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label>Product Variant Details Name</label>
                  <input
                    type="text"
                    name="productVariantDetailsName"
                    className="form-control"
                    value={formik.values.productVariantDetailsName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.productVariantDetailsName &&
                    formik.errors.productVariantDetailsName && (
                      <div className="text-danger">
                        {formik.errors.productVariantDetailsName}
                      </div>
                    )}
                </div>

                <div className="form-group mt-3">
                  <label>Variant Details Description</label>
                  <textarea
                    name="variantDetailsDescription"
                    className="form-control"
                    value={formik.values.variantDetailsDescription}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.variantDetailsDescription &&
                    formik.errors.variantDetailsDescription && (
                      <div className="text-danger">
                        {formik.errors.variantDetailsDescription}
                      </div>
                    )}
                </div>

                <div className="form-group">
                  <label>Variant Detail</label>
                  <select
                    name="variantDetailsId"
                    className="form-control"
                    value={formik.values.variantDetailsId}
                    onChange={(e) => {
                      formik.setFieldValue(
                        "variantDetailsId",
                        Number(e.target.value)
                      );
                    }}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Variant Detail</option>
                    {Array.isArray(variantDetails) && variantDetails.length > 0 ?(

                    variantDetails.map((detail) => (
                      <option key={detail.id} value={detail.id}>
                        {detail.name}
                      </option>
                    ))
                  ) : (
                    <option value="">No Variant Details Available</option>
                  )
                  }
                  </select>
                  {formik.touched.variantDetailsId &&
                  formik.errors.variantDetailsId ? (
                    <div className="text-danger">
                      {formik.errors.variantDetailsId}
                    </div>
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
                    {Array.isArray(productVariantMains) && productVariantMains.length > 0 ?(
                    productVariantMains.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        {variant.name} {/* Display name */}
                      </option>
                    ))
                    ) : (
                      <option value="">No Product Variant Main found</option>
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

export default CreateProductVariantDetails;
