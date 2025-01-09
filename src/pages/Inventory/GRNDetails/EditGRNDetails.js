import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../../Apicall/ApiCall";

const EditGRNDetails = (props) => {
  const { selectedGRNDetailsId } = props;

  console.log(selectedGRNDetailsId);

  const validationSchema = Yup.object({
      });
      const formik = useFormik({
        initialValues: {
          taxAmount: 0,
          furtherTax: 0,
          discount: 0,
          productDefinitionId: 0,
          product3rdSchedule: true,
          itemCode: "",
          itemName: "",
          fbrProductDesctiptionId: 0,
          fbrProductDesctiptionCode: "",
          batchId: 0,
          storeId: 0,
          fbrMuId: 0,
          muCode: "",
          quantity: 0,
          productPrice: 0,
          amount: 0,
          fbrTaxRateId: 0,
          taxRate: 0,
          furtherTaxAmount: 0,
          valueExclGRNTax: 0,
          discountAmount: 0,
          taxCharged: 0,
          valueIncGRNTax: 0,
          measuringUnitsId: 0,
          productVariantMainId: 0,
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
          const grnDetail = {
            ...values,
            id:selectedGRNDetailsId,
            organizationId: 1,
            companyId: 1,
            grnInvoiceNo: "",
            measuringUnitsName: "",
            productName: "",
          };
          console.log(grnDetail);
          // try {
          //   const response = await ApiCall({
          //     url: "http://localhost:5022/api/v1/GRNDetail/SaveGRNDetail",
          //     method: "POST",
          //     data: grnDetail,
          //   });
    
          //   if (response?.status === 200) {
          //     Swal.fire({
          //       title: "Success!",
          //       text: "GRNDetails saved successfully.",
          //       icon: "success",
          //       confirmButtonColor: "#3085d6",
          //       confirmButtonText: "OK",
          //     });
    
          //     formik.resetForm();
          //     if (props.close && props.close.current) {
          //       props.close.current.click();
          //     }
          //     if (typeof props.onclick === "function") {
          //       props.onclick();
          //     }
          //   } else {
          //     throw new Error("Failed to save the GRNDetails");
          //   }
          // } catch (error) {
          //   console.error("Error during GRNDetails save:", error);
          //   Swal.fire({
          //     title: "Error",
          //     text:
          //       error.message ||
          //       "An error occurred while saving the GRNDetails",
          //     icon: "error",
          //     confirmButtonColor: "#d33",
          //     confirmButtonText: "Close",
          //   });
          // }
    
          resetForm();
        },
      });

  useEffect(() => {
    formik.resetForm();
  }, [props.open]);

  const handleModalClose = () => {
    formik.resetForm();
  };

  useEffect(() => {
    const fetchGRNDetails = async () => {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/GRNDetail/GetyId?id=${selectedGRNDetailsId}&organizationId=1&companyId=1`,
          method: "GET",
        });

        if (response && response.data && response.data.length > 0) {
          const GRNDetails = response.data[0];

          formik.setValues({
 
          });
        } else {
          console.error("Failed to load Product GRNDetails data.");
        }
      } catch (error) {
        console.error("Error fetching Product GRNDetails:", error.message);
      }
    };

    if (selectedGRNDetailsId) {
      fetchGRNDetails();
    }
  }, [selectedGRNDetailsId]);

  const [measuringUnits, setMeasuringUnits] = useState([]);
  const [productVariantMains, setProductVariantMains] = useState([]);
  const [GRNMain, setGRNMain] = useState([]);

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
      console.error("Error fetching GRN main:", error);
    }
  };
  const fetchGRNMain = async () => {
    try {
      const response = await ApiCall({
        url: "http://localhost:5022/api/v1/GRNMain/GetGRNMainBoxItems?organizationId=1&companyId=1",
        method: "GET",
      });
      setGRNMain(response.data);
    } catch (error) {
      console.error("Error fetching GRN main:", error);
    }
  };

  useEffect(() => {
    fetchGRNMain();
    fetchMeasuringUnits();
    fetchProductVariantMains();
  }, []);


  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#EditGRNDetailsModal"
        ref={props.open}
      >
        Edit GRNDetails
      </button>

      <div
        className="modal fade"
        id="EditGRNDetailsModal"
        tabIndex="-1"
        aria-labelledby="EditGRNDetailsModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EditGRNDetailsModalLabel">
                Edit Product GRNDetails
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
                <div className="row p-2">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="productDefinitionId" className="form-label">
                      Product Definition ID
                    </label>
                    <input
                      type="number"
                      id="productDefinitionId"
                      name="productDefinitionId"
                      className={`form-control ${
                        formik.touched.productDefinitionId &&
                        formik.errors.productDefinitionId
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.productDefinitionId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.productDefinitionId &&
                      formik.errors.productDefinitionId && (
                        <div className="invalid-feedback">
                          {formik.errors.productDefinitionId}
                        </div>
                      )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="product3rdSchedule" className="form-label">
                      Product 3rd Schedule
                    </label>
                    <input
                      type="checkbox"
                      id="product3rdSchedule"
                      name="product3rdSchedule"
                      className={`form-check-input ${
                        formik.touched.product3rdSchedule &&
                        formik.errors.product3rdSchedule
                          ? "is-invalid"
                          : ""
                      }`}
                      checked={formik.values.product3rdSchedule}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.product3rdSchedule &&
                      formik.errors.product3rdSchedule && (
                        <div className="invalid-feedback">
                          {formik.errors.product3rdSchedule}
                        </div>
                      )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="itemCode" className="form-label">
                      Item Code
                    </label>
                    <input
                      type="text"
                      id="itemCode"
                      name="itemCode"
                      className={`form-control ${
                        formik.touched.itemCode && formik.errors.itemCode
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.itemCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.itemCode && formik.errors.itemCode && (
                      <div className="invalid-feedback">
                        {formik.errors.itemCode}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="itemName" className="form-label">
                      Item Name
                    </label>
                    <input
                      type="text"
                      id="itemName"
                      name="itemName"
                      className={`form-control ${
                        formik.touched.itemName && formik.errors.itemName
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.itemName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.itemName && formik.errors.itemName && (
                      <div className="invalid-feedback">
                        {formik.errors.itemName}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label
                      htmlFor="fbrProductDesctiptionId"
                      className="form-label"
                    >
                      FBR Product Description ID
                    </label>
                    <input
                      type="number"
                      id="fbrProductDesctiptionId"
                      name="fbrProductDesctiptionId"
                      className={`form-control ${
                        formik.touched.fbrProductDesctiptionId &&
                        formik.errors.fbrProductDesctiptionId
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.fbrProductDesctiptionId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.fbrProductDesctiptionId &&
                      formik.errors.fbrProductDesctiptionId && (
                        <div className="invalid-feedback">
                          {formik.errors.fbrProductDesctiptionId}
                        </div>
                      )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label
                      htmlFor="fbrProductDesctiptionCode"
                      className="form-label"
                    >
                      FBR Product Description Code
                    </label>
                    <input
                      type="text"
                      id="fbrProductDesctiptionCode"
                      name="fbrProductDesctiptionCode"
                      className={`form-control ${
                        formik.touched.fbrProductDesctiptionCode &&
                        formik.errors.fbrProductDesctiptionCode
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.fbrProductDesctiptionCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.fbrProductDesctiptionCode &&
                      formik.errors.fbrProductDesctiptionCode && (
                        <div className="invalid-feedback">
                          {formik.errors.fbrProductDesctiptionCode}
                        </div>
                      )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="batchId" className="form-label">
                      Batch ID
                    </label>
                    <input
                      type="number"
                      id="batchId"
                      name="batchId"
                      className={`form-control ${
                        formik.touched.batchId && formik.errors.batchId
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.batchId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.batchId && formik.errors.batchId && (
                      <div className="invalid-feedback">
                        {formik.errors.batchId}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="storeId" className="form-label">
                      Store ID
                    </label>
                    <input
                      type="number"
                      id="storeId"
                      name="storeId"
                      className={`form-control ${
                        formik.touched.storeId && formik.errors.storeId
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.storeId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.storeId && formik.errors.storeId && (
                      <div className="invalid-feedback">
                        {formik.errors.storeId}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="fbrMuId" className="form-label">
                      FBR MU ID
                    </label>
                    <input
                      type="number"
                      id="fbrMuId"
                      name="fbrMuId"
                      className={`form-control ${
                        formik.touched.fbrMuId && formik.errors.fbrMuId
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.fbrMuId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.fbrMuId && formik.errors.fbrMuId && (
                      <div className="invalid-feedback">
                        {formik.errors.fbrMuId}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="muCode" className="form-label">
                      MU Code
                    </label>
                    <input
                      type="text"
                      id="muCode"
                      name="muCode"
                      className={`form-control ${
                        formik.touched.muCode && formik.errors.muCode
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.muCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.muCode && formik.errors.muCode && (
                      <div className="invalid-feedback">
                        {formik.errors.muCode}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="quantity" className="form-label">
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      className={`form-control ${
                        formik.touched.quantity && formik.errors.quantity
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.quantity}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.quantity && formik.errors.quantity && (
                      <div className="invalid-feedback">
                        {formik.errors.quantity}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="productPrice" className="form-label">
                      Product Price
                    </label>
                    <input
                      type="number"
                      id="productPrice"
                      name="productPrice"
                      className={`form-control ${
                        formik.touched.productPrice &&
                        formik.errors.productPrice
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.productPrice}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.productPrice &&
                      formik.errors.productPrice && (
                        <div className="invalid-feedback">
                          {formik.errors.productPrice}
                        </div>
                      )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="amount" className="form-label">
                      Amount
                    </label>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      className={`form-control ${
                        formik.touched.amount && formik.errors.amount
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.amount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.amount && formik.errors.amount && (
                      <div className="invalid-feedback">
                        {formik.errors.amount}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="fbrTaxRateId" className="form-label">
                      FBR Tax Rate ID
                    </label>
                    <input
                      type="number"
                      id="fbrTaxRateId"
                      name="fbrTaxRateId"
                      className={`form-control ${
                        formik.touched.fbrTaxRateId &&
                        formik.errors.fbrTaxRateId
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.fbrTaxRateId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.fbrTaxRateId &&
                      formik.errors.fbrTaxRateId && (
                        <div className="invalid-feedback">
                          {formik.errors.fbrTaxRateId}
                        </div>
                      )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="taxRate" className="form-label">
                      Tax Rate
                    </label>
                    <input
                      type="number"
                      id="taxRate"
                      name="taxRate"
                      className={`form-control ${
                        formik.touched.taxRate && formik.errors.taxRate
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.taxRate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.taxRate && formik.errors.taxRate && (
                      <div className="invalid-feedback">
                        {formik.errors.taxRate}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="taxAmount" className="form-label">
                      Tax Amount
                    </label>
                    <input
                      type="number"
                      id="taxAmount"
                      name="taxAmount"
                      className={`form-control ${
                        formik.touched.taxAmount && formik.errors.taxAmount
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.taxAmount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.taxAmount && formik.errors.taxAmount && (
                      <div className="invalid-feedback">
                        {formik.errors.taxAmount}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="furtherTax" className="form-label">
                      Further Tax
                    </label>
                    <input
                      type="number"
                      id="furtherTax"
                      name="furtherTax"
                      className={`form-control ${
                        formik.touched.furtherTax && formik.errors.furtherTax
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.furtherTax}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.furtherTax && formik.errors.furtherTax && (
                      <div className="invalid-feedback">
                        {formik.errors.furtherTax}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="furtherTaxAmount" className="form-label">
                      Further Tax Amount
                    </label>
                    <input
                      type="number"
                      id="furtherTaxAmount"
                      name="furtherTaxAmount"
                      className={`form-control ${
                        formik.touched.furtherTaxAmount &&
                        formik.errors.furtherTaxAmount
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.furtherTaxAmount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.furtherTaxAmount &&
                      formik.errors.furtherTaxAmount && (
                        <div className="invalid-feedback">
                          {formik.errors.furtherTaxAmount}
                        </div>
                      )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="valueExclGRNTax" className="form-label">
                      Value Excl. GRN Tax
                    </label>
                    <input
                      type="number"
                      id="valueExclGRNTax"
                      name="valueExclGRNTax"
                      className={`form-control ${
                        formik.touched.valueExclGRNTax &&
                        formik.errors.valueExclGRNTax
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.valueExclGRNTax}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.valueExclGRNTax &&
                      formik.errors.valueExclGRNTax && (
                        <div className="invalid-feedback">
                          {formik.errors.valueExclGRNTax}
                        </div>
                      )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="discount" className="form-label">
                      Discount
                    </label>
                    <input
                      type="number"
                      id="discount"
                      name="discount"
                      className={`form-control ${
                        formik.touched.discount && formik.errors.discount
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.discount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.discount && formik.errors.discount && (
                      <div className="invalid-feedback">
                        {formik.errors.discount}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="discountAmount" className="form-label">
                      Discount Amount
                    </label>
                    <input
                      type="number"
                      id="discountAmount"
                      name="discountAmount"
                      className={`form-control ${
                        formik.touched.discountAmount &&
                        formik.errors.discountAmount
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.discountAmount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.discountAmount &&
                      formik.errors.discountAmount && (
                        <div className="invalid-feedback">
                          {formik.errors.discountAmount}
                        </div>
                      )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="taxCharged" className="form-label">
                      Tax Charged
                    </label>
                    <input
                      type="number"
                      id="taxCharged"
                      name="taxCharged"
                      className={`form-control ${
                        formik.touched.taxCharged && formik.errors.taxCharged
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.taxCharged}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.taxCharged && formik.errors.taxCharged && (
                      <div className="invalid-feedback">
                        {formik.errors.taxCharged}
                      </div>
                    )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label htmlFor="valueIncGRNTax" className="form-label">
                      Value Inc. GRN Tax
                    </label>
                    <input
                      type="number"
                      id="valueIncGRNTax"
                      name="valueIncGRNTax"
                      className={`form-control ${
                        formik.touched.valueIncGRNTax &&
                        formik.errors.valueIncGRNTax
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.valueIncGRNTax}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.valueIncGRNTax &&
                      formik.errors.valueIncGRNTax && (
                        <div className="invalid-feedback">
                          {formik.errors.valueIncGRNTax}
                        </div>
                      )}
                  </div>

                  <div className="col-md-4 mt-2">
                    <label htmlFor="measuringUnitsId" className="form-label">
                      Measuring Unit
                    </label>
                    <select
                      id="measuringUnitsId"
                      name="measuringUnitsId"
                      className="form-control"
                      value={formik.values.measuringUnitsId}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "measuringUnitsId",
                          Number(e.target.value)
                        );
                      }}
                      onBlur={formik.handleBlur}
                    >
                      <option value={0}>Select Unit</option>
                      {measuringUnits.map((unit) => (
                        <option key={unit.id} value={unit.id}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                    {formik.touched.measuringUnitsId &&
                      formik.errors.measuringUnitsId && (
                        <div className="text-danger">
                          {formik.errors.measuringUnitsId}
                        </div>
                      )}
                  </div>
                  <div className="col-md-4 mt-2">
                    <label
                      htmlFor="productVariantMainId"
                      className="form-label"
                    >
                      grnMainId Main
                    </label>
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
                      <option value="">Select Product Main</option>
                      {Array.isArray(productVariantMains) &&
                      productVariantMains.length > 0 ? (
                        productVariantMains.map((variant) => (
                          <option key={variant.id} value={variant.id}>
                            {variant.name}
                          </option>
                        ))
                      ) : (
                        <option value="">No Product Mains Available</option>
                      )}
                    </select>
                    {formik.touched.productVariantMainId &&
                    formik.errors.productVariantMainId ? (
                      <div className="text-danger">
                        {formik.errors.productVariantMainId}
                      </div>
                    ) : null}
                  </div>

                  <div className="col-md-4 mt-2">
                    <label htmlFor="grnMainId" className="form-label">
                      GRN Main
                    </label>
                    <select
                      name="grnMainId"
                      className="form-control"
                      value={formik.values.grnMainId}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "grnMainId",
                          Number(e.target.value)
                        );
                      }}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select GRN Main</option>
                      {Array.isArray(GRNMain) && GRNMain.length > 0 ? (
                        GRNMain.map((grn) => (
                          <option key={grn.id} value={grn.id}>
                            {grn.name}
                          </option>
                        ))
                      ) : (
                        <option value="">No GRN Main Id Available</option>
                      )}
                    </select>
                    {formik.touched.grnMainId && formik.errors.grnMainId ? (
                      <div className="text-danger">
                        {formik.errors.grnMainId}
                      </div>
                    ) : null}
                  </div>

                  <div className="d-flex justify-content-between modal-footer mt-2">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={handleModalClose}
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditGRNDetails;
