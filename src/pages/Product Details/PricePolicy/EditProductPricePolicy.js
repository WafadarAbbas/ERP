import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";
 


const EditProductPricePolicy = (props) => {

  const { selectedProductPricePolicyId } = props;

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
      startDate: "", 
      endDate: "",  
      price: 0, 
      isCurrentPrice: false, 
      productVariantMainId:0
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
       
      const selectedproductVariantMains = productVariantMains.find(
        (variant) => variant.id === values.productVariantMainId
      );

      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
        branchId:1,
        productName : selectedproductVariantMains?.name || null,
        id:selectedProductPricePolicyId,
      };
      console.log(formData);

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/ProductPricePolicy/UpdateProductPricePolicy",
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
          if (typeof props.onIdReset === "function") {
            props.onIdReset();
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
  const fetchProductPricePolicy = async () => {
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/ProductPricePolicy/GetProductPricePolicyByIdQuery/GetById/${selectedProductPricePolicyId}?organizationId=1&companyId=1`,
        method: "GET",
      });

      if (response && response.data && response.data.length > 0) {
        const ProductPricePolicy = response.data[0];
        
        
        formik.setValues({
          
          startDate: ProductPricePolicy.startDate || "",
          endDate: ProductPricePolicy.endDate || "",
          price: ProductPricePolicy.price || "",
          isCurrentPrice: ProductPricePolicy.isCurrentPrice|| "",
          productVariantMainId: ProductPricePolicy.productVariantMainId || "",
          
    
        });
      } else {
        console.error("Failed to load Product Price data.");
      }
    } catch (error) {
      console.error("Error fetching Product Price:", error.message);
    }
  };

  if (selectedProductPricePolicyId) {
    fetchProductPricePolicy();
  }
}, [selectedProductPricePolicyId]);


 

    return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#EditProductPricePolicyModal"
        ref={props.open}
      >
        Edit ProductPricePolicy
      </button>

      <div
        className="modal fade"
        id="EditProductPricePolicyModal"
        tabIndex="-1"
        aria-labelledby="EditProductPricePolicyModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditProductPricePolicyModalLabel">
                Edit Main
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

export default EditProductPricePolicy;