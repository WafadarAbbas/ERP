import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";

const CreateVariantDetail = (props) => {
  const [products, setProducts] = useState([]); // State to store fetched products

  // Fetch products from the API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/Product/GetProductBoxItems/combobox?organizationId=1&companyId=1",
          method: "GET",
        });
        setProducts(response.data); // Assuming response.data is the array
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      variantDetailsName: "",
      productId: "",  // To store selected product ID
      productName: "", // To store selected product Name
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
      {/* Modal Trigger Button */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#CreateVariantDetailModal"
        ref={props.open}
      >
        Create Product VariantDetail
      </button>

      {/* Modal */}
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
                {/* Variant Details Name Field */}
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

                {/* Product Select Field */}
                <div className="form-group mb-3">
                  <label>Select Product</label>
                  <select
                    name="productId"
                    className="form-control"
                    value={formik.values.productId}
                    onChange={(e) => {
                      const selectedProduct = products.find(product => product.id === Number(e.target.value));
                      formik.setFieldValue("productId", selectedProduct.id);
                      formik.setFieldValue("productName", selectedProduct.name); // Save name too
                    }}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} {/* Display product name */}
                      </option>
                    ))}
                  </select>
                  {formik.touched.productId && formik.errors.productId && (
                    <div className="text-danger">{formik.errors.productId}</div>
                  )}
                </div>

                {/* Modal Footer */}
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
