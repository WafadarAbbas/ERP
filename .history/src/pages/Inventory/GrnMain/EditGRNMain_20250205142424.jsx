import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from 'yup'; // For validation
import ApiCall from '../../../Apicall/ApiCall';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import Buton from '../../../Compo/Buton';
import { useLocation } from 'react-router-dom';

function EditGRNMain() {
  const location = useLocation();
  const GRNMainId = location.state?.id;
  const navigate = useNavigate();


  console.log(GRNMainId);


  const [grnDetails, setGrnDetails] = useState([]);
  const addGrnDetail = (detail) => {
    setGrnDetails([...grnDetails, detail]);
  };

  const removeGrnDetail = (index) => {
    setGrnDetails(grnDetails.filter((_, i) => i !== index));
  };
  const validationSchema = Yup.object({

  });

  const grnFormik = useFormik({
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
      grnInvoiceNo:0,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const selectedmeasuringUnitsName = measuringUnits.find(
        (unit) => unit.id === values.measuringUnitsId
      );
      const selectedProductVariantMain = productVariantMains.find(
        (variant) => variant.id === values.productVariantMainId
      );
      const selectedgrnInvoiceNo = GRNMain.find(
        (grn) => grn.id === values.grnMainId
      );
      const grnDetail = {
        ...values,
        measuringUnitsName: selectedmeasuringUnitsName?.name || null,
        productName: selectedProductVariantMain?.name || null,
        grnInvoiceNo: selectedgrnInvoiceNo?.name || null,
        id:2,
        companyId:1,
organizationId:1,


      };
      addGrnDetail(grnDetail);
      resetForm();
    },
  });


  const formik = useFormik({
    initialValues: {
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const finalData = {
        grnInvoiceDate: "2025-02-05T08:19:10.552Z",
        branchId:77,
        branchName: 77,
        grnDocNo: 77,
        totalGRNVest: 77,
        totalGRNValue: 77,
        taxAmount: 77,
        furtherTax: 77,
        totalTaxCharged: 77,
        discount: 77,
        totalGRNAmount: 77,
        rvMainId: 77,
        term: 7,
        narration: 777,
        supplierNTNNo: 77,
        supplierSTRNo: 77,
        taxChargePlusAmount: 77,
        fillerStatus: false,
        tax236Amount: 77,
        tax236Rate: 7,
        tax236Status: 77,
        totalAmountWith236: 77,
        supplierId: 3,
        purchaseOrderMainId: 1036,
        grnInvoiceNo: "string",
        organizationId: 1,
        companyId: 1,
        grnDetails,

        supplerName: "M-I",
      };
      console.log("Final Data Submitted:", finalData);
      // try {
      //   const response = await ApiCall({
      //     url: "http://localhost:5022/api/v1/GRNMain/UpdateGRNMain",
      //     method: "PUT",
      //     data: finalData,
      //   });

      //   if (response?.status === 200) {
      //     Swal.fire({
      //       title: "Success!",
      //       text: "GRNMain Updated successfully.",
      //       icon: "success",
      //       confirmButtonColor: "#3085d6",
      //       confirmButtonText: "OK",
      //     });
      //     formik.resetForm();

      //   } else {
      //     throw new Error("Failed to Updated the GRNMain");
      //   }
      // } catch (error) {
      //   Swal.fire({
      //     title: "Error",
      //     text:
      //       error.message || "An error occurred while Updating the GRNMain",
      //     icon: "error",
      //     confirmButtonColor: "#d33",
      //     confirmButtonText: "Close",
      //   });
      // }

    },
  });


  useEffect(() => {
    if (GRNMainId) {
      const fetchGRNDetails = async () => {
        try {
          const response = await ApiCall({
            url: `http://localhost:5022/api/v1/GRNDetail/GetByGRNMainId?id=${GRNMainId}&organizationId=1&companyId=1`,
            method: "GET",
          });
  
          if (response.data) {
            const transformedData = response.data.map(({ 
              measuringUnitsMeasuringUnitsName, 
              productVariantMainProductName, 
              ...rest 
            }) => ({
              ...rest, // Baaki sari fields same rakho
              measuringUnitsName: measuringUnitsMeasuringUnitsName || '', // Rename & handle null
              productName: productVariantMainProductName || '', // Rename & handle null
            }));
  
            setGrnDetails(transformedData);
          }
        } catch (error) {
          console.error("Error fetching GRN details:", error);
          Swal.fire("Error", "Failed to fetch GRN details", "error");
        }
      };
  
      fetchGRNDetails();
    }
  }, [GRNMainId]);
  
  


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
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row mb-3'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>Edit GRNMain</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your GRNMain Updation</h5>
        </div>
        <div className='col-sm-4' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Buton onClick={() => navigate("/GRNMain/GRNMain")}>Move to GRN Main</Buton>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: 10, border: "1px solid #d6d4d4" }}>
        <h5 className="mt-1 ">Add GRN Details :</h5>
     
        <form onSubmit={grnFormik.handleSubmit}>
          <div className="row border p-2">


            <div className="col-md-4 mb-3">
              <label htmlFor="productDefinitionId" className="form-label">Product Definition ID</label>
              <input
                type="number"
                id="productDefinitionId"
                name="productDefinitionId"
                className={`form-control ${grnFormik.touched.productDefinitionId && grnFormik.errors.productDefinitionId ? "is-invalid" : ""}`}
                value={grnFormik.values.productDefinitionId}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.productDefinitionId && grnFormik.errors.productDefinitionId && (
                <div className="invalid-feedback">{grnFormik.errors.productDefinitionId}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="product3rdSchedule" className="form-label">Product 3rd Schedule</label>
              <input
                type="checkbox"
                id="product3rdSchedule"
                name="product3rdSchedule"
                className={`form-check-input ${grnFormik.touched.product3rdSchedule && grnFormik.errors.product3rdSchedule ? "is-invalid" : ""}`}
                checked={grnFormik.values.product3rdSchedule}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.product3rdSchedule && grnFormik.errors.product3rdSchedule && (
                <div className="invalid-feedback">{grnFormik.errors.product3rdSchedule}</div>
              )}
            </div>


            <div className="col-md-4 mb-3">
              <label htmlFor="itemCode" className="form-label">Item Code</label>
              <input
                type="text"
                id="itemCode"
                name="itemCode"
                className={`form-control ${grnFormik.touched.itemCode && grnFormik.errors.itemCode ? "is-invalid" : ""}`}
                value={grnFormik.values.itemCode}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.itemCode && grnFormik.errors.itemCode && (
                <div className="invalid-feedback">{grnFormik.errors.itemCode}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="itemName" className="form-label">Item Name</label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                className={`form-control ${grnFormik.touched.itemName && grnFormik.errors.itemName ? "is-invalid" : ""}`}
                value={grnFormik.values.itemName}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.itemName && grnFormik.errors.itemName && (
                <div className="invalid-feedback">{grnFormik.errors.itemName}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="fbrProductDesctiptionId" className="form-label">FBR Product Description ID</label>
              <input
                type="number"
                id="fbrProductDesctiptionId"
                name="fbrProductDesctiptionId"
                className={`form-control ${grnFormik.touched.fbrProductDesctiptionId && grnFormik.errors.fbrProductDesctiptionId ? "is-invalid" : ""}`}
                value={grnFormik.values.fbrProductDesctiptionId}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.fbrProductDesctiptionId && grnFormik.errors.fbrProductDesctiptionId && (
                <div className="invalid-feedback">{grnFormik.errors.fbrProductDesctiptionId}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="fbrProductDesctiptionCode" className="form-label">FBR Product Description Code</label>
              <input
                type="text"
                id="fbrProductDesctiptionCode"
                name="fbrProductDesctiptionCode"
                className={`form-control ${grnFormik.touched.fbrProductDesctiptionCode && grnFormik.errors.fbrProductDesctiptionCode ? "is-invalid" : ""}`}
                value={grnFormik.values.fbrProductDesctiptionCode}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.fbrProductDesctiptionCode && grnFormik.errors.fbrProductDesctiptionCode && (
                <div className="invalid-feedback">{grnFormik.errors.fbrProductDesctiptionCode}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="batchId" className="form-label">Batch ID</label>
              <input
                type="number"
                id="batchId"
                name="batchId"
                className={`form-control ${grnFormik.touched.batchId && grnFormik.errors.batchId ? "is-invalid" : ""}`}
                value={grnFormik.values.batchId}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.batchId && grnFormik.errors.batchId && (
                <div className="invalid-feedback">{grnFormik.errors.batchId}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="storeId" className="form-label">Store ID</label>
              <input
                type="number"
                id="storeId"
                name="storeId"
                className={`form-control ${grnFormik.touched.storeId && grnFormik.errors.storeId ? "is-invalid" : ""}`}
                value={grnFormik.values.storeId}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.storeId && grnFormik.errors.storeId && (
                <div className="invalid-feedback">{grnFormik.errors.storeId}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="fbrMuId" className="form-label">FBR MU ID</label>
              <input
                type="number"
                id="fbrMuId"
                name="fbrMuId"
                className={`form-control ${grnFormik.touched.fbrMuId && grnFormik.errors.fbrMuId ? "is-invalid" : ""}`}
                value={grnFormik.values.fbrMuId}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.fbrMuId && grnFormik.errors.fbrMuId && (
                <div className="invalid-feedback">{grnFormik.errors.fbrMuId}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="muCode" className="form-label">MU Code</label>
              <input
                type="text"
                id="muCode"
                name="muCode"
                className={`form-control ${grnFormik.touched.muCode && grnFormik.errors.muCode ? "is-invalid" : ""}`}
                value={grnFormik.values.muCode}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.muCode && grnFormik.errors.muCode && (
                <div className="invalid-feedback">{grnFormik.errors.muCode}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="quantity" className="form-label">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className={`form-control ${grnFormik.touched.quantity && grnFormik.errors.quantity ? "is-invalid" : ""}`}
                value={grnFormik.values.quantity}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.quantity && grnFormik.errors.quantity && (
                <div className="invalid-feedback">{grnFormik.errors.quantity}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="productPrice" className="form-label">Product Price</label>
              <input
                type="number"
                id="productPrice"
                name="productPrice"
                className={`form-control ${grnFormik.touched.productPrice && grnFormik.errors.productPrice ? "is-invalid" : ""}`}
                value={grnFormik.values.productPrice}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.productPrice && grnFormik.errors.productPrice && (
                <div className="invalid-feedback">{grnFormik.errors.productPrice}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                className={`form-control ${grnFormik.touched.amount && grnFormik.errors.amount ? "is-invalid" : ""}`}
                value={grnFormik.values.amount}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.amount && grnFormik.errors.amount && (
                <div className="invalid-feedback">{grnFormik.errors.amount}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="fbrTaxRateId" className="form-label">FBR Tax Rate ID</label>
              <input
                type="number"
                id="fbrTaxRateId"
                name="fbrTaxRateId"
                className={`form-control ${grnFormik.touched.fbrTaxRateId && grnFormik.errors.fbrTaxRateId ? "is-invalid" : ""}`}
                value={grnFormik.values.fbrTaxRateId}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.fbrTaxRateId && grnFormik.errors.fbrTaxRateId && (
                <div className="invalid-feedback">{grnFormik.errors.fbrTaxRateId}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="taxRate" className="form-label">Tax Rate</label>
              <input
                type="number"
                id="taxRate"
                name="taxRate"
                className={`form-control ${grnFormik.touched.taxRate && grnFormik.errors.taxRate ? "is-invalid" : ""}`}
                value={grnFormik.values.taxRate}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.taxRate && grnFormik.errors.taxRate && (
                <div className="invalid-feedback">{grnFormik.errors.taxRate}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="taxAmount" className="form-label">Tax Amount</label>
              <input
                type="number"
                id="taxAmount"
                name="taxAmount"
                className={`form-control ${grnFormik.touched.taxAmount && grnFormik.errors.taxAmount ? "is-invalid" : ""}`}
                value={grnFormik.values.taxAmount}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.taxAmount && grnFormik.errors.taxAmount && (
                <div className="invalid-feedback">{grnFormik.errors.taxAmount}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="furtherTax" className="form-label">Further Tax</label>
              <input
                type="number"
                id="furtherTax"
                name="furtherTax"
                className={`form-control ${grnFormik.touched.furtherTax && grnFormik.errors.furtherTax ? "is-invalid" : ""}`}
                value={grnFormik.values.furtherTax}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.furtherTax && grnFormik.errors.furtherTax && (
                <div className="invalid-feedback">{grnFormik.errors.furtherTax}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="furtherTaxAmount" className="form-label">Further Tax Amount</label>
              <input
                type="number"
                id="furtherTaxAmount"
                name="furtherTaxAmount"
                className={`form-control ${grnFormik.touched.furtherTaxAmount && grnFormik.errors.furtherTaxAmount ? "is-invalid" : ""}`}
                value={grnFormik.values.furtherTaxAmount}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.furtherTaxAmount && grnFormik.errors.furtherTaxAmount && (
                <div className="invalid-feedback">{grnFormik.errors.furtherTaxAmount}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="valueExclGRNTax" className="form-label">Value Excl. GRN Tax</label>
              <input
                type="number"
                id="valueExclGRNTax"
                name="valueExclGRNTax"
                className={`form-control ${grnFormik.touched.valueExclGRNTax && grnFormik.errors.valueExclGRNTax ? "is-invalid" : ""}`}
                value={grnFormik.values.valueExclGRNTax}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.valueExclGRNTax && grnFormik.errors.valueExclGRNTax && (
                <div className="invalid-feedback">{grnFormik.errors.valueExclGRNTax}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="discount" className="form-label">Discount</label>
              <input
                type="number"
                id="discount"
                name="discount"
                className={`form-control ${grnFormik.touched.discount && grnFormik.errors.discount ? "is-invalid" : ""}`}
                value={grnFormik.values.discount}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.discount && grnFormik.errors.discount && (
                <div className="invalid-feedback">{grnFormik.errors.discount}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="discountAmount" className="form-label">Discount Amount</label>
              <input
                type="number"
                id="discountAmount"
                name="discountAmount"
                className={`form-control ${grnFormik.touched.discountAmount && grnFormik.errors.discountAmount ? "is-invalid" : ""}`}
                value={grnFormik.values.discountAmount}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.discountAmount && grnFormik.errors.discountAmount && (
                <div className="invalid-feedback">{grnFormik.errors.discountAmount}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="taxCharged" className="form-label">Tax Charged</label>
              <input
                type="number"
                id="taxCharged"
                name="taxCharged"
                className={`form-control ${grnFormik.touched.taxCharged && grnFormik.errors.taxCharged ? "is-invalid" : ""}`}
                value={grnFormik.values.taxCharged}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.taxCharged && grnFormik.errors.taxCharged && (
                <div className="invalid-feedback">{grnFormik.errors.taxCharged}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="valueIncGRNTax" className="form-label">Value Inc. GRN Tax</label>
              <input
                type="number"
                id="valueIncGRNTax"
                name="valueIncGRNTax"
                className={`form-control ${grnFormik.touched.valueIncGRNTax && grnFormik.errors.valueIncGRNTax ? "is-invalid" : ""}`}
                value={grnFormik.values.valueIncGRNTax}
                onChange={grnFormik.handleChange}
                onBlur={grnFormik.handleBlur}
              />
              {grnFormik.touched.valueIncGRNTax && grnFormik.errors.valueIncGRNTax && (
                <div className="invalid-feedback">{grnFormik.errors.valueIncGRNTax}</div>
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
                value={grnFormik.values.measuringUnitsId}
                onChange={(e) => {
                  grnFormik.setFieldValue(
                    "measuringUnitsId",
                    Number(e.target.value)
                  );
                }}
                onBlur={grnFormik.handleBlur}
              >
                <option value="">Select Measuring Unit</option>
                {Array.isArray(measuringUnits) && measuringUnits.length > 0 ? (
                  measuringUnits.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))
                ) : (
                  <option value="">
                    No Measuring Units Available
                  </option>
                )}

              </select>
              {grnFormik.touched.measuringUnitsId &&
                grnFormik.errors.measuringUnitsId && (
                  <div className="text-danger">
                    {grnFormik.errors.measuringUnitsId}
                  </div>
                )}
            </div>
            <div className="col-md-4 mt-2">
              <label
                htmlFor="productVariantMainId"
                className="form-label"
              >
                Product Variant MainId
              </label>
              <select
                name="productVariantMainId"
                className="form-control"
                value={grnFormik.values.productVariantMainId}
                onChange={(e) => {
                  grnFormik.setFieldValue(
                    "productVariantMainId",
                    Number(e.target.value)
                  );
                }}
                onBlur={grnFormik.handleBlur}
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
                  <option value="">
                    No Product Mains Available
                  </option>
                )}
              </select>
              {grnFormik.touched.productVariantMainId &&
                grnFormik.errors.productVariantMainId ? (
                <div className="text-danger">
                  {grnFormik.errors.productVariantMainId}
                </div>
              ) : null}
            </div>

            <div className="col-md-4 mt-2">
              <label
                htmlFor="grnMainId"
                className="form-label"
              >
                GRN Main
              </label>
              <select
                name="grnMainId"
                className="form-control"
                value={grnFormik.values.grnMainId}
                onChange={(e) => {
                  grnFormik.setFieldValue(
                    "grnMainId",
                    Number(e.target.value)
                  );
                }}
                onBlur={grnFormik.handleBlur}
              >
                <option value="">Select GRN Main</option>
                {Array.isArray(GRNMain) &&
                  GRNMain.length > 0 ? (
                  GRNMain.map((grn) => (
                    <option key={grn.id} value={grn.id}>
                      {grn.name}
                    </option>
                  ))
                ) : (
                  <option value="">
                    No GRN Main Id Available
                  </option>
                )}
              </select>
              {grnFormik.touched.grnMainId &&
                grnFormik.errors.grnMainId ? (
                <div className="text-danger">
                  {grnFormik.errors.grnMainId}
                </div>
              ) : null}
            </div>






            <div>
              <button
                type="submit"
                className="btn btn-success mt-3 col-2 "

              >
                Add Detail
              </button>
            </div>
          </div>

          {grnDetails.length > 0 && (
            <div className="table-responsive mt-4">
              <table className="table table-bordered table-hover">
                <thead class="thead-dark">
                  <tr>
                    <th>Mu Code</th>
                    <th>Product Def Id</th>
                    <th>Grn</th>
                    <th>Measuring Unit</th>
                    <th>Product Variant</th>
                    <th>Tax</th>
                    <th>Further Tax</th>
                    <th>Discount</th>
                    <th>Action</th>
                  </tr>

                </thead>
                <tbody>
                  {grnDetails.map((detail, index) => (
                    <tr key={index}>
                      <td>{detail.muCode}</td>
                      <td>{detail.productDefinitionId}</td>
                      <td>{detail.grnMainId}</td>
                      <td>{detail.measuringUnitsId}</td>
                      <td>{detail.productVariantMainId}</td>
                      <td>{detail.taxAmount}</td>
                      <td>{detail.furtherTax}</td>
                      <td>{detail.discount}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => removeGrnDetail(index)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </form>


        {/* --------------------------------------- */}
        <br />
        <br />
        <form onSubmit={formik.handleSubmit}>

          <div className="row ">

            <div className="col-md-4 mb-3">
              <label htmlFor="branchId" className="form-label">Branch ID</label>
              <input
                type="number"
                id="branchId"
                name="branchId"
                className={`form-control ${formik.touched.branchId && formik.errors.branchId ? "is-invalid" : ""}`}
                value={formik.values.branchId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.branchId && formik.errors.branchId && (
                <div className="invalid-feedback">{formik.errors.branchId}</div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="branchName" className="form-label">Branch Name</label>
              <input
                type="text"
                id="branchName"
                name="branchName"
                className={`form-control ${formik.touched.branchName && formik.errors.branchName ? "is-invalid" : ""}`}
                value={formik.values.branchName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.branchName && formik.errors.branchName && (
                <div className="invalid-feedback">{formik.errors.branchName}</div>
              )}
            </div>







          </div>


          <div className="d-flex justify-content-end modal-footer mt-3">


            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#ff9f33", color: "white" }}
            >
              Save changes
            </button>
          </div>
        </form>






      </div>


      <Footer />
    </div>
  );
}

export default EditGRNMain;

