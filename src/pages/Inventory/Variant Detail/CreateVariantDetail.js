import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";

const CreateVariantDetail = (props) => {
  const [products, setProducts] = useState([]); // State to store fetched products

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/Product/GetProductBoxItems/combobox?organizationId=1&companyId=1",
          method: "GET",
        });
        setProducts(response.data);  
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  
  const formik = useFormik({
    initialValues: {
      variantDetailsName: "",
      productId: "",  
      productName: "", 
    },
    validationSchema: Yup.object({
      variantDetailsName: Yup.string().required("Variant detail name is required"),
      productId: Yup.string().required("Product selection is required"),
    }),
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
      };

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/VariantDetails/SaveVariantDetails",
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
        data-bs-target="#CreateVariantDetailModal"
        ref={props.open}
      >
        Create Product VariantDetail
      </button>

 
      <div
        className="modal fade"
        id="CreateVariantDetailModal"
        tabIndex="-1"
        aria-labelledby="CreateVariantDetailModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateVariantDetailModalLabel">
                Create Product VariantDetail
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
           
                <div className="form-group mb-3">
                  <label>Variant Detail Name</label>
                  <input
                    type="text"
                    name="variantDetailsName"
                    className="form-control"
                    value={formik.values.variantDetailsName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.variantDetailsName && formik.errors.variantDetailsName && (
                    <div className="text-danger">{formik.errors.variantDetailsName}</div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label>Select Product</label>
                  <select
                    name="productId"
                    className="form-control"
                    value={formik.values.productId}
                    onChange={(e) => {
                      const selectedProduct = products.find(
                        (product) => product.id === Number(e.target.value)
                      );
                      formik.setFieldValue("productId", selectedProduct?.id || "");
                      formik.setFieldValue("productName", selectedProduct?.name || "");
                    }}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Product</option>
                    {Array.isArray(products) && products.length > 0 ? (
                      products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))
                    ) : (
                      <option value="">No products available</option>
                    )}
                  </select>
                  {formik.touched.productId && formik.errors.productId && (
                    <div className="text-danger">{formik.errors.productId}</div>
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

export default CreateVariantDetail;
