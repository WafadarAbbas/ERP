import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";

const EditVariantDetail = (props) => {
  const { selectedVariantDetailId } = props;

  const validationSchema = Yup.object({
    variantDetailsName: Yup.string().required("Variant detail name is required"),
     
  });

  const [products, setProducts] = useState([]);  

 
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
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const selectedproductName = products.find(
        (product) => product.id === values.productId
      );

      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
        productName: selectedproductName?.name || null,
        id: selectedVariantDetailId,
      };
      console.log(formData);
 

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/VariantDetails/UpdateVariantDetails",
          method: "PUT",
          data: formData,
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire({
            title: "Success!",
            text: "Product VariantDetail saved successfully.",
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
          throw new Error("Failed to save the product VariantDetail");
        }
      } catch (error) {
        console.error("Error during product VariantDetail save:", error);
      
        if (error.response && error.response.data && error.response.data.errors) {
          const validationErrors = error.response.data.errors;
      
          // Format errors for Swal.fire
          const formattedErrors = Object.entries(validationErrors)
            .map(([field, messages]) => `<b>${field}</b>: ${messages.join(", ")}`)
            .join("<br>");
      
          Swal.fire({
            title: "Validation Errors",
            html: formattedErrors, // Display errors using HTML formatting
            icon: "error",
            confirmButtonColor: "#d33",
            confirmButtonText: "Close",
          });
        } else {
          Swal.fire({
            title: "Error",
            text:
              error.message ||
              "An error occurred while saving the product VariantDetail",
            icon: "error",
            confirmButtonColor: "#d33",
            confirmButtonText: "Close",
          });
        }
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
    const fetchVariantDetail = async () => {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/VariantDetails/GetVariantDetailsByIdQuery/GetById/${selectedVariantDetailId}?organizationId=1&companyId=1`,
          method: "GET",
        });

        if (response && response.data && response.data.length > 0) {
          const VariantDetail = response.data[0];

          formik.setValues({
 
            variantDetailsName: VariantDetail.variantDetailsName || "",
            productId: VariantDetail.productId ||"",
    
          });
        } else {
          console.error("Failed to load Product VariantDetail data.");
        }
      } catch (error) {
        console.error("Error fetching Product VariantDetail:", error.message);
      }
    };

    if (selectedVariantDetailId) {
      fetchVariantDetail();
    }
  }, [selectedVariantDetailId]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#EditVariantDetailModal"
        ref={props.open}
      >
        Edit VariantDetail
      </button>

      <div
        className="modal fade"
        id="EditVariantDetailModal"
        tabIndex="-1"
        aria-labelledby="EditVariantDetailModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditVariantDetailModalLabel">
                Edit Product VariantDetail
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
                      const selectedProduct = products.find(product => product.id === Number(e.target.value));
                      formik.setFieldValue("productId", selectedProduct.id);
                      formik.setFieldValue("productName", selectedProduct.name);  
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
                  )
                  : (
                    <option value="">No products found</option>
                    )
                    
                  
                  }
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

export default EditVariantDetail;
