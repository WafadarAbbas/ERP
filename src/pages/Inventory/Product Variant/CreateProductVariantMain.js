import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";

const CreateProductVariantMain = (props) => {
 
  
 
 
  const formik = useFormik({
    initialValues: {
      productName: "",
      productCode: "",
      productVendorCode: "",
      productSku: "",
      productId: "", // New field for selected product ID
      isRawMaterial: false,  
      isSingleBranch: false,  
    },
    validationSchema: Yup.object({
      // productName: Yup.string().required("Product Name is required"),
      // productCode: Yup.string().required("Product Code is required"),
      // productVendorCode: Yup.string().required("Vendor Code is required"),
      // productSku: Yup.string().required("Product SKU is required"),
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
          url: "http://localhost:5022/api/v1/ProductVariantMain/SaveProductVariant",
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
        setProducts(response.data); // Save product list to state
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

    // Fetch HS Codes
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

    // Fetch Product Manufacturers
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
        data-bs-target="#CreateProductVariantMainModal"
        ref={props.open}
      >
        Create Product ProductVariantMain
      </button>

    
      <div
        className="modal fade"
        id="CreateProductVariantMainModal"
        tabIndex="-1"
        aria-labelledby="CreateProductVariantMainModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateProductVariantMainModalLabel">
                Create Product ProductVariantMain
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
                    <div className="text-danger">{formik.errors.productName}</div>
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
                    <div className="text-danger">{formik.errors.productCode}</div>
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
                  {formik.touched.productVendorCode && formik.errors.productVendorCode && (
                    <div className="text-danger">{formik.errors.productVendorCode}</div>
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
                    <div className="text-danger">{formik.errors.productSku}</div>
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
    formik.setFieldValue(name, Number(value)); // Ensure value is saved as a number
  }}
  onBlur={formik.handleBlur}
>
  <option value="">Select Product</option>
  {products.map((product) => (
    <option key={product.id} value={product.id}>
      {product.name}
    </option>
  ))}
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
          onChange={(e) => formik.setFieldValue("measuringUnitsId", Number(e.target.value))}
          onBlur={formik.handleBlur}
        >
          <option value="">Select Measuring Unit</option>
          {measuringUnits.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.name}
            </option>
          ))}
        </select>
      </div>

      {/* HS Code Select Field */}
      <div className="form-group mb-3">
        <label>HS Code</label>
        <select
          name="hsCodeId"
          className="form-control"
          value={formik.values.hsCodeId}
          onChange={(e) => formik.setFieldValue("hsCodeId", Number(e.target.value))}
          onBlur={formik.handleBlur}
        >
          <option value="">Select HS Code</option>
          {hsCodes.map((hs) => (
            <option key={hs.id} value={hs.id}>
              {hs.name}
            </option>
          ))}
        </select>
      </div>

      {/* Product Manufacturer Select Field */}
      <div className="form-group mb-3">
        <label>Product Manufacturer</label>
        <select
          name="productManufacturerId"
          className="form-control"
          value={formik.values.productManufacturerId}
          onChange={(e) => formik.setFieldValue("productManufacturerId", Number(e.target.value))}
          onBlur={formik.handleBlur}
        >
          <option value="">Select Manufacturer</option>
          {manufacturers.map((manufacturer) => (
            <option key={manufacturer.id} value={manufacturer.id}>
              {manufacturer.name}
            </option>
          ))}
        </select>
      </div>

      <div className='form-group form-check mt-3
  '>
    <input
      type='checkbox'
      name='isSingleBranch'
      className='form-check-input'
      checked={formik.values.isSingleBranch}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    <label className='form-check-label'> Single Branch </label>
  </div>

  
  <div className='form-group form-check mt-3'>
    <input
      type='checkbox'
      name='isRawMaterial'
      className='form-check-input'
      checked={formik.values.isRawMaterial}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    <label className='form-check-label'>Is Raw Material?</label>
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

export default CreateProductVariantMain;
