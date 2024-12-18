import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";

const EditProductVariantMain = (props) => {
  const { selectedProductVariantMainId } = props;


  const validationSchema = Yup.object({
 
  });

  const [products, setProducts] = useState([]); // State to store fetched products
  const [measuringUnits, setMeasuringUnits] = useState([]);
  const [hsCodes, setHsCodes] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

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

  const fetchMeasuringUnits = async () => {
    try {
      const response = await ApiCall({
        url: "http://localhost:5022/api/v1/MeasuringUnits/GetMeasuringUnitsBoxItems/combobox?organizationId=1&companyId=1",
        method: "GET",
      });
      setMeasuringUnits(response.data);
    } catch (error) {
      console.error("Error fetching measuring units:", error);
    }
  };

   
  const fetchHsCodes = async () => {
    try {
      const response = await ApiCall({
        url: "http://localhost:5022/api/v1/HSCode/GetHSCodeBoxItems/combobox?organizationId=1&companyId=1",
        method: "GET",
      });
      setHsCodes(response.data);
    } catch (error) {
      console.error("Error fetching HS codes:", error);
    }
  };

   
  const fetchManufacturers = async () => {
    try {
      const response = await ApiCall({
        url: "http://localhost:5022/api/v1/ProductManufacturer/GetProductManufacturerBoxItems/combobox?organizationId=1&companyId=1",
        method: "GET",
      });
      setManufacturers(response.data);
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchMeasuringUnits();
    fetchHsCodes();
    fetchManufacturers();
  }, []);


  const formik = useFormik({
    initialValues: {
      productName: "",
      productCode: "",
      productVendorCode: "",
      productSku: "",
      productId: "",  
      measuringUnitsId:"",
      hsCodeId:"",
      productManufacturerId:"",
      isRawMaterial: false,
      isSingleBranch: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      const selectedproduct_Name = products.find(
        (product) => product.id === values.productId
      );
      const selectedmeasuringUnitsName = measuringUnits.find(
        (unit) => unit.id === values.measuringUnitsId
      );
      const selectedHSCode = hsCodes.find(
        (hs) => hs.id === values.hsCodeId  
      );
      const selectedManufacturer = manufacturers.find(
        (manufacturer) => manufacturer.id === values.productManufacturerId 
      );
      const formData = {
        ...values,
        organizationId: 1,
        companyId: 1,
        branchId:1,
       
        product_Name: selectedproduct_Name?.name || null,
        measuringUnitsName:selectedmeasuringUnitsName?.name || null,
        hsCodeName1: selectedHSCode?.name || null, 
        manfacturerName: selectedManufacturer?.name || null,  
        id: selectedProductVariantMainId,
      };
      console.log("Form Data:", formData);
   

      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/ProductVariantMain/UpdateProductVariantMain",
          method: "PUT",
          data: formData,
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire({
            title: "Success!",
            text: " Product Variant Main Updated successfully.",
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
          url: `http://localhost:5022/api/v1/ProductVariantMain/GetProductVariantMainByIdQuery/GetById/${selectedProductVariantMainId}?organizationId=1&companyId=1`,
          method: "GET",
        });

        if (response && response.data && response.data.length > 0) {
          const ProductVariantMain = response.data[0];

          formik.setValues({
            productName: ProductVariantMain.productName || "",
            productCode: ProductVariantMain.productCode || "",
            productVendorCode: ProductVariantMain.productVendorCode|| "",
            productSku: ProductVariantMain.productSku|| "",
            productId: ProductVariantMain.productId|| "",  
            measuringUnitsId:ProductVariantMain.measuringUnitsId|| "",
            hsCodeId:ProductVariantMain.hsCodeId|| "",
            productManufacturerId:ProductVariantMain.productManufacturerId|| "",
            isRawMaterial: ProductVariantMain.isRawMaterial || false,
            isSingleBranch: ProductVariantMain.isSingleBranch || false,
           
          });
        } else {
          console.error("Failed to load Product ProductVariantMain data.");
        }
      } catch (error) {
        console.error(
          "Error fetching Product ProductVariantMain:",
          error.message
        );
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
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    className="form-control"
                    value={formik.values.productName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.productName && formik.errors.productName && (
                    <div className="text-danger">
                      {formik.errors.productName}
                    </div>
                  )}
                </div>

                {/* Product Code Field */}
                <div className="form-group mb-3">
                  <label>Product Code</label>
                  <input
                    type="text"
                    name="productCode"
                    className="form-control"
                    value={formik.values.productCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.productCode && formik.errors.productCode && (
                    <div className="text-danger">
                      {formik.errors.productCode}
                    </div>
                  )}
                </div>

                {/* Vendor Code Field */}
                <div className="form-group mb-3">
                  <label>Vendor Code</label>
                  <input
                    type="text"
                    name="productVendorCode"
                    className="form-control"
                    value={formik.values.productVendorCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.productVendorCode &&
                    formik.errors.productVendorCode && (
                      <div className="text-danger">
                        {formik.errors.productVendorCode}
                      </div>
                    )}
                </div>

                {/* Product SKU Field */}
                <div className="form-group mb-3">
                  <label>Product SKU</label>
                  <input
                    type="text"
                    name="productSku"
                    className="form-control"
                    value={formik.values.productSku}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.productSku && formik.errors.productSku && (
                    <div className="text-danger">
                      {formik.errors.productSku}
                    </div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label>Product</label>
                  <select
                    name="productId"
                    className="form-control"
                    value={formik.values.productId}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      formik.setFieldValue(name, Number(value));  
                    }}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Product</option>
                    {Array.isArray(products) && products.length >0 ?(
                    products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))
                    ) : (
                      <option value="">No products available</option>
                      )

                  }
                  </select>
                  {formik.touched.productId && formik.errors.productId && (
                    <div className="text-danger">{formik.errors.productId}</div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label>Measuring Unit</label>
                  <select
                    name="measuringUnitsId"
                    className="form-control"
                    value={formik.values.measuringUnitsId}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "measuringUnitsId",
                        Number(e.target.value)
                      )
                    }
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Measuring Unit</option>

{Array.isArray(measuringUnits) && measuringUnits.length > 0 ? (

                    measuringUnits.map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name}
                      </option>
                    ))
                    ) : (
                      <option value="">No measuring units available</option>

                    )
                  
                  }
                  </select>
                </div>

                {/* HS Code Select Field */}
                <div className="form-group mb-3">
                  <label>HS Code</label>
                  <select
                    name="hsCodeId"
                    className="form-control"
                    value={formik.values.hsCodeId}
                    onChange={(e) =>
                      formik.setFieldValue("hsCodeId", Number(e.target.value))
                    }
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select HS Code</option>
                    {Array.isArray(hsCodes) && hsCodes.length > 0 ? (
                      
                    hsCodes.map((hs) => (
                      <option key={hs.id} value={hs.id}>
                        {hs.name}
                      </option>
                    ))
                    ) : (
                      <option value="">No HS Codes available</option>
                    )
                      
                  }
                  </select>
                </div>

                 
                <div className="form-group mb-3">
                  <label>Product Manufacturer</label>
                  <select
                    name="productManufacturerId"
                    className="form-control"
                    value={formik.values.productManufacturerId}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "productManufacturerId",
                        Number(e.target.value)
                      )
                    }
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Manufacturer</option>
                    {Array.isArray(manufacturers) && manufacturers.length > 0 ?(

                    manufacturers.map((manufacturer) => (
                      <option key={manufacturer.id} value={manufacturer.id}>
                        {manufacturer.name}
                      </option>
                    ))
                    ) : (
                    
                      <option value="">No Manufacturers available</option>
                    )
                  
                  }
                  </select>
                </div>

                <div
                  className="form-group form-check mt-3"
                >
                  <input
                    type="checkbox"
                    name="isSingleBranch"
                    className="form-check-input"
                    checked={formik.values.isSingleBranch}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className="form-check-label"> Single Branch </label>
                </div>

                <div className="form-group form-check mt-3">
                  <input
                    type="checkbox"
                    name="isRawMaterial"
                    className="form-check-input"
                    checked={formik.values.isRawMaterial}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className="form-check-label">Is Raw Material?</label>
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
                  <button type="submit" className="btn" style={{ backgroundColor: "#ff9f43", color: "white" }}>
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
