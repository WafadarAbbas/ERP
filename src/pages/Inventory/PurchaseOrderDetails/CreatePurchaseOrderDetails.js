import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";

const CreatePurchaseOrderDetails = (props) => {
  const validationSchema = Yup.object({
    poQuantity: Yup.number()
      .required("PO Quantity is required")
      .min(0, "PO Quantity must be at least 0"),
    grnQuantity: Yup.number()
      .required("GRN Quantity is required")
      .min(0, "GRN Quantity must be at least 0"),
    poBalanceQuantity: Yup.number()
      .required("PO Balance Quantity is required")
      .min(0, "PO Balance Quantity must be at least 0"),
  });

  const formik = useFormik({
    initialValues: {
      poQuantity: 0,
      grnQuantity: 0,
      poBalanceQuantity: 0,
      grnBatchId: 0,
      grnStoreId: 0,
      measuringUnitsId: "",
      purchaseOrderMainId: "",
      productVariantMainId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const selectedmeasuringUnitsName = measuringUnits.find(
        (unit) => unit.id === values.measuringUnitsId
      );
      const selectedProductVariantMain = productVariantMains.find(
        (variant) => variant.id === values.productVariantMainId
      );

      const selectedPurchaseOrderMain = purchaseOrderMains.find(
        (order) => order.id === values.purchaseOrderMainId
      );
       
      const formData = {
        ...values,
        measuringUnitsName: selectedmeasuringUnitsName?.name || null,
        productName: selectedProductVariantMain?.name || null,
        poNumber: selectedPurchaseOrderMain?.name || null,
        organizationId: 1,
        companyId: 1,
      };
      console.log("Form Data Submitted:", formData); 
  
      try {
        const response = await ApiCall({
          url: "http://localhost:5022/api/v1/PurchseOrderDetails/Save",
          method: "POST",
          data: formData,
        });

        if (response?.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "Purchase Order Detail saved successfully.",
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
          throw new Error("Failed to save the Purchase Order Detail");
        }
      } catch (error) {
        console.error("Error during Purchase Order Detail save:", error);
        Swal.fire({
          title: "Error",
          text: error.message || "An error occurred while saving the Purchase Order Detail",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Close",
        });
      }
       },
  });

  const handleModalClose = () => {
    formik.resetForm();
  };

  const [measuringUnits, setMeasuringUnits] = useState([]);
   const [productVariantMains, setProductVariantMains] = useState([]);
   const [purchaseOrderMains, setPurchaseOrderMains] = useState([]);
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
  const fetchPurchaseOrderMains = async () => {
    try {
      const response = await ApiCall({
        url: "http://localhost:5022/api/v1/PurchaseOrderMain/GetPurchaseOrderMainBoxItems?organizationId=1&companyId=1",
        method: "GET",
      });
      setPurchaseOrderMains(response.data);
    } catch (error) {
      console.error("Error fetching purchase order mains:", error);
    }
  };

  useEffect(() => {
    fetchMeasuringUnits();
    fetchProductVariantMains();
    fetchPurchaseOrderMains();
  }, []);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#CreatePurchaseOrderDetailsModal"
        ref={props.open}
      >
        Create Purchase Order Details
      </button>

      <div
        className="modal fade"
        id="CreatePurchaseOrderDetailsModal"
        tabIndex="-1"
        aria-labelledby="CreatePurchaseOrderDetailsModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="CreatePurchaseOrderDetailsModalLabel"
              >
                Create Purchase Order Details
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
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="poQuantity" className="form-label">
                      PO Quantity
                    </label>
                    <input
                      type="number"
                      id="poQuantity"
                      name="poQuantity"
                      className="form-control"
                      value={formik.values.poQuantity}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.poQuantity && formik.errors.poQuantity && (
                      <div className="text-danger">
                        {formik.errors.poQuantity}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="grnQuantity" className="form-label">
                      GRN Quantity
                    </label>
                    <input
                      type="number"
                      id="grnQuantity"
                      name="grnQuantity"
                      className="form-control"
                      value={formik.values.grnQuantity}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.grnQuantity &&
                      formik.errors.grnQuantity && (
                        <div className="text-danger">
                          {formik.errors.grnQuantity}
                        </div>
                      )}
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="poBalanceQuantity" className="form-label">
                      PO Balance Quantity
                    </label>
                    <input
                      type="number"
                      id="poBalanceQuantity"
                      name="poBalanceQuantity"
                      className="form-control"
                      value={formik.values.poBalanceQuantity}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.poBalanceQuantity &&
                      formik.errors.poBalanceQuantity && (
                        <div className="text-danger">
                          {formik.errors.poBalanceQuantity}
                        </div>
                      )}
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="grnBatchId" className="form-label">
                      GRN Batch ID
                    </label>
                    <input
                      type="number"
                      id="grnBatchId"
                      name="grnBatchId"
                      className="form-control"
                      value={formik.values.grnBatchId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.grnBatchId && formik.errors.grnBatchId && (
                      <div className="text-danger">
                        {formik.errors.grnBatchId}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="grnStoreId" className="form-label">
                      GRN Store ID
                    </label>
                    <input
                      type="number"
                      id="grnStoreId"
                      name="grnStoreId"
                      className="form-control"
                      value={formik.values.grnStoreId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.grnStoreId && formik.errors.grnStoreId && (
                      <div className="text-danger">
                        {formik.errors.grnStoreId}
                      </div>
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

                      {Array.isArray(measuringUnits) &&
                      measuringUnits.length > 0 ? (
                        measuringUnits.map((unit) => (
                          <option key={unit.id} value={unit.id}>
                            {unit.name}
                          </option>
                        ))
                      ) : (
                        <option value="">No measuring units available</option>
                      )}
                    </select>
                  </div>

                  
                <div className="form-group">
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
                        {variant.name} 
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

                <div className="col-md-12">
                    <label htmlFor="purchaseOrderMainId" className="form-label">
                      Purchase Order Main
                    </label>
                    <select
                      id="purchaseOrderMainId"
                      name="purchaseOrderMainId"
                      className="form-control"
                      value={formik.values.purchaseOrderMainId}
                      onChange={(e) =>
                        formik.setFieldValue(
                          "purchaseOrderMainId",
                          Number(e.target.value)
                        )
                      }
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select Purchase Order</option>
                      {Array.isArray(purchaseOrderMains) &&
                      purchaseOrderMains.length > 0 ? (
                        purchaseOrderMains.map((order) => (
                          <option key={order.id} value={order.id}>
                            {order.name}
                          </option>
                        ))
                      ) : (
                        <option value="">No Purchase Orders Available</option>
                      )}
                    </select>
                    {formik.touched.purchaseOrderMainId &&
                      formik.errors.purchaseOrderMainId && (
                        <div className="text-danger">
                          {formik.errors.purchaseOrderMainId}
                        </div>
                      )}
                  </div>



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

export default CreatePurchaseOrderDetails;
