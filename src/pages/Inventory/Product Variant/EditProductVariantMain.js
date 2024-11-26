import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";

const EditProductVariantMain = (props) => {
  const { selectedProductVariantMainId } = props;

  console.log(selectedProductVariantMainId);

  const validationSchema = Yup.object({
    ProductVariantMainsName: Yup.string().required("Variant detail name is required"),
     
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
      ProductVariantMainsName: "",
      productId: "",   
      productName: "",  
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
        id: selectedProductVariantMainId,
      };
      console.log(formData);
 

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/ProductVariantMains/UpdateProductVariantMains",
          method: "PUT",
          data: formData,
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire({
            title: "Success!",
            text: "Product ProductVariantMain saved successfully.",
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
          throw new Error("Failed to save the product ProductVariantMain");
        }
      } catch (error) {
        console.error("Error during product ProductVariantMain save:", error);
        Swal.fire({
          title: "Error",
          text:
            error.message ||
            "An error occurred while saving the product ProductVariantMain",
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
    const fetchProductVariantMain = async () => {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/ProductVariantMains/GetProductVariantMainsByIdQuery/GetById/${selectedProductVariantMainId}?organizationId=1&companyId=1`,
          method: "GET",
        });

        if (response && response.data && response.data.length > 0) {
          const ProductVariantMain = response.data[0];

          formik.setValues({
 
            ProductVariantMainsName: ProductVariantMain.ProductVariantMainsName || "",
            productId: ProductVariantMain.productId ||"",
    
          });
        } else {
          console.error("Failed to load Product ProductVariantMain data.");
        }
      } catch (error) {
        console.error("Error fetching Product ProductVariantMain:", error.message);
      }
    };

    if (selectedProductVariantMainId) {
      fetchProductVariantMain();
    }
  }, [selectedProductVariantMainId]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#EditProductVariantMainModal"
        ref={props.open}
      >
        Edit ProductVariantMain
      </button>

      <div
        className="modal fade"
        id="EditProductVariantMainModal"
        tabIndex="-1"
        aria-labelledby="EditProductVariantMainModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditProductVariantMainModalLabel">
                Edit Product ProductVariantMain
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
                    name="ProductVariantMainsName"
                    className="form-control"
                    value={formik.values.ProductVariantMainsName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.ProductVariantMainsName && formik.errors.ProductVariantMainsName && (
                    <div className="text-danger">{formik.errors.ProductVariantMainsName}</div>
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

export default EditProductVariantMain;
